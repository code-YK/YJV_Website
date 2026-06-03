import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LeafHero, CtaBand } from "@/components/site/sections";
import { Section, SectionHead, Prose } from "@/components/site/primitives";
import { CASE_STUDIES } from "@/lib/content/site/case-studies";

const CASE_INTRO = [
  "Numbers are easy to claim and hard to earn. The stories below are representative of the work we do — the kinds of problems teams bring us, what we build, and the outcomes that follow. Each one started the same way: a team buried in repetitive, time-sensitive communication that was quietly costing them leads, money, or both, with no realistic way to fix it just by hiring.",
  "What they have in common is the approach. We didn't replace their people with a bot and walk away; we automated the high-volume, repetitive work, connected it to the systems they already ran on, and kept a human in the loop for everything that needed judgment. The result in every case was the same shape: faster responses, lower cost, and a team freed to spend its time where it actually mattered.",
];

export const metadata: Metadata = pageMetadata(
  "Case Studies",
  "See how leading companies transform their operations with YJ Ventures automation solutions.",
  "/case-studies",
);

export default function CaseStudiesPage() {
  return (
    <main>
      <LeafHero
        eyebrow="Case Studies"
        title="Customer Success Stories"
        description="See how leading companies are transforming their operations with YJ Ventures automation solutions."
        primary={{ label: "Book a discovery call", href: "/contact" }}
      />

      <Section>
        <SectionHead eyebrow="How we work" title="Real problems, measured outcomes." />
        <Prose paragraphs={CASE_INTRO} />
      </Section>

      {CASE_STUDIES.map((cs) => (
        <Section key={cs.name}>
          <p className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.25em] text-hub-accent">
            Case Study {cs.num} — {cs.sector}
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-white md:text-4xl">
              {cs.name}
            </h2>
            <p className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-hub-accent md:text-5xl">
              {cs.metric.value}{" "}
              <span className="text-base font-medium text-white/55 md:text-lg">
                {cs.metric.label}
              </span>
            </p>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.2em] text-white/45">
                Challenge
              </h3>
              <p className="mt-3 text-white/70">{cs.challenge}</p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.2em] text-white/45">
                Solution
              </h3>
              <p className="mt-3 text-white/70">{cs.solution}</p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.2em] text-white/45">
                Results
              </h3>
              <ul className="mt-3 space-y-2">
                {cs.results.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-white/80">
                    <span aria-hidden className="mt-1 text-hub-accent">
                      ✓
                    </span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      ))}

      <CtaBand
        title="Ready to Write Your Success Story?"
        body="Join hundreds of companies transforming their operations with YJ Ventures."
        primary={{ label: "Get Started Today", href: "/contact" }}
        secondary={{ label: "Talk to Sales", href: "/contact" }}
      />
    </main>
  );
}
