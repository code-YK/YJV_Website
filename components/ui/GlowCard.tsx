"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { durations, easings } from "@/lib/motion-tokens";

interface GlowCardProps extends HTMLMotionProps<"div"> {
  hoverable?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function GlowCard({
  hoverable = true,
  className,
  children,
  ...rest
}: GlowCardProps) {
  const reduced = useReducedMotion();
  const hover =
    hoverable && !reduced
      ? {
          boxShadow: "0 18px 40px -12px rgba(167,139,250,0.45)",
          borderColor: "rgba(167,139,250,0.6)",
        }
      : undefined;

  return (
    <motion.div
      whileHover={hover}
      transition={{ duration: durations.normal, ease: easings.smooth }}
      className={cn(
        "relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/80 p-6 md:p-8",
        "backdrop-blur-md transition-colors",
        hoverable && "tilt-card",
        className,
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
