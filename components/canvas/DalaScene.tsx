"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createMorphField } from "@/lib/canvas/morphField";
import { getScrollY } from "@/lib/scroll/smoothScroll";
import { detectGpuTier } from "@/lib/hero/gpuTier";
import { prefersReducedMotion } from "@/lib/hero/detectWebGL";

/**
 * Dala-style morphing particle hero — ported from the `scroll-hero` reference
 * demo. A full-bleed fixed canvas renders thousands of instanced octahedra that
 * assemble into a DNA helix, glide across the viewport, scatter into confetti, then
 * re-form into a LIGHTBULB as you scroll. The morph runs on the GPU (one
 * `uMorph` uniform); scroll progress comes from the site's global Lenis via the
 * smooth-scroll store, mouse moves tilt the group.
 *
 * The container must be `position: fixed; inset: 0` (full-bleed, behind the DOM
 * copy). `active` pauses the loop when the hero scrolls out of view.
 */
interface DalaSceneProps {
  active?: boolean;
  className?: string;
}

function countForTier(tier: ReturnType<typeof detectGpuTier>): number {
  if (tier === "high") return 7000;
  if (tier === "low") return 2600;
  return 4500;
}

// The form travels from the right edge to the left edge over the first half of
// the scroll, then scatters and re-forms over the second half.
const X_RIGHT = 2.2;
const X_LEFT = -2.2;
const FLAT_AXIS = new THREE.Vector3(0, 1, 0);
const TILT_AXIS = new THREE.Vector3(1, 0.45, 0.85).normalize();

export function DalaScene({ active = true, className }: DalaSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<() => void>(() => {});
  const stopRef = useRef<() => void>(() => {});
  const activeRef = useRef(active);

  // Toggle the loop when the hero enters/leaves view.
  useEffect(() => {
    activeRef.current = active;
    if (active) startRef.current();
    else stopRef.current();
  }, [active]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tier = detectGpuTier();
    const dprCap = tier === "high" ? 2 : 1.5;
    const reduced = prefersReducedMotion();
    const count = countForTier(tier);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: tier !== "low",
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }
    const dpr = Math.min(window.devicePixelRatio, dprCap);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 1);
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5;

    // The hero root — scroll progress is measured from how far it has scrolled
    // through its own height (exact regardless of viewport height / Lenis lag).
    const heroRoot = document.querySelector<HTMLElement>("[data-dala-root]");

    // The morphing field (DNA -> scatter -> bulb). Reduced motion disables the
    // mid-morph explosion so the cloud simply blends between the two forms.
    const field = createMorphField({ count, scatter: !reduced });
    const uniforms = field.material.uniforms;

    // Group wrapper: the inner mesh spins, the group tilts to the mouse, and the
    // group's X position is scroll-driven (right -> left).
    const group = new THREE.Group();
    group.add(field.mesh);
    group.position.x = X_RIGHT;
    scene.add(group);

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const nextDpr = Math.min(window.devicePixelRatio, dprCap);
      renderer.setPixelRatio(nextDpr);
      renderer.setSize(rect.width, rect.height);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    };
    handleResize();

    // Mouse parallax (eased toward the cursor each frame).
    const mouse = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reduced) window.addEventListener("pointermove", onPointerMove);

    const spinAxis = new THREE.Vector3();
    let raf = 0;
    let running = false;
    let startMs = 0;
    const FRAME_MS = 1000 / 60;
    let last = 0;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      if (startMs === 0) startMs = now;
      const elapsed = (now - startMs) / 1000;

      // Scroll progress across the hero: 0 at the top, 1 once the hero has
      // scrolled fully through the viewport. Measured from the root's own rect
      // (exact regardless of viewport height); falls back to a scrollY estimate.
      const vh = window.innerHeight || 800;
      let progress: number;
      if (heroRoot) {
        const rect = heroRoot.getBoundingClientRect();
        const span = Math.max(1, rect.height - vh);
        progress = Math.min(Math.max(-rect.top / span, 0), 1);
      } else {
        progress = Math.min(Math.max(getScrollY() / (vh * 3), 0), 1);
      }

      // Phase 1 (0 -> 0.5): glide the form from the right edge to the left.
      const moveT = Math.min(progress / 0.5, 1);
      const targetX = THREE.MathUtils.lerp(X_RIGHT, X_LEFT, moveT);
      group.position.x += (targetX - group.position.x) * 0.08;

      // Phase 2 (0.5 -> 0.85): scatter, then re-form into the bulb; the last
      // stretch holds the formed bulb so it lands cleanly before the hero ends.
      const targetMorph = Math.min(Math.max((progress - 0.5) / 0.35, 0), 1);
      uniforms.uMorph.value += (targetMorph - uniforms.uMorph.value) * 0.1;
      const m = uniforms.uMorph.value;

      uniforms.uTime.value = elapsed;

      if (!reduced) {
        // Ease the group tilt toward the cursor.
        group.rotation.y += (mouse.x * 0.3 - group.rotation.y) * 0.04;
        group.rotation.x += (mouse.y * 0.18 - group.rotation.x) * 0.04;
      }

      // Spin axis tilts upright (DNA) -> diagonal (bulb) as m goes 0 -> 1. The
      // swirl peaks mid-morph and returns to ~0 at both ends, so the DNA helix
      // and the bulb each land readable; a faint sway keeps it alive.
      spinAxis.copy(FLAT_AXIS).lerp(TILT_AXIS, m).normalize();
      const sway = reduced ? 0 : Math.sin(elapsed * 0.25) * 0.12;
      const swirl = Math.sin(m * Math.PI) * Math.PI; // 0 at ends, π at scatter
      field.mesh.quaternion.setFromAxisAngle(spinAxis, sway + swirl);

      renderer.render(scene, camera);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    startRef.current = start;
    stopRef.current = stop;

    const onLost = (e: Event) => {
      e.preventDefault();
      stop();
    };
    renderer.domElement.addEventListener("webglcontextlost", onLost);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", handleResize);
    }

    if (activeRef.current) start();

    return () => {
      stop();
      startRef.current = () => {};
      stopRef.current = () => {};
      renderer.domElement.removeEventListener("webglcontextlost", onLost);
      if (!reduced) window.removeEventListener("pointermove", onPointerMove);
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener("resize", handleResize);

      field.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default DalaScene;
