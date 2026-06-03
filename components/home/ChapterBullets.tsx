"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { AnimatedCard } from "@/components/shared/AnimatedCard";

interface Bullet {
  label: string;
  detail: string;
}

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export function ChapterBullets({ bullets }: { bullets: Bullet[] }) {
  const reduced = useReducedMotion();

  return (
    <motion.ul
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      variants={listVariants}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
    >
      {bullets.map((b, i) => (
        <li key={b.label} className="contents">
          <AnimatedCard
            delay={i * 0.06}
            className="flex gap-5 rounded-xl p-6 md:p-8"
          >
            <span className="font-[family-name:var(--font-space-mono)] text-xs text-hub-accent transition-colors duration-300 group-hover:text-hub-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="transition-transform duration-300 group-hover:translate-x-1">
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-hub-ink transition-colors duration-300 group-hover:text-hub-accent md:text-lg">
                {b.label}
              </h3>
              <p className="mt-2 text-sm text-hub-ink-muted">{b.detail}</p>
            </div>
          </AnimatedCard>
        </li>
      ))}
    </motion.ul>
  );
}
