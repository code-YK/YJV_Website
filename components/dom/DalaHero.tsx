"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { prefersReducedMotion, supportsWebGL } from "@/lib/hero/detectWebGL";

/**
 * Dala-style morphing-particle hero, ported from the `scroll-hero` reference
 * demo. A full-bleed fixed three.js canvas renders the GPU particle morph
 * (brain -> scatter -> bulb, scroll-driven) behind the copy: a landing panel
 * whose title rises line by line, then three reveal blocks tracing the morph's
 * beats (one shared brain -> the noise clears -> a single bright idea).
 *
 * Renderer is capability-selected: the WebGL canvas mounts when hardware WebGL
 * is available and motion isn't reduced (force with ?webgl=on / ?webgl=off);
 * otherwise a static gradient + SVG mesh poster stands in. The canvas pauses
 * (`active`) once the hero scrolls out of view.
 */
const DalaScene = dynamic(
  () => import("@/components/canvas/DalaScene").then((m) => m.DalaScene),
  { ssr: false },
);

const RADIAL_BG =
  "radial-gradient(130% 100% at 50% 20%, #07090d 0%, #020304 60%, #000000 100%)";

interface ScrollTriggerLike {
  refresh(): void;
}

/** Faint static node-mesh backdrop — the LCP paint and no-WebGL fallback. */
const SM_PTS: [number, number][] = [
  [12, 20], [28, 12], [44, 24], [62, 16], [78, 28], [88, 14],
  [20, 46], [40, 52], [58, 44], [74, 56], [90, 48],
  [16, 72], [34, 80], [52, 70], [70, 82], [86, 74],
];
const SM_EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 6], [2, 7], [3, 8], [4, 9],
  [5, 10], [6, 7], [7, 8], [8, 9], [9, 10], [6, 11], [7, 12], [8, 13],
  [9, 14], [10, 15], [11, 12], [12, 13], [13, 14], [14, 15],
];

function StaticMesh() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="h-full w-full opacity-60"
    >
      {SM_EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={SM_PTS[a][0]} y1={SM_PTS[a][1]}
          x2={SM_PTS[b][0]} y2={SM_PTS[b][1]}
          stroke="#2dc4dc" strokeWidth={0.2} strokeOpacity={0.3}
        />
      ))}
      {SM_PTS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={0.6} fill="#22d3ee" fillOpacity={0.8} />
      ))}
    </svg>
  );
}

const TITLE_LINES = ["Orchestrate", "your autonomous", "enterprise."];

const STATS: { value: string; label: string }[] = [
  { value: "40+", label: "Workflows shipped" },
  { value: "9", label: "Industries served" },
  { value: "24/7", label: "Autonomous uptime" },
];

const BLOCKS: { heading: string; body: string }[] = [
  {
    heading: "Scattered knowledge becomes one shared brain.",
    body: "Your tools, data, and decisions are fragmented across a dozen systems, and the answers your team needs are buried somewhere in the gaps between them. We connect those systems into a single context every agent can reason over — so nothing gets lost between teams, and the right information is always one question away.",
  },
  {
    heading: "Then the noise clears.",
    body: "Multi-agent workflows read that context, route the work, and act — with human-in-the-loop gates wherever revenue, PR, or compliance risk runs unattended. The repetitive busywork disappears into the background, and your people are left with the decisions that actually need a human.",
  },
  {
    heading: "And re-forms into a single bright idea.",
    body: "What was manual, brittle, and slow becomes one intelligent ecosystem — observable, cost-aware, and evaluated from sprint one. It compounds instead of cracking under load, getting more capable as it learns your business rather than more fragile as it grows.",
  },
];

