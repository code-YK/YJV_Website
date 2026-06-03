import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LeafHero, CtaBand } from "@/components/site/sections";
import { Section, SectionHead, Card } from "@/components/site/primitives";
import {
  ABOUT_STORY,
  ABOUT_TODAY,
  ABOUT_STATS,
  ABOUT_VALUES,
  ABOUT_TEAM,
} from "@/lib/content/site/about";

export const metadata: Metadata = pageMetadata(
  "About",
  "Empowering businesses through intelligent automation — the team and story behind YJ Ventures.",
  "/about",
);

export default function AboutPage() {
  return (
    <main>
      <LeafHero
        eyebrow="About"
        title="Empowering Businesses Through Intelligent Automation"
        description="We are on a mission to help businesses of all sizes harness the power of AI to work smarter, not harder."
        primary={{ label: "Work with us", href: "/contact" }}
        secondary={{ label: "See our work", href: "/case-studies" }}
      />

      <Section>
        <SectionHead eyebrow="Our story" title="How we got here." intro={ABOUT_STORY} />
        <p className="mt-5 max-w-3xl text-white/60">{ABOUT_TODAY}</p>
      </Section>

      <Section>
        <SectionHead eyebrow="By the numbers" title="Where we stand today." />
        <dl className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-5">
          {ABOUT_STATS.map((s) => (
            <div key={s.label}>
              <dt className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-white">
                {s.value}
              </dt>
              <dd className="mt-1 font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.25em] text-white/50">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Values"
          title="Our Values"
          intro="The principles that guide everything we do."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_VALUES.map((v) => (
            <Card key={v.name} title={v.name}>
              <p className="mt-2 text-sm text-white/60">{v.blurb}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Team"
          title="Meet the Team"
          intro="The people behind YJ Ventures."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_TEAM.map((m) => (
            <Card key={m.name}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-hub-accent/15 font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-hub-accent">
                {m.initials}
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white">
                {m.name}
              </h3>
              <p className="mt-1 font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.2em] text-hub-accent">
                {m.role}
              </p>
              <p className="mt-3 text-sm text-white/60">{m.blurb}</p>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Join Our Team"
        body="We are always looking for talented individuals to join our mission."
        primary={{ label: "View open positions", href: "/contact" }}
        secondary={{ label: "Get in touch", href: "/contact" }}
      />
    </main>
  );
}
