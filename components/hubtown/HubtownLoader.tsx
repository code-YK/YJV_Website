"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const FLAG = "yj-loaded-v2";

export function HubtownLoader() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(FLAG)) return;
    } catch {
      /* ignore */
    }
    setActive(true);

    if (reduced) {
      setProgress(100);
      try {
        sessionStorage.setItem(FLAG, "1");
      } catch {
        /* ignore */
      }
      const t = window.setTimeout(() => setActive(false), 300);
      return () => window.clearTimeout(t);
    }

    const start = performance.now();
    const duration = 1200;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 2);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        try {
          sessionStorage.setItem(FLAG, "1");
        } catch {
          /* ignore */
        }
        const hold = window.setTimeout(() => setActive(false), 280);
        return () => window.clearTimeout(hold);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="hub-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] grid place-items-center bg-hub-paper"
          aria-hidden
        >
          <div className="flex w-full max-w-xl flex-col items-center gap-10 px-6">
            <div className="hub-eyebrow text-center text-hub-ink-muted">
              {progress < 100 ? "Loading content" : "Ready to explore"}
            </div>
            <div className="flex w-full items-baseline justify-between font-[family-name:var(--font-space-mono)] text-hub-ink">
              <span className="text-3xl tracking-tight md:text-4xl">000</span>
              <span className="hub-display text-6xl md:text-8xl">
                {String(progress).padStart(3, "0")}
              </span>
              <span className="text-3xl tracking-tight md:text-4xl">100</span>
            </div>
            <div className="relative h-px w-full overflow-hidden bg-hub-rule">
              <motion.div
                className="absolute inset-y-0 left-0 bg-hub-accent shadow-[0_0_12px_var(--hub-accent)]"
                style={{ width: `${progress}%` }}
              />
              <motion.span
                aria-hidden
                className="absolute inset-y-0 left-0 block w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 1.4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.2,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
