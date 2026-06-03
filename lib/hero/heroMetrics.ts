/**
 * Hero-local marketing metrics for the Integration Ledger bento.
 *
 * NOTE: these figures (50M+ messages, 99.9% uptime) are NEW marketing copy
 * introduced for the engine-room hero. They are intentionally kept here and
 * NOT merged into `lib/content/stats.ts` (which is shared and source-of-truth
 * for /summary-style numbers). Treat as placeholder until signed off before
 * launch.
 */
export interface HeroMetric {
  value: string;
  label: string;
}

export const heroMetrics: HeroMetric[] = [
  { value: "50M+", label: "Messages orchestrated" },
  { value: "99.9%", label: "Pipeline uptime" },
];
