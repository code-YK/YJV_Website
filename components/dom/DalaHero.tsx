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

/**
 * Static 2D fallback that stands in for the WebGL morph (no-WebGL, ?webgl=off,
 * reduced motion, and the pre-mount LCP paint). It evokes the particle field:
 * a depth-sorted cluster of nodes drawn into a loose orb around a glowing core,
 * with soft colour blooms behind it. Particle layout is generated once from a
 * fixed seed so SSR and client markup match exactly (no hydration drift).
 */
function makeRng(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface FieldNode {
  x: number;
  y: number;
  r: number;
  o: number;
  twinkle: boolean;
  delay: number;
}

const FIELD: FieldNode[] = (() => {
  const rng = makeRng(0x59_4a_56_31); // "YJV1"
  const N = 64;
  return Array.from({ length: N }, () => {
    const ang = rng() * Math.PI * 2;
    const rad = Math.pow(rng(), 1.7); // 0..1, denser toward the core
    const depth = 1 - rad; // core nodes read as "closer": bigger + brighter
    return {
      x: 50 + Math.cos(ang) * rad * 33 + (rng() - 0.5) * 4,
      y: 44 + Math.sin(ang) * rad * 26 + (rng() - 0.5) * 4,
      r: 0.4 + depth * 0.95,
      o: 0.3 + depth * 0.55,
      twinkle: rng() > 0.62,
      delay: rng() * 5,
    };
  });
})();

const FIELD_EDGES: [number, number, number][] = (() => {
  const edges: [number, number, number][] = [];
  for (let i = 0; i < FIELD.length; i++) {
    for (let j = i + 1; j < FIELD.length; j++) {
      const d = Math.hypot(FIELD[i].x - FIELD[j].x, FIELD[i].y - FIELD[j].y);
      if (d < 8.5) edges.push([i, j, d]);
    }
  }
  return edges;
})();

function StaticField({ motion }: { motion: boolean }) {
  return (
    <div className="absolute inset-0">
      <style>{`
        @keyframes hubFallbackDrift { 0%,100%{transform:translate3d(0,0,0)} 50%{transform:translate3d(0,-1.4%,0)} }
        @keyframes hubFallbackPulse { 0%,100%{opacity:.45;transform:scale(1)} 50%{opacity:.8;transform:scale(1.07)} }
        @keyframes hubFallbackTwinkle { 0%,100%{opacity:.15} 50%{opacity:1} }
      `}</style>

      {/* Soft colour blooms for depth. */}
      <div
        className="absolute left-1/2 top-[42%] h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.22) 0%, rgba(45,212,191,0.10) 38%, transparent 70%)",
          filter: "blur(36px)",
          animation: motion ? "hubFallbackPulse 9s ease-in-out infinite" : undefined,
        }}
      />
      <div
        className="absolute left-[34%] top-[58%] h-[34vmin] w-[34vmin] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.16) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute left-[68%] top-[30%] h-[30vmin] w-[30vmin] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)",
          filter: "blur(44px)",
        }}
      />

      {/* Particle cluster. */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <g style={{ animation: motion ? "hubFallbackDrift 16s ease-in-out infinite" : undefined }}>
          {FIELD_EDGES.map(([a, b, d], i) => (
            <line
              key={i}
              x1={FIELD[a].x} y1={FIELD[a].y}
              x2={FIELD[b].x} y2={FIELD[b].y}
              stroke="#2dd4bf"
              strokeWidth={0.13}
              strokeOpacity={0.28 * (1 - d / 8.5)}
            />
          ))}
          {FIELD.map((p, i) => (
            <circle
              key={i}
              cx={p.x} cy={p.y} r={p.r}
              fill={i % 5 === 0 ? "#67e8f9" : "#22d3ee"}
              fillOpacity={p.o}
              style={
                motion && p.twinkle
                  ? { animation: `hubFallbackTwinkle ${4 + p.delay}s ease-in-out ${p.delay}s infinite` }
                  : undefined
              }
            />
          ))}
          {/* Bright core node — the "single idea". */}
          <circle cx={50} cy={44} r={1.6} fill="#e6fbff" fillOpacity={0.95} />
          <circle cx={50} cy={44} r={3.2} fill="none" stroke="#67e8f9" strokeWidth={0.2} strokeOpacity={0.5} />
        </g>
      </svg>
    </div>
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
      {/* Static SSR poster / no-WebGL fallback (mirrors the canvas region; fades
          out once the WebGL scene mounts). Confined to the hero via heroInView. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-700"
        style={{ opacity: enableWebGL && mounted ? 0 : heroInView ? 1 : 0 }}
      >
        <StaticField motion={enableMotion && !enableWebGL} />
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
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-5xl font-bold leading-[1] tracking-tight text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.85)] sm:text-6xl md:text-8xl md:leading-[0.95] lg:text-9xl">
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
            <dl className="dala-landing__sub mt-12 flex flex-wrap gap-x-8 gap-y-4 sm:gap-x-10">
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
