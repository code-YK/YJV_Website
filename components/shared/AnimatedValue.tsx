"use client";

import { motion, type Variants } from "framer-motion";
import { easings } from "@/lib/motion-tokens";

const easeOut = easings.smooth;

const segmentContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
};

const segmentItem: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: easeOut },
  },
};

const viewportConfig = { once: false, amount: 0.25, margin: "-10%" };

function splitWithDelimiter(value: string): {
  segments: string[];
  delimiter: string | null;
} {
  if (value.includes(" → ")) return { segments: value.split(" → "), delimiter: "→" };
  if (value.includes(" · ")) return { segments: value.split(" · "), delimiter: "·" };
  return { segments: [value], delimiter: null };
}

interface AnimatedValueProps {
  value: string;
  className?: string;
}

/**
 * Animated text value used inside AnimatedCard. If the value is
 * delimited by " → " or " · ", each segment fades up sequentially.
 * Otherwise the whole string fades in as one block.
 */
export function AnimatedValue({ value, className }: AnimatedValueProps) {
  const { segments, delimiter } = splitWithDelimiter(value);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={segmentContainer}
      className={className}
    >
      {segments.length <= 1 ? (
        <motion.span variants={segmentItem}>{value}</motion.span>
      ) : (
        <span className="inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
          {segments.map((segment, i) => (
            <span key={`${segment}-${i}`} className="inline-flex items-baseline gap-1.5">
              <motion.span variants={segmentItem}>{segment}</motion.span>
              {i < segments.length - 1 && (
                <motion.span
                  variants={segmentItem}
                  aria-hidden
                  className="text-hub-accent/80"
                >
                  {delimiter}
                </motion.span>
              )}
            </span>
          ))}
        </span>
      )}
    </motion.div>
  );
}
