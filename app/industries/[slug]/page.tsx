import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { LeafHero, CtaBand, Faq } from "@/components/site/sections";
import { Section, SectionHead, CheckList, Card, Prose } from "@/components/site/primitives";
import { INDUSTRIES, getIndustry } from "@/lib/content/site/industries";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return pageMetadata(
    ind.seoTitle ?? ind.name,
    ind.seoDescription ?? ind.description,
    `/industries/${ind.slug}`,
  );
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  return (
    <main>
      <LeafHero
        eyebrow={`Industries / ${ind.name}`}
        title={ind.title}
        description={ind.description}
        primary={{ label: "Book a Demo", href: "/contact" }}
        secondary={{ label: "All industries", href: "/industries" }}
        back={{ label: "Back to industries", href: "/industries" }}
      />

      <Section>
        <SectionHead
          eyebrow={`${ind.num} · Overview`}
          title={
            <>
              Why {ind.name.toLowerCase()} teams{" "}
              <span className="text-hub-accent">choose us.</span>
            </>
          }
          intro={ind.overview}
        />
        <Prose paragraphs={ind.longBody} />
      </Section>

      <Section>
        <SectionHead eyebrow="The problem" title="What's slowing your team down." />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {ind.challenges.map((c, i) => (
            <li key={c}>
              <Card className="h-full">
                <p className="font-[family-name:var(--font-space-mono)] text-[11px] tracking-[0.2em] text-hub-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-white/75">{c}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHead eyebrow="Key benefits" title="What changes after we ship." />
        <div className="mt-10">
          <CheckList items={ind.benefits} />
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Common use cases"
          title={`Where ${ind.name.toLowerCase()} teams put us to work.`}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ind.useCases.map((u, i) => (
            <Card key={u}>
              <p className="font-[family-name:var(--font-space-mono)] text-[11px] tracking-[0.2em] text-hub-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-white/80">{u}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="FAQ" title="Common questions" />
        <Faq items={ind.faqs} />
      </Section>

      <CtaBand />
    </main>
  );
}
