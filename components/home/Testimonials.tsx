"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { testimonials } from "@/lib/content/testimonials";

export function Testimonials() {
  return (
    <section className="relative isolate py-24 md:py-32" id="testimonials">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Proof"
          title="The bar our clients hold us to"
          subtitle="Results from live deployments. Named references available on request."
        />

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {testimonials.map((t, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <GlowCard className="flex h-full flex-col">
                <Quote
                  className="h-8 w-8 text-[var(--accent-blue)]"
                  aria-hidden
                />
                <p className="mt-4 text-lg leading-relaxed text-white/90">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-auto pt-6">
                  {t.rating && (
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="h-4 w-4 fill-[var(--accent-blue)] text-[var(--accent-blue)]"
                          aria-hidden
                        />
                      ))}
                    </div>
                  )}
                  <p className="mt-3 text-sm font-medium text-white">
                    {t.authorName ?? t.authorRole}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {t.authorName ? `${t.authorRole} · ` : ""}
                    {t.authorCompany}
                  </p>
                </div>
              </GlowCard>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
