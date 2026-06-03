"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { cn } from "@/lib/utils";

export function FloatingElement({
  children,
  strength = 15,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { x, y } = useMouseParallax(reduced ? 0 : strength);

  return (
    <motion.div
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 60, damping: 20, mass: 0.4 }}
      className={cn("pointer-events-none", className)}
    >
      {children}
    </motion.div>
  );
}
