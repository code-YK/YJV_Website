"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  easeInOut,
  type MotionValue,
} from "framer-motion";
import {
  useFloating,
  offset,
  shift,
  autoUpdate,
  type Placement,
} from "@floating-ui/react";

/**
 * "Is this you?" pain-point reveal, modeled on the Bima template section.
 *
 * Desktop (md+): a tall section whose inner panel is `sticky` (the pin). Framer
 * Motion's `useScroll` tracks progress through the section and drives each
 * statement's opacity (the scrub reveal), while a continuous Framer Motion
 * float bobs each one. Floating UI anchors every statement around the centered
 * headline (reference) at a corner placement, with collision shifting so they
 * never run off-screen.
 *
 * Mobile / reduced-motion: a static centered stack, no pin, no float.
 */

interface Pain {
  text: string;
  placement: Placement;
  offset: { mainAxis: number; crossAxis: number };
  /** scrollYProgress breakpoints: [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd] */
  range: [number, number, number, number];
  floatDur: number;
  floatDelay: number;
}

const PAINS: Pain[] = [
  {
    text: "High response times lose deals",
    placement: "top-start",
    offset: { mainAxis: 56, crossAxis: -120 },
    range: [0.05, 0.13, 0.24, 0.32],
    floatDur: 5.5,
    floatDelay: 0,
  },
  {
    text: "Manual work piles up",
    placement: "top-end",
    offset: { mainAxis: 150, crossAxis: 120 },
    range: [0.17, 0.25, 0.36, 0.44],
    floatDur: 6.2,
    floatDelay: 0.4,
  },
  {
    text: "Scaling support means scaling headcount",
    placement: "bottom-start",
    offset: { mainAxis: 150, crossAxis: -120 },
    range: [0.4, 0.48, 0.59, 0.67],
    floatDur: 5.8,
    floatDelay: 0.8,
  },
  {
    text: "You need AI, but not sure where to start",
    placement: "bottom-end",
    offset: { mainAxis: 56, crossAxis: 120 },
    range: [0.52, 0.6, 0.7, 0.78],
    floatDur: 6.6,
    floatDelay: 1.2,
  },
];

/** Two-corner reticle frame (L-shaped ticks at opposite corners), h2-scale. */
function Reticle({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-block px-4 py-3">
      <span
        aria-hidden
        className="absolute left-0 top-0 h-4 w-4 border-l border-t border-white/40"
      />
      <span
        aria-hidden
        className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/40"
      />
      <h3 className="max-w-[15rem] font-[family-name:var(--font-outfit)] text-xl font-medium leading-snug text-white/75 md:text-3xl">
        {children}
      </h3>
    </div>
  );
}

function Headline({
  refCallback,
}: {
  refCallback?: (el: HTMLHeadingElement | null) => void;
}) {
  return (
    <h2
      ref={refCallback}
      className="font-[family-name:var(--font-outfit)] text-5xl font-bold leading-[1.02] tracking-tight text-white md:text-7xl lg:text-8xl"
    >
      Is this{" "}
      <span className="bg-gradient-to-r from-white to-[#22d3ee] bg-clip-text text-transparent">
        you?
      </span>
    </h2>
  );
}

/** One statement: Floating-UI-anchored, Framer-Motion floated + scroll-revealed. */
function FloatingPain({
  pain,
  reference,
  progress,
  reduced,
}: {
  pain: Pain;
  reference: HTMLElement | null;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  // Controlled `elements` API: state-setter refs only, so nothing reads a ref
  // value during render (keeps the react-hooks/refs rule happy).
  const [floatingNode, setFloatingNode] = useState<HTMLDivElement | null>(null);
  const { floatingStyles } = useFloating({
    placement: pain.placement,
    strategy: "absolute",
    middleware: [offset(pain.offset), shift({ padding: 16 })],
    whileElementsMounted: autoUpdate,
    elements: { reference, floating: floatingNode },
  });

  // Hooks must run unconditionally; applied only when motion is on. Eased
  // mapping keeps the fade smooth even though it tracks scroll 1:1.
  const opacity = useTransform(progress, pain.range, [0, 1, 1, 0], {
    ease: easeInOut,
  });
  const revealY = useTransform(progress, pain.range, [22, 0, 0, -10], {
    ease: easeInOut,
  });

  return (
    <div ref={setFloatingNode} style={floatingStyles} className="z-[1] w-max">
      <motion.div style={reduced ? undefined : { opacity, y: revealY }}>
        {/* inner element carries the continuous float (additive translateY) */}
        <motion.div
          animate={reduced ? undefined : { y: [0, -9, 0] }}
          transition={
            reduced
              ? undefined
              : {
                  duration: pain.floatDur,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "loop",
                  delay: pain.floatDelay,
                }
          }
        >
          <Reticle>{pain.text}</Reticle>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function IsThisYou() {
  const [sectionEl, setSectionEl] = useState<HTMLElement | null>(null);
  const [headlineEl, setHeadlineEl] = useState<HTMLHeadingElement | null>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: { current: sectionEl } as React.RefObject<HTMLElement>,
    offset: ["start start", "end end"],
  });

  // Drive the reveal directly off scroll position (no spring lag) so every one
  // of the four statements is guaranteed to display before the section unpins.
  // Smoothness comes from eased transitions + the continuous float, not a lag.
  const progress = scrollYProgress;

  return (
    <>
      {/* Desktop: tall section with a sticky (pinned) panel. */}
      <section
        ref={setSectionEl}
        className="relative hidden h-[340vh] border-t border-white/[0.06] bg-hub-paper md:block"
      >
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 50%, rgba(34,211,238,0.08), transparent 70%)",
            }}
          />
          <Headline refCallback={setHeadlineEl} />
          {headlineEl
            ? PAINS.map((p) => (
                <FloatingPain
                  key={p.text}
                  pain={p}
                  reference={headlineEl}
                  progress={progress}
                  reduced={reduced}
                />
              ))
            : null}
        </div>
      </section>

      {/* Mobile / reduced-motion: static centered stack. */}
      <section className="relative flex flex-col items-center gap-8 overflow-hidden border-t border-white/[0.06] bg-hub-paper px-6 py-28 text-center md:hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 40%, rgba(34,211,238,0.08), transparent 70%)",
          }}
        />
        <div className="relative">
          <Headline />
        </div>
        <div className="relative flex flex-col items-center gap-6">
          {PAINS.map((p) => (
            <Reticle key={p.text}>{p.text}</Reticle>
          ))}
        </div>
      </section>
    </>
  );
}

export default IsThisYou;
