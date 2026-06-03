"use client";

import { useState } from "react";
import { useHeroScroll, HeroState } from "@/lib/hero/scrollStore";
import { smoothstep } from "@/lib/hero/ease";

/**
 * State 4 (Detachment) — the orb has stretched into a full-width System
 * Topology Map. Four industry blueprints, each a clickable vector path that
 * highlights its pipeline flow and surfaces a short line of copy. Pure SVG/DOM.
 */
interface IndustryPath {
  slug: string;
  name: string;
  copy: string;
}

const INDUSTRIES: IndustryPath[] = [
  { slug: "real-estate", name: "Real Estate", copy: "Close more deals with intelligent automation." },
  { slug: "healthcare", name: "Healthcare", copy: "Automate intake, triage, and follow-up — HIPAA-aware." },
  { slug: "ecommerce", name: "E-commerce", copy: "Recover carts and scale support around the clock." },
  { slug: "education", name: "Education", copy: "Grade, admit, and tutor — grounded in your curriculum." },
];

const STOPS = ["#22d3ee", "#3b82f6", "#8b5cf6", "#34d399"];
const VB_W = 1200;
const ROW_GAP = 64;
const ROW_TOP = 60;

function flowPath(index: number): string {
  const y = ROW_TOP + index * ROW_GAP;
  const amp = 26 + (index % 3) * 12;
  return `M 60 ${y} C 280 ${y - amp}, 380 ${y + amp}, 600 ${y} S 920 ${y - amp}, 1140 ${y}`;
}

const NODE_XS = [60, 380, 600, 920, 1140];

export function Topology() {
  const { progress, state } = useHeroScroll();
  const [selected, setSelected] = useState<string | null>(null);

  const appear = smoothstep(0.7, 0.86, progress);
  const interactive = state === HeroState.Detachment;
  const selectedIndustry = INDUSTRIES.find((i) => i.slug === selected) ?? null;

  return (
    <div
      aria-hidden={appear < 0.05}
      className="absolute inset-x-0 bottom-0 z-20 flex h-full flex-col justify-center"
      style={{ opacity: appear, pointerEvents: interactive ? "auto" : "none" }}
    >
      <div className="relative w-full px-5 md:px-12">
        <div className="mb-6 text-center">
          <p className="font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.3em] text-cyan-300/70">
            System Topology · click a blueprint
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-white/90 md:text-5xl">
            Built for every <span className="text-cyan-300">industry.</span>
          </h2>
        </div>

        <svg
          viewBox={`0 0 ${VB_W} ${ROW_TOP + INDUSTRIES.length * ROW_GAP}`}
          className="w-full"
          role="group"
          aria-label="Industry system topology map"
        >
          {INDUSTRIES.map((industry, i) => {
            const isSel = selected === industry.slug;
            const dim = selected !== null && !isSel;
            const color = STOPS[i % STOPS.length];
            const y = ROW_TOP + i * ROW_GAP;
            return (
              <g
                key={industry.slug}
                style={{ cursor: interactive ? "pointer" : "default" }}
                onClick={() =>
                  interactive &&
                  setSelected((cur) => (cur === industry.slug ? null : industry.slug))
                }
                opacity={dim ? 0.25 : 1}
              >
                <path d={flowPath(i)} stroke="transparent" strokeWidth={28} fill="none" />
                <path
                  d={flowPath(i)}
                  stroke={color}
                  strokeWidth={isSel ? 3 : 1.4}
                  fill="none"
                  style={{
                    filter: isSel ? `drop-shadow(0 0 6px ${color})` : "none",
                    transition: "stroke-width 0.2s",
                  }}
                />
                {NODE_XS.map((x, n) => (
                  <circle key={n} cx={x} cy={y} r={isSel ? 5 : 3} fill={color} />
                ))}
                <text
                  x={70}
                  y={y - 14}
                  className="font-[family-name:var(--font-space-mono)]"
                  fontSize={14}
                  fill={isSel ? color : "#94a3b8"}
                >
                  {industry.name}
                </text>
              </g>
            );
          })}
        </svg>

        {selectedIndustry && (
          <div className="mx-auto mt-5 max-w-md rounded-lg border border-cyan-400/30 bg-[#080c11]/90 p-4 text-center backdrop-blur">
            <p className="font-[family-name:var(--font-space-grotesk)] text-base font-bold text-cyan-200">
              {selectedIndustry.name}
            </p>
            <p className="mt-1 text-sm text-white/60">{selectedIndustry.copy}</p>
          </div>
        )}
      </div>
    </div>
  );
}
