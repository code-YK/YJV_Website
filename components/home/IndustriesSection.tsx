"use client";

import { useRef, useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { industries } from "@/lib/content/industries";
import { cn } from "@/lib/utils";

export function IndustriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tablistId = useId();

  const active = industries[activeIndex];

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    let next = activeIndex;
    if (e.key === "ArrowLeft") next = (activeIndex - 1 + industries.length) % industries.length;
    if (e.key === "ArrowRight") next = (activeIndex + 1) % industries.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = industries.length - 1;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="relative isolate py-24 md:py-32" id="industries">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Industries"
          title="Built for your industry"
          subtitle="We've shipped in regulated and operationally-complex industries, and we don't pretend each one is the same."
        />

        <div className="mt-16">
          <div
            role="tablist"
            aria-label="Industries"
            onKeyDown={handleKey}
            className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:px-0 md:overflow-visible md:pb-0"
          >
            {industries.map((industry, i) => {
              const selected = i === activeIndex;
              return (
                <button
                  key={industry.slug}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${tablistId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                    selected
                      ? "border-[var(--accent-blue)] bg-[var(--accent-blue)]/15 text-white"
                      : "border-[var(--border-subtle)] bg-[var(--bg-card)]/40 text-[var(--text-muted)] hover:text-white",
                  )}
                >
                  <Icon name={industry.icon} className="h-4 w-4" />
                  {industry.name}
                </button>
              );
            })}
          </div>

          <div
            id={`${tablistId}-panel`}
            role="tabpanel"
            aria-labelledby={`${tablistId}-tab-${activeIndex}`}
            className="mt-10"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <GlowCard hoverable={false} className="md:p-10">
                  <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(139,92,246,0.18))] text-[var(--accent-blue)]">
                        <Icon name={active.icon} className="h-7 w-7" />
                      </div>
                      <h3 className="mt-6 font-display text-2xl font-semibold text-white md:text-3xl">
                        {active.name}
                      </h3>
                      <p className="mt-4 text-[var(--text-muted)]">
                        {active.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 lg:col-span-7 md:grid-cols-2">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          Common pain points
                        </p>
                        <ul className="mt-3 space-y-2">
                          {active.painPoints.map((p) => (
                            <li
                              key={p}
                              className="flex items-start gap-2 text-sm text-white/85"
                            >
                              <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent-purple)]" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          What we deliver
                        </p>
                        <ul className="mt-3 space-y-2">
                          {active.outcomes.map((o) => (
                            <li
                              key={o}
                              className="flex items-start gap-2 text-sm text-white/85"
                            >
                              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent-blue)]" />
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
