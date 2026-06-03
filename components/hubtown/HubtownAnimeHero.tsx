"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { animate, stagger } from "animejs";
import { ArrowRight } from "lucide-react";
import { HubtownAnimeGrid } from "./HubtownAnimeGrid";
import { FaultyTerminal } from "./FaultyTerminal";
import type { HubtownHeroProps } from "./HubtownHero";
import { RotatingWord } from "./RotatingWord";

const WORDMARK = "YJ VENTURES";

export function HubtownAnimeHero({
  eyebrow,
  title,
  body,
  cta,
  secondary,
  chapterId = "future",
  rotator,
}: HubtownHeroProps) {
  const reduced = useReducedMotion();
  const wordmarkRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (reduced) return;
    const root = wordmarkRef.current;
    if (!root) return;
    const chars = root.querySelectorAll<HTMLSpanElement>("[data-glyph]");
    if (!chars.length) return;
    chars.forEach((c) => {
      c.style.opacity = "0";
      c.style.filter = "blur(8px)";
      c.style.transform = "translateY(36px)";
    });
    animate(chars, {
      opacity: [0, 1],
      filter: ["blur(8px)", "blur(0px)"],
      translateY: [36, 0],
      duration: 800,
      ease: "outExpo",
      delay: stagger(45),
    });
  }, [reduced]);

  return (
    <section
      id={chapterId}
      className="relative isolate flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#060608] pt-32 pb-20 text-white md:pt-40"
    >
      <div className="absolute inset-0 z-0 opacity-60">
        <FaultyTerminal
          scale={1.6}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.6}
          scanlineIntensity={0.8}
          glitchAmount={1.1}
          flickerAmount={0.9}
          noiseAmp={0.7}
          chromaticAberration={1.5}
          curvature={0.12}
          tint="#a78bfa"
          mouseReact
          mouseStrength={0.45}
          pageLoadAnimation
          brightness={0.95}
        />
      </div>
      <HubtownAnimeGrid wordmark="YJ" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(6,6,8,0.72)_0%,rgba(6,6,8,0.45)_45%,transparent_75%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 text-center md:px-12">
        <p
          className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.32em] text-white/55"
        >
          {eyebrow}
        </p>

        <h1
          ref={wordmarkRef}
          aria-label={WORDMARK}
          className="mt-8 font-[family-name:var(--font-space-grotesk)] text-[clamp(72px,14vw,196px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white"
        >
          {[...WORDMARK].map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              data-glyph
              aria-hidden
              className="inline-block"
              style={{ whiteSpace: ch === " " ? "pre" : undefined }}
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
        </h1>

        <p className="mt-8 font-[family-name:var(--font-space-mono)] text-xs uppercase tracking-[0.28em] text-white/55 md:text-sm">
          → orchestrating autonomous business, yjventures
        </p>

        <h2 className="mt-12 max-w-3xl font-[family-name:var(--font-space-grotesk)] text-2xl font-medium leading-snug text-white/85 md:text-3xl">
          {rotator ? (
            <>
              <span className="whitespace-pre">{rotator.lead} </span>
              <RotatingWord words={rotator.words} />
            </>
          ) : (
            title
          )}
        </h2>

        {body && (
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
            {body}
          </p>
        )}

        {(cta || secondary) && (
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            {cta && (
              <Link
                href={cta.href}
                className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-7 py-3.5 font-[family-name:var(--font-space-grotesk)] text-[11px] font-bold uppercase tracking-[0.22em] text-[#060608] shadow-[0_0_36px_rgba(99,102,241,0.45)] transition-all duration-300 hover:bg-transparent hover:text-white hover:shadow-[0_0_56px_rgba(99,102,241,0.75)]"
              >
                {cta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            {secondary && (
              <Link
                href={secondary.href}
                className="inline-flex items-center gap-2 rounded-full border border-[#a78bfa]/40 bg-transparent px-7 py-3.5 font-[family-name:var(--font-space-grotesk)] text-[11px] font-bold uppercase tracking-[0.22em] text-[#a78bfa] transition-colors duration-300 hover:border-[#a78bfa] hover:text-white"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-2xl text-white/40">
        ↓
      </div>
    </section>
  );
}
