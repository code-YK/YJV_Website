"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";

// TODO(user): replace with real outcomes/case studies before launch.
const OUTCOMES = [
  {
    metric: "12 weeks",
    label: "Lead routing rebuilt",
    summary:
      "A PropTech client cut median lead response from 4 hours to 90 seconds and recovered 35% of dropped leads.",
  },
  {
    metric: "70%",
    label: "Of tier-1 ops automated",
    summary:
      "An e-commerce brand offloaded order-status, returns, and refunds entirely, CSAT held steady.",
  },
  {
    metric: "9 weeks",
    label: "MVP to live signups",
    summary:
      "A fintech founder went from Figma to live signups in nine weeks, then raised seed two weeks later.",
  },
];

export function IndustryOutcomes() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Outcomes"
          title="What that looks like in practice"
          subtitle="Anonymised summaries from recent engagements. Named case studies on request."
        />
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {OUTCOMES.map((o) => (
            <motion.li
              key={o.label}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <GlowCard className="h-full">
                <p className="font-display text-4xl font-bold text-white md:text-5xl">
                  {o.metric}
                </p>
                <p className="mt-2 text-sm font-medium text-[var(--accent-blue)]">
                  {o.label}
                </p>
                <p className="mt-4 text-sm text-[var(--text-muted)]">{o.summary}</p>
              </GlowCard>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
