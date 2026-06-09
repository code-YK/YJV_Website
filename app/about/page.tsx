import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LeafHero, CtaBand } from "@/components/site/sections";
import { Section, SectionHead, Card } from "@/components/site/primitives";
import {
  ABOUT_STORY,
  ABOUT_TODAY,
  ABOUT_MISSION,
  ABOUT_VISION,
  ABOUT_STATS,
  ABOUT_VALUES,
  ABOUT_TEAM,
} from "@/lib/content/site/about";

export const metadata: Metadata = pageMetadata(
  "About: The Engineers Behind Your Automation",
  "Founded in 2020, YJ Ventures grew from fixing slow WhatsApp replies to serving 500+ clients across five continents. Meet the founders who write the code.",
  "/about",
);

export default function AboutPage() {
  return (
    <main>
      <LeafHero
        eyebrow="About"
        title="We build automation you can trust to run unattended."
        description="Most AI automation breaks the moment it meets real volume. We take the opposite approach: unify your context, deploy agents that reason over it, keep humans in the loop where the stakes are high, and evaluate everything from sprint one."
        primary={{ label: "Work with us", href: "/contact" }}
        secondary={{ label: "See our work", href: "/case-studies" }}
      />

      <Section>
        <SectionHead eyebrow="Our story" title="How we got here." intro={ABOUT_STORY} />
        <p className="mt-5 max-w-3xl text-white/60">{ABOUT_TODAY}</p>
      </Section>

      <Section>
        <SectionHead eyebrow="Why we exist" title="Mission and vision." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Card title="Mission">
            <p className="mt-2 text-white/65">{ABOUT_MISSION}</p>
          </Card>
          <Card title="Vision">
            <p className="mt-2 text-white/65">{ABOUT_VISION}</p>
          </Card>
        </div>
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
          title="What we actually hold to."
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
        title="Let's build something that lasts."
        body="Tell us the process that's slowing your team down, and we'll show you what automating it would actually take. One business day, no sales script."
        primary={{ label: "See what we'd automate first", href: "/contact" }}
        secondary={{ label: "Talk to an engineer", href: "/contact" }}
      />
    </main>
  );
}
