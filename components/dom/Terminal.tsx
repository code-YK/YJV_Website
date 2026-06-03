"use client";

import { useEffect, useState } from "react";
import { useHeroScroll } from "@/lib/hero/scrollStore";
import { smoothstep } from "@/lib/hero/ease";

/**
 * Terminal treatments matching the reference/demo:
 *  - BootReadout: Deep Core "INITIALIZING YJV_CORE_ALPHA… (NN% COMPLETE)".
 *  - SystemStatusLog: the "LIVE SYSTEM STATUS" agent log, designed to be
 *    embedded inside the Reveal glass card (no absolute positioning / opacity
 *    of its own — the card owns those).
 * Lightweight DOM (no WebGL); free of canvas/Three internals.
 */

export function BootReadout() {
  const { progress } = useHeroScroll();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const id = requestAnimationFrame(() => setPct(95));
      return () => cancelAnimationFrame(id);
    }
    let v = 0;
    const id = window.setInterval(() => {
      v += v < 70 ? 3 : v < 95 ? 1 : 0.25;
      if (v >= 95) {
        v = 95;
        window.clearInterval(id);
      }
      setPct(Math.round(v));
    }, 32);
    return () => window.clearInterval(id);
  }, []);

  const opacity = 1 - smoothstep(0.05, 0.14, progress);

  return (
    <div
      aria-hidden={opacity < 0.05}
      className="pointer-events-none absolute right-[6%] top-1/2 z-30 hidden -translate-y-1/2 font-[family-name:var(--font-space-mono)] text-cyan-300 md:block"
      style={{ opacity, transform: `translateY(-50%) translateX(${(1 - opacity) * 24}px)` }}
    >
      <div className="text-sm tracking-[0.2em] md:text-base">
        INITIALIZING YJV_CORE_ALPHA<span className="animate-pulse">…</span>
      </div>
      <div className="mt-1 text-xs tracking-[0.3em] text-cyan-400/80">
        ({String(pct).padStart(2, "0")}% COMPLETE)
      </div>
    </div>
  );
}

interface LogLine {
  label: string;
  status: string;
  tone: "ok" | "active" | "warn";
}

const LINES: LogLine[] = [
  { label: "[AGENT_ALPHA] Executing lead qualification…", status: "100% COMPLETE", tone: "ok" },
  { label: "[AGENT_BETA] Synchronizing CRM database…", status: "ACTIVE", tone: "active" },
  { label: "[ASSISTANT_GAMMA] Optimizing workflow efficiency…", status: "80%", tone: "warn" },
  { label: "[SYSTEM_CORE] Executing lead events…", status: "ACTIVE", tone: "active" },
];

const TONE: Record<LogLine["tone"], string> = {
  ok: "text-emerald-300",
  active: "text-cyan-300",
  warn: "text-amber-300",
};

/** Embeddable live-status log panel (used inside the Reveal glass card). */
export function SystemStatusLog() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const id = requestAnimationFrame(() => setVisible(LINES.length));
      return () => cancelAnimationFrame(id);
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setVisible(i);
      if (i >= LINES.length) window.clearInterval(id);
    }, 320);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg border border-cyan-400/20 bg-[#060c12]/70 px-4 py-3 font-[family-name:var(--font-space-mono)] text-[11px] leading-relaxed md:text-xs">
      <div className="mb-2 flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-cyan-300/70">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        Live System Status
      </div>
      {LINES.slice(0, visible).map((line, i) => {
        const isLast = i === visible - 1;
        return (
          <div key={line.label} className="flex items-baseline justify-between gap-3">
            <span className="truncate text-slate-300/80">
              {line.label}
              {isLast && visible < LINES.length && (
                <span className="ml-0.5 inline-block w-2 animate-pulse text-cyan-300">▍</span>
              )}
            </span>
            <span className={`shrink-0 ${TONE[line.tone]}`}>{line.status}</span>
          </div>
        );
      })}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(34,211,238,0.08) 0px, rgba(34,211,238,0.08) 1px, transparent 1px, transparent 3px)",
        }}
      />
    </div>
  );
}
