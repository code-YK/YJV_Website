"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type HubtownSectionVariant = "centered" | "split-image" | "dark" | "split-image-dark";

export interface HubtownSectionProps {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  body?: string;
  cta?: { label: string; href: string };
  variant?: HubtownSectionVariant;
  imageOnRight?: boolean;
  image?: { src: string; alt: string; priority?: boolean };
  children?: ReactNode;
  bare?: boolean;
}

export function HubtownSection({
  id,
  eyebrow,
  title,
  body,
  cta,
  variant = "centered",
  imageOnRight = false,
  image,
  children,
  bare = false,
}: HubtownSectionProps) {
  const reduced = useReducedMotion();

  const isDark = variant === "dark" || variant === "split-image-dark";
  const isSplit = (variant === "split-image" || variant === "split-image-dark") && image;

  const sectionClasses = cn(
    "relative isolate w-full",
    isDark ? "bg-hub-paper-alt" : "bg-hub-paper",
    !bare && "border-t border-hub-rule",
  );

  const headingBlock = (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        isSplit ? "max-w-xl" : "max-w-3xl",
        variant === "centered" && !image ? "mx-auto text-center" : "",
      )}
    >
      <p className="hub-eyebrow mb-8">{eyebrow}</p>
      <h2
        className={cn(
          "hub-display",
          isSplit
            ? "text-[clamp(36px,5vw,72px)]"
            : "text-[clamp(40px,6vw,96px)]",
        )}
      >
        {title}
      </h2>
      {body && (
        <div
          className={cn(
            "mt-8 space-y-4 text-base leading-relaxed text-hub-ink-muted md:text-lg",
            variant === "centered" && !image ? "mx-auto max-w-2xl" : "max-w-xl",
          )}
        >
          {body.split(/\n\n+/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}
      {cta && (
        <div className="mt-12">
          <Link href={cta.href} className="hub-ghost-btn">
            {cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </motion.div>
  );

  return (
    <section id={id} className={sectionClasses}>
      <div className="mx-auto w-full max-w-[1440px] px-5 py-24 md:px-12 md:py-32">
        {isSplit ? (
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <div className={cn(imageOnRight ? "lg:order-1" : "lg:order-2")}>
              {headingBlock}
            </div>
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative h-[400px] w-full overflow-hidden md:h-[560px]",
                imageOnRight ? "lg:order-2" : "lg:order-1",
              )}
            >
              <Image
                src={image!.src}
                alt={image!.alt}
                fill
                priority={image!.priority}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        ) : (
          headingBlock
        )}

        {children && <div className="mt-20">{children}</div>}
      </div>
    </section>
  );
}
