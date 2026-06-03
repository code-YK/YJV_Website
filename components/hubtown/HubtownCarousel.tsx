"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/content/testimonials";

export function HubtownCarousel() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  if (total === 0) return null;

  const current = testimonials[index];

  const advance = (direction: 1 | -1) => {
    setIndex((i) => (i + direction + total) % total);
  };

  return (
    <div className="mx-auto w-full max-w-3xl text-center">
      <p className="hub-eyebrow mb-10 text-hub-ink-muted">Sound off</p>
      <div className="relative min-h-[260px]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="hub-display text-[clamp(22px,2.4vw,34px)] leading-snug text-hub-ink">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-10 font-[family-name:var(--font-space-mono)] text-xs uppercase tracking-[0.24em] text-hub-ink-muted">
              {current.authorName ? `${current.authorName} · ` : ""}
              {current.authorRole}
              {current.authorCompany ? ` · ${current.authorCompany}` : ""}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => advance(-1)}
          className="hub-ghost-btn !px-4 !py-3"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev.
        </button>
        <div className="flex items-center gap-2 px-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-hub-accent" : "w-2 bg-hub-rule"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next"
          onClick={() => advance(1)}
          className="hub-ghost-btn !px-4 !py-3"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
