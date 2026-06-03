import { Check } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { Icon } from "@/components/ui/Icon";
import { WorkflowDiagram } from "./WorkflowDiagram";
import { solutions } from "@/lib/content/solutions";
import { cn } from "@/lib/utils";

export function SolutionsDetail() {
  return (
    <section className="relative isolate py-20 md:py-24">
      <div className="mx-auto max-w-7xl space-y-20 px-6 md:space-y-28 md:px-8">
        {solutions.map((solution, i) => {
          const reverse = i % 2 === 1;
          return (
            <article
              key={solution.slug}
              id={solution.slug}
              className={cn(
                "grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16",
              )}
            >
              <div className={cn("lg:col-span-5", reverse ? "lg:order-2" : "lg:order-1")}>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(139,92,246,0.18))] text-[var(--accent-blue)]">
                  <Icon name={solution.icon} className="h-7 w-7" />
                </div>
                <h2 className="mt-6 font-display text-3xl font-semibold text-yj-on-surface md:text-4xl">
                  {solution.name}
                </h2>
                <p className="mt-4 text-[var(--text-muted)]">{solution.description}</p>

                <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Outcomes
                </p>
                <ul className="mt-3 space-y-2">
                  {solution.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-sm text-yj-on-surface/85">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent-blue)]" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={cn("lg:col-span-7", reverse ? "lg:order-1" : "lg:order-2")}>
                <GlowCard hoverable={false} className="md:p-8">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Workflow
                  </p>
                  <div className="mt-4">
                    <WorkflowDiagram steps={solution.workflow} />
                  </div>

                  <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Features
                  </p>
                  <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {solution.features.map((f) => (
                      <li
                        key={f}
                        className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 px-4 py-3 text-sm text-yj-on-surface/85"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
