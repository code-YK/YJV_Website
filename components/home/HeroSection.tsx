"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";
import { FloatingElement } from "@/components/parallax/FloatingElement";
import { heroContent } from "@/lib/constants";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroSection() {
  const reduced = useReducedMotion();
  const variants = reduced ? undefined : containerVariants;
  const item = reduced ? undefined : itemVariants;

  return (
    <section className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-6 pt-24 pb-16 md:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <HeroCanvas />
      </div>

      <FloatingElement
        strength={20}
        className="absolute -top-24 left-[18%] -z-10"
      >
        <div className="h-96 w-96 rounded-full bg-blue-500/15 blur-[120px]" />
      </FloatingElement>
      <FloatingElement
        strength={-12}
        className="absolute bottom-0 right-[10%] -z-10"
      >
        <div className="h-[28rem] w-[28rem] rounded-full bg-purple-500/10 blur-[140px]" />
      </FloatingElement>

      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-black to-transparent" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={variants}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.div variants={item}>
          <Badge>{heroContent.eyebrow}</Badge>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-[80px]"
        >
          Transform Your Business with{" "}
          <GradientText>AI Automation</GradientText>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-lg text-[var(--text-muted)] md:text-xl"
        >
          {heroContent.subhead}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <Button variant="primary" href={heroContent.primaryCta.href}>
            {heroContent.primaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" href={heroContent.secondaryCta.href}>
            {heroContent.secondaryCta.label}
          </Button>
        </motion.div>

        <motion.ul
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {heroContent.trustPills.map((pill) => (
            <li
              key={pill}
              className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 px-4 py-1.5 text-xs text-[var(--text-muted)] backdrop-blur"
            >
              {pill}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
          className="flex flex-col items-center gap-2 text-[var(--text-muted)]"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