export function DalaHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTriggerLike | null>(null);
  const [mounted, setMounted] = useState(false);
  const [enableWebGL, setEnableWebGL] = useState(false);
  const [enableMotion, setEnableMotion] = useState(false);
  const [heroInView, setHeroInView] = useState(true);

  // Capability resolution — deferred off the effect body so the first paint is
  // the SSR poster (satisfies set-state-in-effect lint).
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
      const reduced = prefersReducedMotion();
      setEnableMotion(!reduced);
      const force = new URLSearchParams(window.location.search).get("webgl");
      setEnableWebGL(
        force === "on" ? true : force === "off" ? false : !reduced && supportsWebGL(),
      );
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Confine the fixed canvas + vignette to the hero region and pause the scene
  // once the hero scrolls out of view.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setHeroInView(entry.isIntersecting);
      },
      { threshold: 0 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  // GSAP reveals: the title rises line by line on mount; the morph-beat blocks
  // fade up as they enter. Skipped under reduced motion (content stays visible).
  useEffect(() => {
    if (!enableMotion) return;
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;
    let ctx: { revert: () => void } | null = null;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const gsap = gsapMod.gsap ?? gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);
      stRef.current = ScrollTrigger as unknown as ScrollTriggerLike;

      ctx = gsap.context(() => {
        gsap.from(".dala-line__inner", {
          yPercent: 120,
          rotate: 3,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.12,
        });
        gsap.from(".dala-landing__sub", {
          yPercent: 60,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.08,
          delay: 0.25,
        });
        for (const el of gsap.utils.toArray<HTMLElement>(".dala-reveal")) {
          gsap.from(el, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          });
        }
      }, root);

      const w = window as Window & {
        requestIdleCallback?: (cb: () => void) => void;
      };
      const refresh = () => stRef.current?.refresh();
      if (w.requestIdleCallback) w.requestIdleCallback(refresh);
      else window.setTimeout(refresh, 200);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
      stRef.current = null;
    };
  }, [enableMotion]);

  return (
    <div ref={rootRef} data-dala-root className="relative w-full text-white" style={{ background: RADIAL_BG }}>
      {/* Static SSR poster / no-WebGL fallback backdrop (fades as the canvas mounts). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700"
        style={{ opacity: enableWebGL && mounted ? 0 : 0.8 }}
      >
        <StaticMesh />
      </div>

      {/* Full-bleed fixed morphing-particle canvas. */}
      {enableWebGL && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-700"
          style={{ opacity: mounted && heroInView ? 1 : 0 }}
        >
          <DalaScene active={mounted && heroInView} />
        </div>
      )}

      {/* Soft vignette for depth (confined to the hero region). */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-700"
        style={{
          opacity: heroInView ? 1 : 0,
          background:
            "radial-gradient(125% 85% at 50% 45%, transparent 60%, rgba(2,4,8,0.5) 100%)",
        }}
      />

      {/* Landing panel */}
      <section className="relative z-[2] flex min-h-screen flex-col justify-center px-5 md:px-12">
        <div className="max-w-4xl">
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-6xl font-bold leading-[0.95] tracking-tight text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.85)] md:text-8xl lg:text-9xl">
            {TITLE_LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span className="dala-line__inner block">
                  {i === TITLE_LINES.length - 1 ? (
                    <span className="text-cyan-300">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-8 max-w-xl">
            <p className="dala-landing__sub font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.35em] text-cyan-300/90">
              Smooth scroll · Real-time AI orchestration
            </p>
            <p className="dala-landing__sub mt-5 text-base text-white/75 [text-shadow:0_1px_16px_rgba(0,0,0,0.85)] md:text-lg">
              We architect custom AI-driven solutions and multi-agent workflows
              that eliminate friction, scale operations, and turn manual
              processes into a single intelligent ecosystem.
            </p>
            <div className="dala-landing__sub mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#22D3EE] px-6 py-3 text-sm font-bold text-[#06121a] shadow-[0_0_24px_-6px_rgba(34,211,238,0.6)] transition-transform hover:scale-[1.02]"
              >
                Build your roadmap
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-white/25 bg-black/30 px-6 py-3 text-sm font-bold text-white/90 backdrop-blur-sm transition-colors hover:border-cyan-300 hover:text-white"
              >
                Talk to sales
              </Link>
            </div>

            {/* Trust / stat row */}
            <dl className="dala-landing__sub mt-12 flex flex-wrap gap-x-10 gap-y-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white md:text-4xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.25em] text-white/55">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="dala-landing__sub mt-12 font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.3em] text-white/40">
              Scroll to watch it take shape ↓
            </p>
          </div>
        </div>
      </section>

      {/* Morph-beat blocks */}
      {BLOCKS.map((block, i) => (
        <section
          key={i}
          className="relative z-[2] flex min-h-screen items-center justify-center px-6 text-center"
        >
          <div className="dala-reveal max-w-2xl">
            <h2 className="mx-auto max-w-[18ch] font-[family-name:var(--font-space-grotesk)] text-3xl font-semibold leading-tight tracking-tight text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.85)] md:text-5xl">
              {block.heading}
            </h2>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/70 [text-shadow:0_1px_16px_rgba(0,0,0,0.9)] md:text-lg">
              {block.body}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}

export default DalaHero;
