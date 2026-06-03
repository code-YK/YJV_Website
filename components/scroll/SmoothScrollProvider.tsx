"use client";

import { useEffect } from "react";
import type Lenis from "lenis";
import { setLenis, setScrollState } from "@/lib/scroll/smoothScroll";
import { prefersReducedMotion } from "@/lib/hero/detectWebGL";

/**
 * Global smooth-scroll authority for the Dala-style experience.
 *
 * Instantiates Lenis (the gliding scroll), drives it from GSAP's single ticker
 * (`gsap.ticker.add` + `lagSmoothing(0)`), and keeps ScrollTrigger in sync via
 * `lenis.on("scroll", ScrollTrigger.update)`. Lenis drives the real
 * `window.scrollY`, so `react-scroll-parallax` and framer-motion `useScroll`
 * keep working, and DOM-anchor `getBoundingClientRect()` reads stay accurate.
 *
 * Skipped entirely under `prefers-reduced-motion` (native scroll, no inertia).
 * The live velocity / position are published to the shared scroll store for
 * the canvas RAF loop to read.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cancelled = false;
    let lenis: Lenis | null = null;
    let rafCb: ((time: number) => void) | null = null;
    let ticker: typeof import("gsap")["gsap"]["ticker"] | null = null;
    let onScroll: (() => void) | null = null;

    (async () => {
      const LenisCtor = (await import("lenis")).default;
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      const gsap = gsapMod.gsap ?? gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      lenis = new LenisCtor({ lerp: 0.1, smoothWheel: true });
      setLenis(lenis);

      onScroll = () => {
        if (!lenis) return;
        setScrollState(lenis.velocity, lenis.scroll);
        ScrollTrigger.update();
      };
      lenis.on("scroll", onScroll);

      ticker = gsap.ticker;
      rafCb = (time: number) => {
        // gsap.ticker time is seconds; Lenis.raf wants milliseconds.
        lenis?.raf(time * 1000);
      };
      ticker.add(rafCb);
      ticker.lagSmoothing(0);
    })();

    return () => {
      cancelled = true;
      if (ticker && rafCb) ticker.remove(rafCb);
      if (lenis && onScroll) lenis.off("scroll", onScroll);
      lenis?.destroy();
      setLenis(null);
      setScrollState(0, 0);
    };
  }, []);

  return <>{children}</>;
}

export default SmoothScrollProvider;
