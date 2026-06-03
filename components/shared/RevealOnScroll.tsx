"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { createElement, type ReactNode } from "react";
import { distances, durations, easings } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: ReactNode;
  /** Stagger between direct children, in seconds. Default 0 (no stagger). */
  stagger?: number;
  /** Initial delay before the animation starts. Default 0. */
  delay?: number;
  /** Initial Y offset in px. Default distances.lg (24). */
  offset?: number;
  /** When viewport once flag. Default true. */
  once?: boolean;
  /** Tag to render. Default "div". */
  as?: "div" | "section" | "header" | "ul" | "ol" | "p" | "h1" | "h2" | "h3";
  className?: string;
}

/**
 * Wraps any block so its content fades + slides up when scrolled
 * into view. Pass `stagger` to cascade direct children — each child
 * must accept motion props (or be wrapped in `<RevealItem>`).
 */
export function RevealOnScroll({
  children,
  stagger = 0,
  delay = 0,
  offset = distances.lg,
  once = true,
  as = "div",
  className,
}: RevealOnScrollProps) {
  const reduced = useReducedMotion();

  const containerVariants: Variants =
    stagger > 0
      ? {
          hidden: {},
          visible: {
            transition: { staggerChildren: stagger, delayChildren: delay },
          },
        }
      : {
          hidden: { opacity: 0, y: offset },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: durations.slow, ease: easings.smooth, delay },
          },
        };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Reveal-aware child for use inside <RevealOnScroll stagger>.
 * Each item fades up with the shared cascade.
 */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: distances.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.normal, ease: easings.smooth },
  },
};

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

interface AnimatedTextProps {
  text: string;
  /** Stagger per word in seconds. Default 0.04. */
  stagger?: number;
  /** Delay before the first word starts. */
  delay?: number;
  /** Tag to render. */
  as?: "p" | "span" | "h1" | "h2" | "h3";
  className?: string;
}

/**
 * Splits a string on whitespace and reveals each word as it scrolls
 * into view. Whitespace preserved between words.
 */
export function AnimatedText({
  text,
  stagger = 0.04,
  delay = 0,
  as = "p",
  className,
}: AnimatedTextProps) {
  const reduced = useReducedMotion();
  const words = text.split(/(\s+)/);

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const word: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: durations.normal, ease: easings.smooth },
    },
  };

  const MotionTag = motion[as] as typeof motion.p;

  if (reduced) {
    return createElement(as, { className }, text);
  }

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={container}
      className={cn(className)}
      aria-label={text}
    >
      {words.map((w, i) =>
        /\s+/.test(w) ? (
          <span key={i}>{w}</span>
        ) : (
          <motion.span
            key={i}
            variants={word}
            className="inline-block"
            aria-hidden
          >
            {w}
          </motion.span>
        ),
      )}
    </MotionTag>
  );
}
