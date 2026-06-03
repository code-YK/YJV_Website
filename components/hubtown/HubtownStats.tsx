"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { AnimatedCard, CardLabel } from "@/components/shared/AnimatedCard";

interface StatTile {
  numeric: number;
  display: string;
  label: string;
}

const TILES: StatTile[] = [
  { numeric: 50, display: "50+", label: "Projects shipped" },
  { numeric: 7, display: "07", label: "Countries served" },
  { numeric: 6, display: "06 wk", label: "Median time to prod" },
  { numeric: 100, display: "100%", label: "Senior engineers" },
];

function Numeral({ tile, start }: { tile: StatTile; start: boolean }) {
  const value = useCountUp({ target: tile.numeric, durationMs: 1600, start });
  if (!start) return <>{tile.display.replace(/[0-9]+/, "0")}</>;
  return <>{tile.display.replace(/[0-9]+/, String(value))}</>;
}

export function HubtownStats() {
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
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-px overflow-hidden border border-hub-rule bg-hub-rule md:grid-cols-4"
    >
      {TILES.map((tile, i) => (
        <AnimatedCard
          key={tile.label}
          delay={i * 0.1}
          className="flex flex-col gap-6 p-8 md:p-10"
        >
          <p className="hub-display text-[clamp(40px,5vw,76px)] text-hub-accent">
            <Numeral tile={tile} start={start} />
          </p>
          <CardLabel>{tile.label}</CardLabel>
        </AnimatedCard>
      ))}
    </div>
  );
}
