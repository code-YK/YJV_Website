import { Check } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { engagementModels } from "@/lib/content/engagement-models";
import { cn } from "@/lib/utils";

export function EngagementModels() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Engagement models"
          title="Flexible enough to match your scope"
          subtitle="Pick the model that fits today; switch later if it stops fitting."
        />

        <ul className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {engagementModels.map((model) => (
            <li key={model.name} className="relative">
              {model.featured && (
                <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white">
                  Most popular
                </span>
              )}
              <GlowCard
                hoverable={false}
                className={cn(
                  "h-full",
                  model.featured
                    ? "border-[var(--accent-blue)] shadow-[0_0_32px_rgba(59,130,246,0.22)]"
                    : "",
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(139,92,246,0.18))] text-[var(--accent-blue)]">
                  <Icon name={model.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                  {model.name}
                </h3>
                <p className="text-sm text-[var(--accent-blue)]">
                  {model.tagline}
                </p>
                <p className="mt-4 text-sm text-[var(--text-muted)]">
                  {model.description}
                </p>

                <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Best for
                </p>
                <ul className="mt-3 space-y-2">
                  {model.bestFor.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-white/85"
                    >
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent-blue)]" />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-[var(--border-subtle)] pt-4 text-xs font-mono uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Commitment ·{" "}
                  <span className="text-white">{model.commitment}</span>
                </p>
              </GlowCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
