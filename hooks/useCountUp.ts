"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface UseCountUpOptions {
  target: number;
  durationMs?: number;
  start: boolean;
}

export function useCountUp({ target, durationMs = 1600, start }: UseCountUpOptions) {
  const reduced = useReducedMotion();
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (!start || reduced) return;
    const t0 = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - t0;
      const t = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, start, reduced]);

  // Derive synchronously when not animating — avoids setState-in-effect.
  if (!start) return 0;
  if (reduced) return target;
  return animatedValue;
}
