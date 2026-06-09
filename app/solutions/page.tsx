import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { LeafHero, CtaBand } from "@/components/site/sections";
import { Section, SectionHead, Card } from "@/components/site/primitives";
import { SOLUTIONS } from "@/lib/content/site/solutions";

export const metadata: Metadata = pageMetadata(
  "AI Automation Solutions: Lead, Chat & Workflow Automation",
  "Four AI automation solutions that capture leads, resolve support, run operations, and apply custom AI. Built around your business and live in weeks.",
  "/solutions",
);

export default function SolutionsPage() {
  return (
    <main>
      <LeafHero
        eyebrow="Solutions"
        title="Automation built around your problem, not a template."
        description="Most automation tools force your business to bend around their rules. We do the opposite. Every solution below is shaped to the workflow you actually run."
        primary={{ label: "Book a Demo", href: "/contact" }}
        secondary={{ label: "Talk to an engineer", href: "/contact" }}
      />

      <Section>
        <SectionHead
          eyebrow="Solutions"
          title="Four ways we put automation to work."
          intro="Each one is shaped to the workflow you actually run, not a packaged template."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {SOLUTIONS.map((s) => (
            <Link key={s.slug} href={`/solutions/${s.slug}`} className="block">
              <Card title={s.name} className="h-full">
                <p className="mt-2 text-sm text-white/60">{s.description}</p>
                <span className="mt-4 inline-block text-sm font-medium text-hub-accent">
                  Learn more →
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
