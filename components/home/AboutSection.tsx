"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/Badge";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { stats } from "@/lib/content/stats";
import type { Stat } from "@/lib/content/types";

function StatTile({ stat }: { stat: Stat }) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, amount: 0.4 });
  const value = useCountUp({
    target: stat.target ?? 0,
    start: inView,
  });
  const display = stat.target != null ? `${stat.prefix ?? ""}${value}${stat.suffix ?? ""}` : stat.value;

  return (
    <GlowCard ref={ref} className="text-center">
      <p className="font-display text-4xl font-bold text-white md:text-5xl">
        {display}
      </p>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{stat.label}</p>
    </GlowCard>
  );
}

export function AboutSection() {
  return (
    <section className="relative isolate py-24 md:py-32" id="about">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:px-8 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <Badge>About YJ Ventures</Badge>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            A senior team that ships AI-grade software, on time.
          </h2>
          <p className="mt-6 text-lg text-[var(--text-muted)]">
            We&apos;re a small, senior team that builds AI automation and custom
            SaaS for teams that need real engineering, not slideware. Every
            engagement starts with a clear scope, weekly demos, and a fixed
            price for each sprint.
          </p>
          <p className="mt-4 text-lg text-[var(--text-muted)]">
            We&apos;ve shipped automations that replaced full operations teams,
            copilots that handle the long tail of customer support, and SaaS
            products that scaled from MVP to seed round in under three months.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 gap-4 lg:col-span-6"
        >
          {stats.map((stat) => (
            <StatTile key={stat.label} stat={stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
