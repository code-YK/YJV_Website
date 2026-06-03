"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
  type AnimationPlaybackControls,
} from "framer-motion";

export function RouteProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const progress = useMotionValue(0);
  const width = useTransform(progress, (v) => `${v * 100}%`);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const isMounted = useRef(false);

  const stop = () => {
    controls.current?.stop();
    controls.current = null;
  };

  const start = () => {
    stop();
    setActive(true);
    progress.set(0.08);
    controls.current = animate(progress, 0.85, {
      duration: 8,
      ease: [0.1, 0.4, 0.6, 1],
    });
  };

  const finish = () => {
    stop();
    controls.current = animate(progress, 1, {
      duration: 0.18,
      ease: "easeOut",
      onComplete: () => {
        setActive(false);
        progress.set(0);
      },
    });
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (
          url.pathname === window.location.pathname &&
          url.search === window.location.search
        ) {
          return;
        }
        start();
      } catch {
        // ignore invalid URLs
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    finish();
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="route-progress"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] overflow-hidden"
        >
          <motion.div
            style={{ width }}
            className="relative h-full bg-hub-accent shadow-[0_0_16px_var(--hub-accent)]"
          >
            {/* Leading edge glow */}
            <span
              aria-hidden
              className="absolute right-0 top-1/2 h-3 w-12 -translate-y-1/2 rounded-full bg-hub-accent opacity-80 blur-md"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
