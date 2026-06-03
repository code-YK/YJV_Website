"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ChapterNodeAccentProps {
  /** 1-indexed node number to display (e.g. 1 → "01"). */
  index: number;
  /** Visible label for screen readers, e.g. "Future". */
  label: string;
}

/**
 * Small badge rendered inside each home chapter section. Visually
 * connects the chapter to its corresponding node in the WebGL scene
 * behind it — pulsing accent dot + monospace node number.
 */
export function ChapterNodeAccent({ index, label }: ChapterNodeAccentProps) {
  const reduced = useReducedMotion();
  const num = String(index).padStart(2, "0");

  return (
    <div
      className="pointer-events-none absolute right-5 top-6 z-20 flex items-center gap-2 font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.32em] text-hub-ink-muted md:right-12 md:top-10"
      aria-label={`Node ${num}: ${label}`}
    >
      <span className="relative inline-flex h-2 w-2">
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-hub-accent"
          animate={
            reduced
              ? undefined
              : { scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }
          }
          transition={{
            duration: 2.4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-hub-accent shadow-[0_0_10px_rgba(167,139,250,0.65)]" />
      </span>
      <span>
        Node {num} <span className="text-hub-ink-muted/60">·</span>{" "}
        <span className="text-hub-ink">{label}</span>
      </span>
    </div>
  );
}
