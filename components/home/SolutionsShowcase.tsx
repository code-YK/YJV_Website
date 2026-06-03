"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { Icon } from "@/components/ui/Icon";
import { solutions } from "@/lib/content/solutions";
import { cn } from "@/lib/utils";

export function SolutionsShowcase() {
  return (
    <section className="relative isolate py-24 md:py-32" id="solutions">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Solutions"
          title="Productised offerings"
          subtitle="Four pre-scoped solutions you can deploy in weeks, not quarters."
        />

        <div className="mt-16 space-y-16 md:space-y-24">
          {solutions.map((solution, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.div
                key={solution.slug}
                id={solution.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16",
                )}
              >
                <div
                  className={cn(
                    "lg:col-span-6",
                    reverse ? "lg:order-2" : "lg:order-1",
                  )}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(139,92,246,0.18))] text-[var(--accent-blue)]">
                    <Icon name={solution.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-white md:text-3xl">
                    {solution.name}
                  </h3>
                  <p className="mt-4 text-[var(--text-muted)]">
                    {solution.description}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {solution.outcomes.map((o) => (
                      <li
                        key={o}
                        className="flex items-start gap-3 text-sm text-white/85"
                      >
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent-blue)]" />
                        {o}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/solutions#${solution.slug}`}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-blue)] hover:text-white"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>

                <div
                  className={cn(
                    "lg:col-span-6",
                    reverse ? "lg:order-1" : "lg:order-2",
                  )}
                >
                  <GlowCard hoverable={false} className="md:p-8">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      Workflow
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      {solution.workflow.map((step, idx) => (
                        <div
                          key={step}
                          className="flex flex-wrap items-center gap-3"
                        >
                          <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)]/80 px-3 py-1.5 text-xs text-white">
                            {step}
                          </span>
                          {idx < solution.workflow.length - 1 && (
                            <ArrowRight
                              className="h-4 w-4 text-[var(--text-muted)]"
                              aria-hidden
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      Features
                    </p>
                    <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {solution.features.map((f) => (
                        <li
                          key={f}
                          className="text-sm text-white/85 before:mr-2 before:text-[var(--accent-blue)] before:content-['→']"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  </GlowCard>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
