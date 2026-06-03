"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type ReactNode } from "react";
import { easings } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

const easeOut = easings.smooth;
const viewportConfig = { once: false, amount: 0.25, margin: "-10%" };

const cellVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.9,
    boxShadow: "0 0 0 0 rgba(167, 139, 250, 0)",
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    boxShadow: [
      "0 0 0 0 rgba(167, 139, 250, 0)",
      "0 0 32px 0 rgba(167, 139, 250, 0.35)",
      "0 0 0 0 rgba(167, 139, 250, 0)",
    ],
    transition: {
      duration: 0.65,
      ease: easeOut,
      delay,
      boxShadow: { duration: 1.4, times: [0, 0.45, 1] },
    },
  }),
};

interface AnimatedCardProps {
  children: ReactNode;
  /** Delay (in seconds) before this card's entrance animation fires. */
  delay?: number;
  /** Outer className for the card surface (padding, background, etc). */
  className?: string;
  /** Pass-through id for the rendered element. */
  id?: string;
  /**
   * Disable the entrance + hover animation entirely (useful when the
   * surface is wrapped by another animated parent).
   */
  disableMotion?: boolean;
}

/**
 * The signature card surface used across the site. Mirrors the
 * `/solutions` DataCell treatment:
 *  - scale-pop entrance with a one-shot accent box-shadow pulse
 *  - hover lifts (y: -6) + scales (1.025) + glow shadow + accent border
 *  - top + bottom accent gradient hairlines draw in on hover
 *  - 3D perspective tilt via the `.tilt-card` utility
 *
 * Caller supplies the inner markup (eyebrow, value, list, anything).
 */
export function AnimatedCard({
  children,
  delay = 0,
  className,
  id,
  disableMotion = false,
}: AnimatedCardProps) {
  const reduced = useReducedMotion();
  const reducedOrDisabled = reduced || disableMotion;

  return (
    <motion.div
      id={id}
      initial={reducedOrDisabled ? false : "hidden"}
      whileInView={reducedOrDisabled ? undefined : "visible"}
      whileHover={
        reducedOrDisabled
          ? undefined
          : {
              y: -6,
              scale: 1.025,
              boxShadow: "0 20px 50px -15px rgba(167, 139, 250, 0.55)",
              transition: { duration: 0.28, ease: easeOut },
            }
      }
      viewport={viewportConfig}
      variants={cellVariants}
      custom={delay}
      className={cn(
        "tilt-card group relative cursor-default border border-transparent bg-hub-paper transition-colors duration-300 hover:border-hub-accent",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 block h-px scale-x-0 bg-gradient-to-r from-transparent via-hub-accent to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
        style={{ transformOrigin: "center" }}
      />
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 bottom-3 block h-px scale-x-0 bg-gradient-to-r from-hub-accent via-hub-accent/60 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
}

/**
 * The accent eyebrow label used at the top of an AnimatedCard.
 * Shifts color + slides right on group-hover.
 */
export function CardLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "hub-eyebrow text-hub-ink-muted transition-colors duration-300 group-hover:text-hub-accent",
        className,
      )}
    >
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
        {children}
      </span>
    </span>
  );
}
