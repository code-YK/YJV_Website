"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SectionBlockProps {
  eyebrow: string;
  title: ReactNode;
  body: string;
  image?: { src: string; alt: string; priority?: boolean };
  cta?: { label: string; href: string };
  align?: "left" | "right";
  tone?: "surface" | "subtle";
  children?: ReactNode;
  hairline?: boolean;
}

export function SectionBlock({
  eyebrow,
  title,
  body,
  image,
  cta,
  align = "left",
  tone = "surface",
  children,
  hairline = true,
}: SectionBlockProps) {
  const reduced = useReducedMotion();
  const imageRight = align === "right";

  const inner = (
    <div
      className={cn(
        "relative mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-5 py-20 md:px-12 md:py-24 lg:grid-cols-2 lg:gap-20 lg:px-20",
        children ? "" : "min-h-[70vh] lg:min-h-[80vh]",
      )}
    >
      <div className={cn("relative z-10", imageRight ? "lg:order-1" : "lg:order-2")}>
        <p className="font-[family-name:var(--font-space-mono)] text-xs uppercase tracking-[0.22em] text-yj-primary-container">
          {eyebrow}
        </p>
        <h2 className="mt-5 font-[family-name:var(--font-space-grotesk)] text-4xl font-semibold leading-[1.1] tracking-tight text-yj-on-surface md:text-5xl lg:text-[56px]">
          {title}
        </h2>
        <p className="mt-6 max-w-xl font-[family-name:var(--font-inter)] text-base leading-relaxed text-yj-on-surface-variant md:text-lg">
          {body}
        </p>
        {cta && (
          <Link
            href={cta.href}
            className="group mt-10 inline-flex items-center gap-2 rounded-full yj-ghost-button px-6 py-3 font-[family-name:var(--font-space-grotesk)] text-xs font-bold uppercase tracking-[0.15em] text-yj-on-surface"
          >
            {cta.label}
            <span
              aria-hidden
              className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-1"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              arrow_forward
            </span>
          </Link>
        )}
      </div>

      {image && (
        <div
          className={cn(
            "relative h-[340px] w-full overflow-hidden rounded-2xl border border-yj-outline-variant/30 md:h-[440px] lg:h-[560px]",
            imageRight ? "lg:order-2" : "lg:order-1",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={image.priority}
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-yj-surface/70 via-yj-surface/15 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-yj-primary-container/12 via-transparent to-yj-secondary-container/18 mix-blend-overlay" />
        </div>
      )}
    </div>
  );

  const wrapper = (
    <section
      className={cn(
        "relative isolate w-full",
        tone === "subtle"
          ? "bg-yj-surface-container-lowest"
          : "bg-yj-surface",
        hairline && "border-t border-yj-outline-variant/20",
      )}
    >
      {inner}
      {children && (
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-20 md:px-12 lg:px-20">
          {children}
        </div>
      )}
    </section>
  );

  if (reduced) return wrapper;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {wrapper}
    </motion.div>
  );
}
