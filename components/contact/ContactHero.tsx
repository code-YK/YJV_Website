"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ParallaxImage } from "@/components/shared/ParallaxImage";
import { AnimatedText } from "@/components/shared/RevealOnScroll";
import { distances, durations, easings } from "@/lib/motion-tokens";

export function ContactHero() {
  const reduced = useReducedMotion();

  return (
    <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
      <div>
        <motion.p
          initial={reduced ? false : { opacity: 0, y: distances.md }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: durations.normal, ease: easings.smooth }}
          className="hub-eyebrow mb-10"
        >
          Reach
        </motion.p>
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: distances.lg }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: durations.slow,
            ease: easings.smooth,
            delay: 0.05,
          }}
          className="hub-display text-[clamp(40px,6vw,96px)]"
        >
          Tell us what you&apos;re{" "}
          <span className="text-hub-accent">trying to ship.</span>
        </motion.h1>
        <AnimatedText
          text="One business-day response. NDA on request. No sales scripts, we ask enough questions to scope honestly, then send a written outline."
          delay={0.2}
          stagger={0.025}
          as="p"
          className="mt-8 max-w-2xl text-base leading-relaxed text-hub-ink-muted md:text-lg"
        />
      </div>
      <ParallaxImage
        src="/images/service_consultancy.png"
        alt="Contact Us"
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="h-[300px] w-full md:h-[400px]"
        strength={40}
      />
    </div>
  );
}
