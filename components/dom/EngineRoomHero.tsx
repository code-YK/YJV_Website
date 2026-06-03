"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { NetworkMesh } from "@/components/canvas/NetworkMesh";
import { GridCanvas } from "@/components/canvas/GridCanvas";
import { BootReadout, SystemStatusLog } from "./Terminal";
import { LedgerGrid } from "./LedgerGrid";
import { Topology } from "./Topology";
import { setHeroProgress, useHeroScroll } from "@/lib/hero/scrollStore";
import { smoothstep } from "@/lib/hero/ease";
import { prefersReducedMotion, supportsWebGL } from "@/lib/hero/detectWebGL";

/**
 * Digital Engine Room — the pinned, scroll-driven homepage hero.
 *
 * A single GSAP ScrollTrigger pins the section over 3000px and drives the
 * shared scroll store; absolutely-positioned DOM panels react across four
 * states: Deep Core -> Reveal -> Ledger -> Detachment.
 *
 * The visualization renderer is chosen by capability:
 *  - WebGL Three.js orb (Scene/DigitalOrb) = PRIMARY when hardware WebGL is
 *    available and motion isn't reduced (the brief's cinematic orb).
 *  - 2D Canvas orb (NetworkMesh) = graceful fallback (no-WebGL / low-power /
 *    reduced-motion), so the experience renders everywhere.
 * Force either path for testing with ?webgl=on / ?webgl=off.
 */
const Scene = dynamic(
  () => import("@/components/canvas/Scene").then((m) => m.Scene),
  { ssr: false },
);

const RADIAL_BG =
  "radial-gradient(120% 90% at 60% 38%, #0c1a26 0%, #08161a 45%, #0b0f14 100%)";

interface ScrollTriggerLike {
  refresh(): void;
}

function HeroCopy() {
  return (
    <div className="max-w-xl">
      <p className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">
        Autonomous Orchestration
      </p>
      <h1 className="mt-5 font-[family-name:var(--font-space-grotesk)] text-4xl font-bold leading-[1.04] tracking-tight text-white/90 md:text-6xl">
        Orchestrate Your{" "}
        <span className="text-cyan-300">Autonomous Enterprise.</span>
      </h1>
      <p className="mt-5 max-w-md text-base text-white/60 md:text-lg">
        We architect custom AI-driven solutions and multi-agent workflows that
        eliminate friction, scale operations, and transform manual processes
        into intelligent digital ecosystems.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="pointer-events-auto inline-flex items-center rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#22D3EE] px-6 py-3 text-sm font-bold text-[#06121a] shadow-[0_0_24px_-6px_rgba(34,211,238,0.6)] transition-transform hover:scale-[1.02]"
        >
          Build Your Roadmap
        </Link>
        <Link
          href="/contact"
          className="pointer-events-auto inline-flex items-center rounded-full border border-cyan-400/40 px-6 py-3 text-sm font-bold text-cyan-100 transition-colors hover:border-cyan-300 hover:text-white"
        >
          Talk to Sales
        </Link>
      </div>
    </div>
  );
}

// Static, server-rendered network backdrop (the LCP paint before the canvas
// mounts). Literal integer coords so SSR/client serialize identically.
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
      className="h-full w-full opacity-70"
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

function StatusChip() {
  return (
    <div className="absolute left-5 top-5 z-40 flex items-center gap-2 font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.3em] text-white/40 md:left-12 md:top-24">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
      System Status: <span className="text-emerald-300">Optimal</span>
    </div>
  );
}

/** Left hero copy — visible on landing, slides out as the Ledger takes over (~35%). */
function RevealContent() {
  const { progress } = useHeroScroll();
  const fadeOut = smoothstep(0.3, 0.38, progress);
  const opacity = 1 - fadeOut;
  const style: CSSProperties = {
    opacity,
    transform: `translateX(${fadeOut * -24}px)`,
  };
  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-0 z-30 flex w-full items-center px-5 md:w-[58%] md:px-12"
      style={style}
      aria-hidden={opacity < 0.05}
    >
      <div className="w-full max-w-xl rounded-2xl border border-cyan-400/15 bg-[#0a1622]/55 p-6 shadow-[0_0_60px_-20px_rgba(34,211,238,0.45)] backdrop-blur-md md:p-8">
        <HeroCopy />
        <div className="mt-7">
          <SystemStatusLog />
        </div>
      </div>
    </div>
  );
}

