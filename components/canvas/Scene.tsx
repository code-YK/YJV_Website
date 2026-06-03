"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createDigitalOrb } from "./DigitalOrb";
import { getHeroSnapshot } from "@/lib/hero/scrollStore";
import {
  cubicBezier,
  CAMERA_POSITION_PATH,
  CAMERA_TARGET_PATH,
} from "@/lib/hero/cameraPath";
import { detectGpuTier, particleCountForTier } from "@/lib/hero/gpuTier";

/**
 * Raw Three.js canvas for the Digital Engine Room. Owns the renderer, camera,
 * 60fps RAF loop, and disposal. Reads scroll state imperatively from the
 * shared store (the only cross-layer channel) — no DOM/business concerns, no
 * @react-three/fiber. Pauses rendering when scrolled offscreen so it does not
 * contend with the page's other WebGL background.
 */
interface SceneProps {
  onReady?: () => void;
  className?: string;
}

export function Scene({ onReady, className }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tier = detectGpuTier();
    const dprCap = tier === "high" ? 2 : 1.5;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);

    const orb = createDigitalOrb({
      particleCount: particleCountForTier(tier),
      pixelRatio: renderer.getPixelRatio(),
    });
    scene.add(orb.object3D);

    // Elapsed time is derived from the RAF timestamp (THREE.Clock is
    // deprecated in this build, and we already have a high-res `now`).
    let startMs = 0;
    const camPos = new THREE.Vector3();
    const camTarget = new THREE.Vector3();

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      renderer.setSize(rect.width, rect.height);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    };
    handleResize();

    let raf = 0;
    let running = false;
    let signaledReady = false;

    const FRAME_MS = 1000 / 60;
    let last = 0;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      if (startMs === 0) startMs = now;
      const elapsed = (now - startMs) / 1000;

      const snap = getHeroSnapshot();
      const t = snap.progress;

      cubicBezier(
        CAMERA_POSITION_PATH.p0,
        CAMERA_POSITION_PATH.p1,
        CAMERA_POSITION_PATH.p2,
        CAMERA_POSITION_PATH.p3,
        t,
        camPos,
      );
      camera.position.copy(camPos);
      cubicBezier(
        CAMERA_TARGET_PATH.p0,
        CAMERA_TARGET_PATH.p1,
        CAMERA_TARGET_PATH.p2,
        CAMERA_TARGET_PATH.p3,
        t,
        camTarget,
      );
      camera.lookAt(camTarget);

      orb.update(snap.progress, snap.state, elapsed);
      renderer.render(scene, camera);

      if (!signaledReady) {
        signaledReady = true;
        onReadyRef.current?.();
      }
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

    // Pause the render loop when the hero is scrolled out of view.
    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) start();
            else stop();
          }
        },
        { threshold: 0 },
      );
      io.observe(container);
    } else {
      start();
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      stop();
      io?.disconnect();
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener("resize", handleResize);

      renderer.dispose();
      renderer.forceContextLoss();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      orb.dispose();
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

export default Scene;
