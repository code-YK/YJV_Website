"use client";

import { useHeroScroll } from "@/lib/hero/scrollStore";
import { clamp01, smoothstep } from "@/lib/hero/ease";
import { Icon } from "@/components/ui/Icon";
import {
  bentoSectionLabel,
  bentoCapabilities,
  bentoMetrics,
} from "@/lib/hero/heroBento";

/**
 * Integration Ledger — a sharp, micro-bordered bento that fills the right half
 * during the Ledger state: a section label, 6 capability cards (icon + title +
 * subtitle) and a 4-up metric strip, per the creative brief. Ramps in across
 * the Ledger window (35–70%) and dissolves as Detachment (70%) begins.
 */
export function LedgerGrid() {
  const { progress } = useHeroScroll();

  // Ledger spans 35–70%. Appear a touch early, dissolve as Detachment starts.
  const ledgerLocal = clamp01((progress - 0.35) / (0.7 - 0.35));
  const disappear = smoothstep(0.66, 0.74, progress);
  const frameOpacity = smoothstep(0.33, 0.44, progress) * (1 - disappear);
  const groupVisible = progress >= 0.32 && progress < 0.76;

  return (
    <div
      aria-hidden={!groupVisible}
      className="pointer-events-none absolute inset-y-0 right-0 z-30 flex w-full items-center justify-center px-5 md:w-1/2 md:px-12"
      style={{ opacity: frameOpacity }}
    >
      <div className="w-full max-w-xl">
        <p className="mb-4 font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white/90 md:text-xl">
          {bentoSectionLabel}
        </p>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-cyan-400/20 bg-cyan-400/10 sm:grid-cols-3">
          {bentoCapabilities.map((cell, i) => {
            const reveal = clamp01((ledgerLocal - i * 0.04) / 0.22);
            return (
              <div
                key={cell.title}
                className="flex flex-col gap-2 bg-[#070d13]/95 p-4"
                style={{
                  opacity: reveal,
                  transform: `translateY(${(1 - reveal) * 12}px)`,
                }}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
                  <Icon name={cell.icon} className="h-4 w-4" />
                </span>
                <p className="font-[family-name:var(--font-space-grotesk)] text-[13px] font-bold leading-tight text-white/90">
                  {cell.title}
                </p>
                <p className="text-[11px] leading-snug text-white/50">
                  {cell.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-3 grid grid-cols-4 gap-px overflow-hidden rounded-xl border border-cyan-400/20 bg-cyan-400/10">
          {bentoMetrics.map((m, i) => {
            const reveal = clamp01(
              (ledgerLocal - (bentoCapabilities.length + i) * 0.04) / 0.22,
            );
            return (
              <div
                key={m.label}
                className="bg-[#070d13]/95 px-2 py-4 text-center"
                style={{ opacity: reveal, transform: `translateY(${(1 - reveal) * 12}px)` }}
              >
                <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-cyan-200 md:text-xl">
                  {m.value}
                </p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-white/50">
                  {m.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
