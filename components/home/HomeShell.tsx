"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { webGLAvailable } from "@/lib/hero/detectWebGL";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";

// Defer the WebGL scene to client-only to avoid SSR overhead and to
// avoid Three.js touching globals during prerender.
const HomeScene3D = dynamic(
  () => import("./HomeScene3D").then((m) => m.HomeScene3D),
  { ssr: false },
);

interface HomeShellProps {
  children: ReactNode;
}

export function HomeShell({ children }: HomeShellProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isWide, setIsWide] = useState(false);
  const [webglOk, setWebglOk] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    // Defer the initial capability reads off the effect body (avoids a
    // synchronous cascading setState; the 3D layer is non-critical).
    const id = requestAnimationFrame(() => {
      setMounted(true);
      setWebglOk(webGLAvailable());
      setIsWide(mq.matches);
    });
    const onChange = () => setIsWide(mq.matches);
    mq.addEventListener("change", onChange);
    return () => {
      cancelAnimationFrame(id);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = containerRef.current;
    if (!root) return;
    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-node-index]"),
    );
    if (sections.length === 0) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      let prog = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = sections[i];
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (viewportCenter < top) {
          if (i === 0) {
            prog = 0;
          } else {
            // Lerp tail of the previous section into this one
            const prev = sections[i - 1];
            const prevEnd = prev.offsetTop + prev.offsetHeight;
            const gapT = Math.max(
              0,
              Math.min(1, (viewportCenter - prevEnd) / Math.max(top - prevEnd, 1)),
            );
            prog = i - 1 + 1 + gapT * 0; // stay at previous index until section enters
            prog = i - 1 + Math.min(1, (viewportCenter - prev.offsetTop) / prev.offsetHeight);
          }
          break;
        }
        if (viewportCenter < top + height) {
          prog = i + Math.max(0, Math.min(1, (viewportCenter - top) / height));
          break;
        }
        prog = i + 1;
      }
      setProgress(prog);
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mounted]);

  const canRender3D = mounted && !reduced && isWide && webglOk;

  return (
    <div ref={containerRef} className="relative">
      {canRender3D && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0"
          style={{ opacity: 0.85 }}
        >
          <CanvasErrorBoundary>
            <HomeScene3D progress={progress} />
          </CanvasErrorBoundary>
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