/** Decorative floating telemetry labels annotating the orb. */
function MeshLabels() {
  const { progress } = useHeroScroll();
  const reveal =
    smoothstep(0.12, 0.2, progress) * (1 - smoothstep(0.3, 0.38, progress));
  const ledger =
    smoothstep(0.4, 0.5, progress) * (1 - smoothstep(0.66, 0.74, progress));
  const label =
    "absolute font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-[0.25em] text-cyan-300/60";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20 hidden md:block">
      <span className={`${label} right-[26%] top-[32%]`} style={{ opacity: reveal }}>
        Multi-Agent Orchestration
      </span>
      <span className={`${label} right-[18%] top-[60%]`} style={{ opacity: reveal }}>
        Data Ingestion Layers
      </span>
      <span className={`${label} right-[33%] top-[72%]`} style={{ opacity: reveal }}>
        Cognitive Engine Router
      </span>
      <span className={`${label} left-[20%] top-[26%]`} style={{ opacity: ledger }}>
        Global Cluster Monitoring · Stable
      </span>
    </div>
  );
}

/** Decorative (visual-only) mesh control widget. */
function MeshControls() {
  const { progress } = useHeroScroll();
  const opacity =
    smoothstep(0.12, 0.22, progress) * (1 - smoothstep(0.62, 0.7, progress));
  const row =
    "flex items-center justify-between gap-3 rounded-md border border-cyan-400/20 bg-[#0a1620]/70 px-3 py-1.5 font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-[0.2em] text-cyan-200/70 backdrop-blur-sm";
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-5 top-24 z-30 hidden w-36 flex-col gap-1.5 md:right-12 md:flex"
      style={{ opacity }}
    >
      <div className={row}>
        Explore Views
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
      </div>
      <div className={row}>Zoom</div>
      <div className={row}>Reset <span>↺</span></div>
    </div>
  );
}

/** "Scroll to explore" cue, fades out as soon as the user starts scrolling. */
function ScrollHint() {
  const { progress } = useHeroScroll();
  const opacity = 1 - smoothstep(0.02, 0.1, progress);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1 font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.3em] text-cyan-300/70"
      style={{ opacity }}
    >
      <span>Scroll to explore</span>
      <span className="animate-bounce">↓</span>
    </div>
  );
}

export function EngineRoomHero() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTriggerLike | null>(null);
  const [mounted, setMounted] = useState(false);
  const [enablePin, setEnablePin] = useState(false);
  const [enableWebGL, setEnableWebGL] = useState(false);

  useEffect(() => {
    // Defer off the effect body so the first frame is the SSR static layer.
    const id = requestAnimationFrame(() => {
      setMounted(true);
      const reduced = prefersReducedMotion();
      setEnablePin(!reduced);
      // WebGL orb is primary on capable GPUs; ?webgl=on/off forces it.
      const force = new URLSearchParams(window.location.search).get("webgl");
      setEnableWebGL(
        force === "on" ? true : force === "off" ? false : !reduced && supportsWebGL(),
      );
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!enablePin) return;
    const scope = scopeRef.current;
    const pin = pinRef.current;
    if (!scope || !pin) return;

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
        ScrollTrigger.create({
          trigger: pin,
          start: "top top",
          end: "+=3000",
          pin,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self: { progress: number }) => setHeroProgress(self.progress),
        });
      }, scope);

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
      setHeroProgress(0);
    };
  }, [enablePin]);

  return (
    <section ref={scopeRef} className="relative w-full text-white" style={{ background: RADIAL_BG }}>
      <div
        ref={pinRef}
        className={`relative w-full overflow-hidden ${
          enablePin ? "h-screen" : "flex min-h-screen items-center"
        }`}
      >
        {/* Faint dot-grid alignment matrix. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700"
          style={{ opacity: mounted ? 0.35 : 0 }}
        >
          <GridCanvas spacing={42} />
        </div>

        {/* Static SSR backdrop (LCP), fades out as the canvas mounts. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700"
          style={{ opacity: mounted ? 0 : 1 }}
        >
          <StaticMesh />
        </div>

        {/* Orb: WebGL primary OR 2D fallback (one renderer, not both). */}
        <div
          aria-hidden
          className="absolute inset-0 z-[1] transition-opacity duration-700"
          style={{ opacity: mounted ? 1 : 0 }}
        >
          {enableWebGL ? <Scene /> : <NetworkMesh />}
        </div>

        {/* Vignette for engine-room depth. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 45%, transparent 55%, rgba(3,8,12,0.55) 100%)",
          }}
        />

        <RevealContent />
        <BootReadout />
        <LedgerGrid />
        <Topology />
        <MeshLabels />
        <MeshControls />
        <ScrollHint />
        <StatusChip />
      </div>
    </section>
  );
}

export default EngineRoomHero;
