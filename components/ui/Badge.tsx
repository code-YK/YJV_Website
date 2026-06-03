"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { durations, easings, scales } from "@/lib/motion-tokens";

export function Badge({
  children,
  className,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** When true, the badge gets a hover lift + pulse. */
  interactive?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      whileHover={
        interactive && !reduced
          ? { scale: scales.pop, y: -1 }
          : undefined
      }
      transition={{ duration: durations.fast, ease: easings.smooth }}
      className={cn(
        "relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[var(--text-primary)]",
        "before:absolute before:inset-0 before:rounded-full before:p-px",
        "before:bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)] before:-z-10",
        "after:absolute after:inset-px after:rounded-full after:bg-[#0a0a0a] after:-z-10",
        "isolate",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-blue)] shadow-[0_0_8px_var(--accent-blue)]" />
      {children}
    </motion.span>
  );
}
