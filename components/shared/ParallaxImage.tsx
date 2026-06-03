"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** Whether the image should fill its parent (next/image fill mode). */
  fill?: boolean;
  /** Width/height when not in fill mode. */
  width?: number;
  height?: number;
  /** next/image sizes hint. */
  sizes?: string;
  /** Prefer eager loading for above-the-fold images. */
  priority?: boolean;
  /** Parallax strength in px (how far the image translates over the
   *  scroll range). Default 60. Pass 0 to disable parallax. */
  strength?: number;
  /** Object-fit class for fill mode. Default `object-cover`. */
  objectFitClass?: string;
  /** Outer wrapper className (positioning, rounding, etc). */
  className?: string;
}

/**
 * Image with a subtle vertical parallax on scroll. Also fades + scales
 * in on first viewport entry. Wraps next/image so SEO/perf stay intact.
 */
export function ParallaxImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  priority,
  strength = 60,
  objectFitClass = "object-cover",
  className,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [-strength, strength],
  );
  const y = reduced ? 0 : yRaw;

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      initial={reduced ? false : { opacity: 0, scale: 1.03 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div style={{ y }} className="absolute inset-0 h-[120%]">
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes ?? "100vw"}
            priority={priority}
            className={objectFitClass}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width ?? 1200}
            height={height ?? 800}
            sizes={sizes}
            priority={priority}
            className={cn("h-full w-full", objectFitClass)}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
