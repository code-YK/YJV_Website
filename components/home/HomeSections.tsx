import Link from "next/link";
import { Section, SectionHead, Card } from "@/components/site/primitives";
import { StatRow } from "@/components/site/sections";
import { SOLUTIONS } from "@/lib/content/site/solutions";
import { CASE_STUDIES } from "@/lib/content/site/case-studies";

/** Stats shown in the trust band. StatRow renders three across cleanly. */
const TRUST_STATS = [
  { value: "500+", label: "Clients served" },
  { value: "50M+", label: "Messages processed" },
  { value: "99.9%", label: "Uptime" },
  { value: "9", label: "Industries served" },
];

const WHY_US = [
  {
    title: "The founders write the code.",
    body: "Your system is built by the people who run the company, not handed down a chain of junior contractors.",
  },
  {
    title: "A person stays in the loop where it counts.",
    body: "We place human checkpoints wherever a mistake would cost money, a customer, or a compliance breach, so speed never costs you judgment.",
  },
  {
    title: "We measure from the first sprint.",
    body: "You see the impact on real business metrics from week one. If a workflow is not moving the number it was built to move, we adjust early.",
  },
  {
    title: "Most rollouts go live in 1 to 2 weeks.",
    body: "We ship working systems into production fast, then refine against real usage, so you see returns sooner.",
  },
];

/** Industries we serve. The first four link to their leaf pages. */
const INDUSTRIES: { name: string; slug?: string }[] = [
  { name: "Real Estate", slug: "real-estate" },
  { name: "Healthcare", slug: "healthcare" },
  { name: "Education", slug: "education" },
  { name: "E-Commerce", slug: "ecommerce" },
  { name: "Finance" },
  { name: "Manufacturing" },
  { name: "Logistics" },
  { name: "Professional Services" },
  { name: "SaaS" },
];

export function HomeSections() {
  return (
    <>
      {/* 1. Trust stat band */}
      <Section>
        <p className="max-w-3xl text-base text-white/65 md:text-lg">
          Since 2020, we have built automation that businesses trust to run
          without supervision. The numbers below come from production systems,
          not pilots.
        </p>
        <StatRow stats={TRUST_STATS} />
      </Section>

      {/* 2. Why choose us */}
      <Section>
        <SectionHead
          eyebrow="Why us"
          title="Why teams choose YJ Ventures."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {WHY_US.map((w) => (
            <Card key={w.title} title={w.title} className="h-full">
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {w.body}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 3. Core solutions */}
      <Section>
        <SectionHead
          eyebrow="What we build"
          title="Four ways we put automation to work."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {SOLUTIONS.map((s) => (
            <Link key={s.slug} href={`/solutions/${s.slug}`} className="block">
              <Card title={s.name} className="h-full">
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {s.description}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-hub-accent">
                  Learn more →
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* 4. Industries */}
      <Section>
        <SectionHead
          eyebrow="Industries"
          title="Built for the industries we know."
          intro="We have shipped production systems across nine industries, learning the rules, risks, and customer expectations that make each one different."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {INDUSTRIES.map((ind) =>
            ind.slug ? (
              <Link
                key={ind.name}
                href={`/industries/${ind.slug}`}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-medium text-white/85 transition-[transform,box-shadow,border-color,color] duration-300 hover:-translate-y-0.5 hover:border-hub-accent/50 hover:text-white hover:shadow-[0_10px_36px_-12px_rgba(34,211,238,0.35)]"
              >
                {ind.name}
              </Link>
            ) : (
              <div
                key={ind.name}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-sm font-medium text-white/70 transition-[box-shadow,border-color] duration-300 hover:border-hub-accent/40 hover:shadow-[0_10px_36px_-12px_rgba(34,211,238,0.3)]"
              >
                {ind.name}
              </div>
            ),
          )}
        </div>
      </Section>

      {/* 5. Results */}
      <Section>
        <SectionHead
          eyebrow="Proof"
          title="Real outcomes from real deployments."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {CASE_STUDIES.map((c) => (
            <Card key={c.name} title={c.name} className="h-full">
              <p className="mt-1 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.2em] text-white/45">
                {c.sector}
              </p>
              <div className="mt-5">
                <span className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white">
                  {c.metric.value}
                </span>
                <span className="ml-2 text-sm text-white/60">
                  {c.metric.label}
                </span>
              </div>
              <ul className="mt-5 space-y-2">
                {c.results.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-3 text-sm text-white/70"
                  >
                    <span aria-hidden className="mt-0.5 text-hub-accent">
                      ✓
                    </span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <Link
          href="/case-studies"
          className="mt-10 inline-block text-sm font-medium text-hub-accent transition-colors hover:text-white"
        >
          See the case studies →
        </Link>
      </Section>
    </>
  );
}
