"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { Icon } from "@/components/ui/Icon";
import { processSteps } from "@/lib/content/process";
import { cn } from "@/lib/utils";

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative isolate py-24 md:py-32" id="process">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Process"
          title="Six steps from idea to launch"
          subtitle="A repeatable, transparent process so you always know where you are and what's next."
        />

        <div ref={containerRef} className="relative mt-16 md:mt-24">
          <div
            className="pointer-events-none absolute left-6 top-0 hidden h-full w-px md:left-1/2 md:block md:-translate-x-1/2"
            aria-hidden
          >
            <svg
              width="2"
              height="100%"
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="100"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="100"
                stroke="url(#processGrad)"
                strokeWidth="2"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient id="processGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <ol className="space-y-10 md:space-y-16">
            {processSteps.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <li key={step.step} className="relative">
                  <div
                    className={cn(
                      "grid grid-cols-1 md:grid-cols-2 md:gap-12",
                      left ? "md:[&>*:first-child]:pr-0" : "",
                    )}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: left ? -24 : 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "relative",
                        left ? "md:col-start-1 md:text-right" : "md:col-start-2",
                      )}
                    >
                      <GlowCard className="md:p-8">
                        <div
                          className={cn(
                            "flex items-center gap-3",
                            left ? "md:justify-end" : "",
                          )}
                        >
                          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                            Step {step.step.toString().padStart(2, "0")}
                          </span>
                          <span className="h-px w-8 bg-[var(--border-subtle)]" />
                        </div>
                        <div
                          className={cn(
                            "mt-3 flex items-center gap-3",
                            left ? "md:flex-row-reverse" : "",
                          )}
                        >
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(139,92,246,0.18))] text-[var(--accent-blue)]">
                            <Icon name={step.icon} className="h-5 w-5" />
                          </div>
                          <h3 className="font-display text-2xl font-semibold text-white">
                            {step.name}
                          </h3>
                        </div>
                        <p className="mt-3 text-sm text-[var(--text-muted)]">
                          {step.description}
                        </p>
                        <ul
                          className={cn(
                            "mt-4 flex flex-wrap gap-2",
                            left ? "md:justify-end" : "",
                          )}
                        >
                          {step.deliverables.map((d) => (
                            <li
                              key={d}
                              className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 px-3 py-1 text-xs text-white/80"
                            >
                              {d}
                            </li>
                          ))}
                        </ul>
                      </GlowCard>
                    </motion.div>
                  </div>

                  <div
                    aria-hidden
                    className="absolute left-6 top-8 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-black bg-[var(--accent-blue)] shadow-[0_0_12px_var(--accent-blue)] md:left-1/2 md:block"
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
