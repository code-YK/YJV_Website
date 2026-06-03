"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { WorkflowGraph } from "@/components/shared/WorkflowGraph";
import { AnimatedCard, CardLabel } from "@/components/shared/AnimatedCard";
import { AnimatedValue } from "@/components/shared/AnimatedValue";
import { easings } from "@/lib/motion-tokens";
import type { Solution } from "@/lib/content/types";

const easeOut = easings.smooth;
const viewportConfig = { once: false, amount: 0.25, margin: "-10%" };

const blockVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut, delay },
  }),
};

const listContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

const listItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

function DataCell({
  label,
  value,
  delay,
}: {
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <AnimatedCard delay={delay} className="p-6 md:p-7">
      <dt>
        <CardLabel>{label}</CardLabel>
      </dt>
      <dd className="mt-3 text-sm leading-relaxed text-hub-ink md:text-base">
        <AnimatedValue value={value} />
      </dd>
    </AnimatedCard>
  );
}

export function AnimatedSolutionDetails({ solution }: { solution: Solution }) {
  const reduced = useReducedMotion();

  return (
    <>
      <dl className="grid grid-cols-1 gap-px overflow-hidden border border-hub-rule bg-hub-rule md:grid-cols-3">
        <DataCell label="Timeline" value={solution.timeline} delay={0} />
        <DataCell label="Pricing" value={solution.pricing} delay={0.08} />
        <DataCell label="Ideal for" value={solution.idealFor} delay={0.16} />
      </dl>

      {solution.notFor && (
        <motion.p
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={viewportConfig}
          variants={blockVariants}
          custom={0.1}
          className="mt-6 max-w-3xl text-sm leading-relaxed text-hub-ink-muted"
        >
          <span className="font-[family-name:var(--font-space-mono)] text-xs uppercase tracking-[0.28em] text-hub-accent">
            ✕ Not for ·{" "}
          </span>
          {solution.notFor}
        </motion.p>
      )}

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
        <motion.div
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={viewportConfig}
          variants={listContainer}
        >
          <motion.p
            variants={listItem}
            className="hub-eyebrow mb-4 text-hub-ink-muted"
          >
            Features
          </motion.p>
          <ul className="space-y-3">
            {solution.features.map((f) => (
              <motion.li
                key={f}
                variants={listItem}
                className="border-t border-hub-rule pt-3 text-sm text-hub-ink-muted"
              >
                {f}
              </motion.li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={viewportConfig}
          variants={listContainer}
        >
          <motion.p
            variants={listItem}
            className="hub-eyebrow mb-4 text-hub-ink-muted"
          >
            Outcomes
          </motion.p>
          <ul className="space-y-3">
            {solution.outcomes.map((o) => (
              <motion.li
                key={o}
                variants={listItem}
                className="border-t border-hub-rule pt-3 text-sm text-hub-ink-muted"
              >
                {o}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="mt-16">
        <motion.p
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={viewportConfig}
          variants={listItem}
          className="hub-eyebrow mb-6 text-hub-ink-muted"
        >
          Workflow
        </motion.p>
        <WorkflowGraph
          ariaLabel="Workflow"
          nodes={solution.workflow.map((w) => ({
            kind: "compact",
            label: w,
          }))}
        />
      </div>
    </>
  );
}
