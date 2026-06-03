"use client";

import { useEffect, useRef } from "react";
import { getHeroSnapshot } from "@/lib/hero/scrollStore";
import { smoothstep } from "@/lib/hero/ease";

/**
 * Digital Engine Room visualization — a dense, rotating 3D "node orb" rendered
 * in Canvas 2D (NO WebGL, so it works on every machine). Nodes sit on a sphere,
 * the sphere auto-rotates, and points are projected with perspective + depth
 * shading for a volumetric look. Reads scroll progress from the shared store
 * each frame and morphs the orb's position/scale across the three states:
 *
 *   Deep Core -> orb large & centred (fills the viewport)
 *   Reveal    -> orb condenses to the right ~40%
 *   Ledger    -> orb docks left, glowing connectors flow into the bento
 *
 * Free of DOM/business concerns; the store is the only cross-layer channel.
 */
interface NetworkMeshProps {
  className?: string;
  nodeCount?: number;
}

interface OrbNode {
  x: number;
  y: number;
  z: number; // unit sphere
  rgb: [number, number, number];
  size: number;
}

const STOPS: [number, number, number][] = [
  [34, 211, 238], // cyan
  [59, 130, 246], // blue
  [139, 92, 246], // violet
  [52, 211, 153], // green
];

function colorAt(t: number): [number, number, number] {
  const seg = Math.min(0.9999, Math.max(0, t)) * 3;
  const i = Math.floor(seg);
  const f = seg - i;
  const a = STOPS[i];
  const b = STOPS[i + 1];
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f),
  ];
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function buildNodes(count: number): { nodes: OrbNode[]; edges: [number, number][] } {
  const nodes: OrbNode[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const r = rng(i * 2654435761 + 11);
    // Fibonacci sphere for even coverage.
    const y = 1 - (i / Math.max(count - 1, 1)) * 2;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    nodes.push({
      x: Math.cos(theta) * rad,
      y,
      z: Math.sin(theta) * rad,
      rgb: colorAt(r()),
      size: 1.0 + r() * 1.4,
    });
  }
  // Edges: connect each node to its 3 nearest neighbours (geodesic look).
  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    const dists: { j: number; d: number }[] = [];
    for (let j = 0; j < count; j++) {
      if (j === i) continue;
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dz = nodes[i].z - nodes[j].z;
      dists.push({ j, d: dx * dx + dy * dy + dz * dz });
    }
    dists.sort((p, q) => p.d - q.d);
    for (let k = 0; k < 3; k++) {
      const j = dists[k].j;
      const key = i < j ? `${i}_${j}` : `${j}_${i}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push([i, j]);
      }
    }
  }
  return { nodes, edges };
}

export function NetworkMesh({ className, nodeCount = 150 }: NetworkMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const { nodes, edges } = buildNodes(nodeCount);
    const sx = new Float32Array(nodeCount);
    const sy = new Float32Array(nodeCount);
    const sd = new Float32Array(nodeCount); // depth 0..1 (back..front)

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const draw = (t: number) => {
      const { progress } = getHeroSnapshot();
      // 4-state layout: full -> right (Reveal) -> left (Ledger) -> stretch (Detachment).
      const a = smoothstep(0.04, 0.3, progress); // full -> right
      const b = smoothstep(0.33, 0.62, progress); // right -> left
      const det = smoothstep(0.72, 0.95, progress); // shatter / horizontal stretch

      let cxN = lerp(0.5, 0.72, a);
      cxN = lerp(cxN, 0.26, b); // dock left in the Ledger
      cxN = lerp(cxN, 0.5, det); // recenter as it stretches full-width
      const cyN = 0.5;
      const minDim = Math.min(width, height);
      let radius = lerp(minDim * 0.44, minDim * 0.34, a);
      radius = lerp(radius, minDim * 0.26, b); // shrink when docked so it clears the bento
      const cx = cxN * width;
      const cy = cyN * height;
      const stretchX = 1 + det * 2.6; // widen into a band
      const squashY = 1 - det * 0.72; // flatten vertically
      const fade = 1 - det * 0.85; // fade as the topology takes over

      const rotY = reduced ? 0.6 : t * 0.18;
      const rotX = reduced ? 0.34 : 0.32 + Math.sin(t * 0.08) * 0.12;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];
        // rotate Y
        const X = n.x * cosY - n.z * sinY;
        let Z = n.x * sinY + n.z * cosY;
        let Y = n.y;
        // rotate X
        const Y2 = Y * cosX - Z * sinX;
        Z = Y * sinX + Z * cosX;
        Y = Y2;
        const persp = 1.6 / (1.6 - Z * 0.6);
        sx[i] = cx + X * radius * persp * stretchX;
        sy[i] = cy + Y * radius * persp * squashY;
        sd[i] = (Z + 1) / 2;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      // edges
      ctx.lineWidth = 0.9;
      for (let e = 0; e < edges.length; e++) {
        const i = edges[e][0];
        const j = edges[e][1];
        const depth = Math.min(sd[i], sd[j]);
        const alpha = (0.12 + 0.5 * depth) * 0.9 * fade;
        ctx.strokeStyle = `rgba(45, 196, 220, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(sx[i], sy[i]);
        ctx.lineTo(sx[j], sy[j]);
        ctx.stroke();
      }

      // nodes (halo + depth-shaded core)
      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];
        const d = sd[i];
        const [r, g, bb] = n.rgb;
        const core = n.size * (0.5 + d);
        ctx.fillStyle = `rgba(${r}, ${g}, ${bb}, ${0.1 * d * fade})`;
        ctx.beginPath();
        ctx.arc(sx[i], sy[i], core * 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${r}, ${g}, ${bb}, ${(0.3 + 0.6 * d) * fade})`;
        ctx.beginPath();
        ctx.arc(sx[i], sy[i], core, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ledger connectors: bright energy lines flowing from the orb into the
      // bento (glow pass + flowing core + endpoint node), per the demo.
      const cAppear =
        smoothstep(0.4, 0.52, progress) * (1 - smoothstep(0.68, 0.76, progress));
      if (cAppear > 0.01 && width > 768) {
        const startX = cx + radius * 0.95;
        const targetX = width * 0.53;
        const count = 5;
        for (let k = 0; k < count; k++) {
          const ty = (0.24 + (k / (count - 1)) * 0.52) * height;
          const midX = (startX + targetX) * 0.5;
          const cpy = (cy + ty) * 0.5;
          const rgb = k % 2 === 0 ? "56, 208, 232" : "245, 170, 80"; // cyan / amber
          // soft glow underlay
          ctx.lineWidth = 5;
          ctx.strokeStyle = `rgba(${rgb}, ${cAppear * 0.18})`;
          ctx.beginPath();
          ctx.moveTo(startX, cy);
          ctx.quadraticCurveTo(midX, cpy, targetX, ty);
          ctx.stroke();
          // bright flowing core
          ctx.lineWidth = 1.6;
          ctx.setLineDash([3, 9]);
          ctx.lineDashOffset = reduced ? 0 : -(t * 60) % 12;
          ctx.strokeStyle = `rgba(${rgb}, ${cAppear * 0.95})`;
          ctx.beginPath();
          ctx.moveTo(startX, cy);
          ctx.quadraticCurveTo(midX, cpy, targetX, ty);
          ctx.stroke();
          ctx.setLineDash([]);
          // endpoint node where it meets the bento
          ctx.fillStyle = `rgba(${rgb}, ${cAppear})`;
          ctx.beginPath();
          ctx.arc(targetX, ty, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.lineDashOffset = 0;
      }

      ctx.globalCompositeOperation = "source-over";
    };

    let raf = 0;
    let running = false;
    const FRAME_MS = 1000 / 60;
    let last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      draw(now / 1000);
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

    let io: IntersectionObserver | null = null;
    if (reduced) {
      draw(0);
    } else if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) start();
            else stop();
          }
        },
        { threshold: 0 },
      );
      io.observe(canvas);
    } else {
      start();
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        resize();
        if (reduced) draw(0);
      });
      resizeObserver.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    return () => {
      stop();
      io?.disconnect();
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener("resize", resize);
    };
  }, [nodeCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

export default NetworkMesh;
