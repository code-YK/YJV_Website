"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface RotatingWordProps {
  words: string[];
  intervalMs?: number;
  className?: string;
}

export function RotatingWord({
  words,
  intervalMs = 2800,
  className,
}: RotatingWordProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduced || words.length < 2 || paused) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      intervalMs,
    );
    return () => window.clearInterval(id);
  }, [reduced, words.length, intervalMs, paused]);

  const widest = words.reduce((a, b) => (a.length >= b.length ? a : b));
  const current = words[index];

  return (
    <span
      ref={wrapperRef}
      className={`relative inline-flex items-baseline ${className ?? ""}`}
      aria-live="polite"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      tabIndex={0}
      role="text"
      aria-label={`Rotating: ${words.join(", ")}. Currently showing ${current}.`}
    >
      <span aria-hidden className="invisible whitespace-pre">
        {widest}
      </span>
      <span className="absolute inset-0 overflow-hidden" aria-hidden>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current}
            className="inline-block whitespace-pre text-hub-accent"
            initial={reduced ? false : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
            transition={{
              duration: reduced ? 0.01 : 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
