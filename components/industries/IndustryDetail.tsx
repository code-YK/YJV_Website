import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, AlertTriangle, Check } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { Icon } from "@/components/ui/Icon";
import type { Industry } from "@/lib/content/types";
import { industries } from "@/lib/content/industries";
import { services } from "@/lib/content/services";

interface IndustryDetailProps {
  industry: Industry;
}

export function IndustryDetail({ industry }: IndustryDetailProps) {
  const otherIndustries = industries.filter((i) => i.slug !== industry.slug);
  const featuredServices = services.slice(0, 4);

  return (
    <>
      <section className="relative isolate w-full overflow-hidden h-[440px] md:h-[520px]">
        <Image
          src={industry.images.hero}
          alt={industry.images.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-yj-surface/30 via-yj-surface/55 to-yj-surface" />
        <div className="absolute inset-0 bg-gradient-to-r from-yj-surface/85 via-yj-surface/35 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-yj-primary-container/10 via-transparent to-yj-secondary-container/20 mix-blend-overlay" />

        <div className="relative mx-auto h-full max-w-7xl px-6 md:px-8 flex flex-col justify-end pb-12 pt-32">
          <Link
            href="/industries"
            className="inline-flex w-fit items-center gap-2 text-sm text-[var(--text-muted)] hover:text-yj-on-surface transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            All industries
          </Link>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(0,240,255,0.22),rgba(107,19,175,0.28))] text-yj-primary-container ring-1 ring-inset ring-white/15 backdrop-blur-sm">
            <Icon name={industry.icon} className="h-8 w-8" />
          </div>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-yj-on-surface-variant">
            Industry · {industry.name}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-yj-on-surface md:text-6xl max-w-3xl">
            AI for {industry.name.toLowerCase()} teams.
          </h1>
        </div>
      </section>

      <section className="relative isolate py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-lg text-[var(--text-muted)]">
                {industry.description}
              </p>

              <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-[var(--accent-purple)]" />
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      Pain points we hear
                    </p>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {industry.painPoints.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2 text-sm text-yj-on-surface/85"
                      >
                        <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent-purple)]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[var(--accent-blue)]" />
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      Outcomes we ship
                    </p>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {industry.outcomes.map((o) => (
                      <li
                        key={o}
                        className="flex items-start gap-2 text-sm text-yj-on-surface/85"
                      >
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent-blue)]" />
                        {o}
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
                <h2 className="mt-3 font-display text-xl font-semibold text-yj-on-surface">
                  Scope a {industry.name.toLowerCase()} project
                </h2>
                <p className="mt-3 text-sm text-[var(--text-muted)]">
                  We bring senior engineers who&apos;ve shipped in your industry.
                  30-minute discovery call, written scope, fixed price.
                </p>
                <Link
                  href={`/contact?industry=${industry.slug}`}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-yj-primary-container to-yj-secondary-container px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-95"
                >
                  Book a discovery call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/solutions"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-yj-on-surface transition-colors hover:border-yj-primary-container/60"
                >
                  See productized solutions
                </Link>
              </GlowCard>
            </aside>
          </div>

          <div className="relative my-20 h-[260px] md:h-[340px] overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={industry.images.secondary}
              alt={industry.images.alt}
              fill
              sizes="(max-width:1280px) 100vw, 1280px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-yj-surface/90 via-yj-surface/40 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-yj-primary-container/15 via-transparent to-yj-secondary-container/20 mix-blend-overlay" />
            <div className="relative h-full flex items-end p-8 md:p-12">
              <div className="max-w-xl">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-yj-primary-container mb-3">
                  Outcome
                </p>
                <p className="font-display text-2xl md:text-3xl text-yj-on-surface leading-snug">
                  {industry.outcomes[0]}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Ways we work with {industry.name.toLowerCase()} teams
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 transition-colors hover:border-yj-primary-container/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-yj-primary-container">
                      <Icon name={s.icon} className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-medium text-yj-on-surface">{s.name}</p>
                  </div>
                  <p className="mt-3 text-xs text-[var(--text-muted)] line-clamp-2">
                    {s.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Other industries
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {otherIndustries.map((i) => (
                <Link
                  key={i.slug}
                  href={`/industries/${i.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-2 text-sm text-yj-on-surface/80 transition-colors hover:border-yj-primary-container/50 hover:text-yj-on-surface"
                >
                  <Icon name={i.icon} className="h-4 w-4 text-yj-primary-container" />
                  {i.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
