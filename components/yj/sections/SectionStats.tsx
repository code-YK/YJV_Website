"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

interface StatTile {
  value: string;
  target?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const TILES: StatTile[] = [
  { value: "50+", target: 50, suffix: "+", label: "Projects shipped" },
  { value: "7", target: 7, label: "Countries served" },
  { value: "6 wk", target: 6, suffix: " wk", label: "Median time to prod" },
  { value: "0", target: 0, label: "Junior-only teams" },
];

function StatNumber({
  tile,
  start,
}: {
  tile: StatTile;
  start: boolean;
}) {
  const target = tile.target ?? 0;
  const animated = useCountUp({ target, durationMs: 1800, start });
  if (tile.target === undefined) return <>{tile.value}</>;
  return (
    <>
      {tile.prefix ?? ""}
      {animated}
      {tile.suffix ?? ""}
    </>
  );
}

export function SectionStats() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setStart(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStart(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5"
    >
      {TILES.map((tile, i) => (
        <motion.div
          key={tile.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-yj-outline-variant/30 bg-yj-surface-container/60 p-6 backdrop-blur-md"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-px inset-x-6 h-px bg-gradient-to-r from-transparent via-yj-primary-container/50 to-transparent"
          />
          <p className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-yj-primary-container md:text-5xl">
            <StatNumber tile={tile} start={start} />
          </p>
          <p className="mt-3 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.18em] text-yj-on-surface-variant">
            {tile.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
