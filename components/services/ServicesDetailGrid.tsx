import { Check } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/content/services";

export function ServicesDetailGrid() {
  return (
    <section className="relative isolate py-20 md:py-24">
      <div className="mx-auto max-w-7xl space-y-10 px-6 md:px-8">
        {services.map((service) => (
          <article key={service.slug} id={service.slug}>
            <GlowCard hoverable={false} className="md:p-10">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(139,92,246,0.18))] text-[var(--accent-blue)]">
                    <Icon name={service.icon} className="h-7 w-7" />
                  </div>
                  <h2 className="mt-6 font-display text-3xl font-semibold text-white md:text-4xl">
                    {service.name}
                  </h2>
                  <p className="mt-4 text-[var(--accent-blue)]">{service.tagline}</p>
                  <p className="mt-4 text-[var(--text-muted)]">
                    {service.longDescription}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-8 lg:col-span-7 md:grid-cols-2">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      What you get
                    </p>
                    <ul className="mt-4 space-y-3">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-white/85">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent-blue)]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      Use cases
                    </p>
                    <ul className="mt-4 space-y-3">
                      {service.useCases.map((u) => (
                        <li key={u} className="flex items-start gap-2 text-sm text-white/85">
                          <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent-purple)]" />
                          {u}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </GlowCard>
          </article>
        ))}
      </div>
    </section>
  );
}
