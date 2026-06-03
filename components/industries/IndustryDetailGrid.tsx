import { Check } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { Icon } from "@/components/ui/Icon";
import { industries } from "@/lib/content/industries";

export function IndustryDetailGrid() {
  return (
    <section className="relative isolate py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-2 md:px-8">
        {industries.map((industry) => (
          <article key={industry.slug} id={industry.slug}>
            <GlowCard className="h-full">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(139,92,246,0.18))] text-[var(--accent-blue)]">
                <Icon name={industry.icon} className="h-7 w-7" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-semibold text-white">
                {industry.name}
              </h2>
              <p className="mt-3 text-sm text-[var(--text-muted)]">
                {industry.description}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Pain points
                  </p>
                  <ul className="mt-3 space-y-2">
                    {industry.painPoints.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2 text-sm text-white/85"
                      >
                        <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent-purple)]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Outcomes
                  </p>
                  <ul className="mt-3 space-y-2">
                    {industry.outcomes.map((o) => (
                      <li
                        key={o}
                        className="flex items-start gap-2 text-sm text-white/85"
                      >
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent-blue)]" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlowCard>
          </article>
        ))}
      </div>
    </section>
  );
}
