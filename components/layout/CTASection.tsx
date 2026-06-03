"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { distances, durations, easings } from "@/lib/motion-tokens";
import type { CTA } from "@/lib/content/types";

interface CTASectionProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  primary: CTA;
  secondary?: CTA;
}

export function CTASection({
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
}: CTASectionProps) {
  const reduced = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: distances.lg }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={
            reduced
              ? undefined
              : {
                  boxShadow: "0 24px 70px -20px rgba(167,139,250,0.55)",
                  borderColor: "rgba(167,139,250,0.55)",
                }
          }
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: durations.slow, ease: easings.smooth }}
          className="tilt-card relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[linear-gradient(135deg,rgba(59,130,246,0.15),rgba(139,92,246,0.15))] p-10 md:p-16"
        >
          <div className="pointer-events-none absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-blue-500/30 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-purple-500/30 blur-[140px]" />

          <div className="relative mx-auto max-w-3xl text-center">
            {eyebrow && (
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-blue)]">
                {eyebrow}
              </p>
            )}
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-yj-on-surface md:text-5xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-lg text-[var(--text-muted)]">{subtitle}</p>
            )}

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button variant="primary" href={primary.href}>
                {primary.label}
              </Button>
              {secondary && (
                <Button variant="outline" href={secondary.href}>
                  {secondary.label}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
