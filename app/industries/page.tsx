import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { LeafHero, CtaBand } from "@/components/site/sections";
import { Section, SectionHead, Card, Prose } from "@/components/site/primitives";
import { INDUSTRIES } from "@/lib/content/site/industries";

const INDUSTRIES_INTRO = [
  "Automation isn't one-size-fits-all. A property agency closing viewings, a clinic cutting no-shows, an online store surviving a holiday rush, and a college guiding applicants through enrollment all share the same underlying need — fast, accurate, around-the-clock communication — but the questions, the channels, the compliance rules, and the very definition of success are different in each. Generic chatbots ignore that, which is why they so often underwhelm.",
  "We build for the specifics of your sector. That means an assistant grounded in the right knowledge, connected to the systems your industry actually runs on, and measured against the outcomes that matter to you — whether that's lead conversion, no-show rate, response time, or completed enrollments. Below you'll find how that plays out in real estate, healthcare, e-commerce, and education, each with the use cases and results it cares about. If your industry isn't listed, the same approach still applies: the patterns transfer, and we tailor the details to your workflow.",
  "Every engagement also accounts for the rules your industry plays by — HIPAA in healthcare, consent and data handling in marketing-heavy sectors, and the channel policies of WhatsApp and other platforms. We'd rather move deliberately and keep you compliant than ship something fast that creates risk down the line.",
];

export const metadata: Metadata = pageMetadata(
  "Industries",
  "Tailored automation solutions that address the unique challenges and opportunities in your sector.",
  "/industries",
);

export default function IndustriesPage() {
  return (
    <main>
      <LeafHero
        eyebrow="Industries"
        title="Automation for Every Industry"
        description="Tailored solutions that address the unique challenges and opportunities in your sector."
        primary={{ label: "Book a discovery call", href: "/contact" }}
      />

      <Section>
        <SectionHead eyebrow="Overview" title="Built for how your sector works." />
        <Prose paragraphs={INDUSTRIES_INTRO} />
      </Section>

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {INDUSTRIES.map((ind) => (
            <Link key={ind.slug} href={`/industries/${ind.slug}`} className="block">
              <Card className="h-full">
                <p className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.25em] text-hub-accent">
                  {ind.num} — Industry
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-white">
                  {ind.name}
                </h3>
                <p className="mt-3 text-sm text-white/60">{ind.description}</p>
                <span className="mt-4 inline-block text-sm font-medium text-hub-accent">
                  Explore {ind.name} →
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
