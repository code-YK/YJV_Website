"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { durations, easings } from "@/lib/motion-tokens";

export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      whileHover={
        reduced
          ? undefined
          : {
              backgroundImage:
                "linear-gradient(145deg,#3b82f6,#8b5cf6,#a78bfa)",
            }
      }
      transition={{ duration: durations.normal, ease: easings.smooth }}
      className={cn(
        "bg-clip-text text-transparent",
        "bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)]",
        className,
      )}
    >
      {children}
    </motion.span>
  );
}
