import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { LeafHero, CtaBand, Steps, StatRow, Faq } from "@/components/site/sections";
import { Section, SectionHead, CheckList, Prose } from "@/components/site/primitives";
import { SOLUTIONS, getSolution } from "@/lib/content/site/solutions";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return pageMetadata(s.seoTitle ?? s.name, s.seoDescription ?? s.description, `/solutions/${s.slug}`);
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();

  return (
    <main>
      <LeafHero
        eyebrow={`Solutions / ${s.name}`}
        title={s.title}
        description={s.description}
        primary={{ label: "Book a Demo", href: "/contact" }}
        secondary={{ label: "Explore the platform", href: "/platform" }}
      />

      <Section>
        <SectionHead
          eyebrow={`${s.num} · Overview`}
          title={
            <>
              What {s.name.toLowerCase()}{" "}
              <span className="text-hub-accent">unlocks.</span>
            </>
          }
          intro={s.overview}
        />
        <Prose paragraphs={s.longBody} />
        <StatRow stats={s.outcomes} />
      </Section>

      <Section>
        <SectionHead eyebrow="How it works" title="From inbox to outcome." />
        <Steps steps={s.howItWorks} />
      </Section>

      <Section>
        <SectionHead eyebrow="What's included" title="Capabilities" />
        <div className="mt-10">
          <CheckList items={s.capabilities} />
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="FAQ" title="Common questions" />
        <Faq items={s.faqs} />
      </Section>

      <CtaBand />
    </main>
  );
}
