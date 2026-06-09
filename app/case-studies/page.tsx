import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LeafHero, CtaBand } from "@/components/site/sections";
import { Section, SectionHead, Prose, Card } from "@/components/site/primitives";
import { CASE_STUDIES } from "@/lib/content/site/case-studies";

interface RepresentativeEngagement {
  name: string;
  challenge: string;
  solution: string;
  outcome: string;
}

const REPRESENTATIVE_ENGAGEMENTS: RepresentativeEngagement[] = [
  {
    name: "Lead Automation (B2B services)",
    challenge:
      "Strong inbound interest sat in a shared inbox with response times running into hours.",
    solution:
      "An AI lead-capture and qualification layer across web forms and messaging, scoring leads and booking calls.",
    outcome:
      "First response from hours to under a minute, roughly 2x sales-qualified leads (representative).",
  },
  {
    name: "Workflow Automation (operations)",
    challenge:
      "Client onboarding ran through spreadsheets, email, and manual handoffs, taking weeks.",
    solution:
      "A custom workflow automating document collection, approvals, and handoffs, with one real-time status dashboard.",
    outcome:
      "Onboarding time reduced by around 50%, handoff errors largely eliminated (representative).",
  },
  {
    name: "AI Implementation (support)",
    challenge:
      "A high volume of repetitive customer and internal questions, with knowledge scattered across documents.",
    solution:
      "An AI assistant trained on the company's own documentation, answering across channels and escalating anything out of scope.",
    outcome:
      "Around 60% of routine questions resolved without staff involvement (representative).",
  },
];

const CASE_INTRO = [
  "Numbers are easy to claim and hard to earn. The stories below are representative of the work we do: the kinds of problems teams bring us, what we build, and the outcomes that follow. Each one started the same way: a team buried in repetitive, time-sensitive communication that was quietly costing them leads, money, or both, with no realistic way to fix it just by hiring.",
  "What they have in common is the approach. We didn't replace their people with a bot and walk away; we automated the high-volume, repetitive work, connected it to the systems they already ran on, and kept a human in the loop for everything that needed judgment. The result in every case was the same shape: faster responses, lower cost, and a team freed to spend its time where it actually mattered.",
];

export const metadata: Metadata = pageMetadata(
  "Case Studies: AI & Automation Success Stories",
  "See how YJ Ventures cut no-shows, tripled qualified leads, and saved clients thousands monthly with AI chatbots, automation, and custom software.",
  "/case-studies",
);

export default function CaseStudiesPage() {
  return (
    <main>
      <LeafHero
        eyebrow="Case Studies"
        title="Real deployments. Real numbers."
        description="Three teams, three industries, one pattern: inquiries answered faster, work that used to need a person handled automatically, and a metric that moved enough to matter."
        primary={{ label: "Book a discovery call", href: "/contact" }}
      />

      <Section>
        <SectionHead eyebrow="How we work" title="Real problems, measured outcomes." />
        <Prose paragraphs={CASE_INTRO} />
      </Section>

      {CASE_STUDIES.map((cs) => (
        <Section key={cs.name}>
          <p className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.25em] text-hub-accent">
            Case Study {cs.num} · {cs.sector}
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

      <Section>
        <SectionHead
          eyebrow="Representative engagements"
          title="More of what we deliver."
          intro="These are illustrative scenarios with representative figures, not specific named clients. They show the kinds of problems we take on and the shape of the results that follow."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {REPRESENTATIVE_ENGAGEMENTS.map((e) => (
            <Card key={e.name} title={e.name}>
              <p className="mt-3 font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.2em] text-hub-accent">
                Illustrative
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.2em] text-white/45">
                    Challenge
                  </h4>
                  <p className="mt-2 text-sm text-white/70">{e.challenge}</p>
                </div>
                <div>
                  <h4 className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.2em] text-white/45">
                    Solution
                  </h4>
                  <p className="mt-2 text-sm text-white/70">{e.solution}</p>
                </div>
                <div>
                  <h4 className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.2em] text-white/45">
                    Outcome
                  </h4>
                  <p className="mt-2 text-sm text-white/70">{e.outcome}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Want the full story behind these numbers?"
        body="Tell us the process that's costing you the most, and we'll show you what automating it would actually take. One business day, no sales script."
        primary={{ label: "Talk to an engineer", href: "/contact" }}
        secondary={{ label: "See what we'd automate first", href: "/contact" }}
      />
    </main>
  );
}
