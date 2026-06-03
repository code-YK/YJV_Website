"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { animate, scrambleText } from "animejs";
import { ArrowRight, ChevronDown } from "lucide-react";

export interface HubtownHeroProps {
  eyebrow: string;
  title: string;
  body?: string;
  cta?: { label: string; href: string };
  secondary?: { label: string; href: string };
  chapterId?: string;
  /**
   * Optional. When provided, the headline becomes a fixed lead phrase
   * followed by a rotating word that cycles through this list — Hubtown's
   * "We build [residential / commercial / industrial]" device.
   */
  rotator?: { lead: string; words: string[] };
}

export function HubtownHero({
  eyebrow,
  title,
  body,
  cta,
  secondary,
  chapterId = "future",
}: HubtownHeroProps) {
  const reduced = useReducedMotion();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (reduced) return;
    const el = titleRef.current;
    if (!el) return;
    animate(el, {
      innerHTML: scrambleText({
        chars: "a-zA-Z0-9!%#_",
        from: "left",
        duration: 1600,
      }),
      duration: 1600,
      delay: 120,
      ease: "inOutQuad",
    });
  }, [reduced, title]);

  return (
    <section
      id={chapterId}
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-hub-paper pt-24 pb-16 md:pt-32 md:pb-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hub-eyebrow mb-10"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          ref={titleRef}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="hub-display text-[clamp(48px,9vw,156px)]"
        >
          {title}
        </motion.h1>
        {body && (
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10 max-w-2xl text-base leading-relaxed text-hub-ink-muted md:text-lg"
          >
            {body}
          </motion.p>
        )}

        {(cta || secondary) && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-14 flex flex-wrap items-center gap-4"
          >
            {cta && (
              <Link href={cta.href} className="hub-accent-btn">
                {cta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            {secondary && (
              <Link href={secondary.href} className="hub-ghost-btn">
                {secondary.label}
              </Link>
            )}
          </motion.div>
        )}
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-20 flex items-center justify-between border-t border-hub-rule px-5 py-6 text-xs uppercase tracking-[0.22em] text-hub-ink-muted md:px-12"
      >
        <span className="font-[family-name:var(--font-space-mono)]">
          Scroll to explore
        </span>
        <ChevronDown
          className="h-4 w-4 animate-bounce text-hub-accent"
          style={{ animationDuration: "2s" }}
        />
        <span className="font-[family-name:var(--font-space-mono)]">
          Six chapters
        </span>
      </motion.div>
    </section>
  );
}
