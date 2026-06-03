import Link from "next/link";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { Icon } from "@/components/ui/Icon";
import type { Service } from "@/lib/content/types";
import { services } from "@/lib/content/services";

interface ServiceDetailProps {
  service: Service;
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <section className="relative isolate pt-32 md:pt-40 pb-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All services
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(139,92,246,0.18))] text-[var(--accent-blue)]">
              <Icon name={service.icon} className="h-8 w-8" />
            </div>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Service · {service.name}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
              {service.tagline}
            </h1>
            <p className="mt-6 text-lg text-[var(--text-muted)]">
              {service.longDescription}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  What you get
                </p>
                <ul className="mt-4 space-y-3">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-white/85"
                    >
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
                    <li
                      key={u}
                      className="flex items-start gap-2 text-sm text-white/85"
                    >
                      <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent-purple)]" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <GlowCard hoverable={false} className="sticky top-28">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Engage
              </p>
              <h2 className="mt-3 font-display text-xl font-semibold text-white">
                Talk to a senior engineer
              </h2>
              <p className="mt-3 text-sm text-[var(--text-muted)]">
                Discovery calls are 30 minutes, free, and end with a written
                scoping note, not a sales pitch.
              </p>
              <Link
                href={`/contact?service=${service.slug}`}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-95"
              >
                Book a discovery call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/hire-developer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[var(--accent-blue)]/60"
              >
                Or hire a developer
              </Link>
            </GlowCard>
          </aside>
        </div>

        <div className="mt-24">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Other services
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 transition-colors hover:border-[var(--accent-blue)]/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-[var(--accent-blue)]">
                    <Icon name={s.icon} className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-medium text-white">{s.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
