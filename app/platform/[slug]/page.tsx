import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { LeafHero, CtaBand, Steps, Faq } from "@/components/site/sections";
import { Section, SectionHead, CheckList, Card, Prose } from "@/components/site/primitives";
import { PLATFORM_LEAVES, getPlatformLeaf } from "@/lib/content/site/platform";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PLATFORM_LEAVES.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const leaf = getPlatformLeaf(slug);
  if (!leaf) return {};
  return pageMetadata(`${leaf.name} — Platform`, leaf.description, `/platform/${leaf.slug}`);
}

export default async function PlatformLeafPage({ params }: PageProps) {
  const { slug } = await params;
  const leaf = getPlatformLeaf(slug);
  if (!leaf) notFound();

  return (
    <main>
      <LeafHero
        eyebrow={`Platform / ${leaf.name}`}
        title={leaf.name}
        description={leaf.description}
        primary={{ label: "Book a Demo", href: "/contact" }}
        secondary={{ label: "All capabilities", href: "/platform" }}
        back={{ label: "Back to platform", href: "/platform" }}
      />

      <Section>
        <SectionHead
          eyebrow={`${leaf.num} — Overview`}
          title={
            <>
              Why {leaf.name.toLowerCase()}
              <span className="text-hub-accent">.</span>
            </>
          }
          intro={leaf.overview}
        />
        <Prose paragraphs={leaf.longBody} />
      </Section>

      <Section>
        <SectionHead eyebrow="Features" title="What you get" />
        <div className="mt-10">
          <CheckList items={leaf.features} />
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="How it works" title="Live in three steps." />
        <Steps steps={leaf.howItWorks} />
      </Section>

      <Section>
        <SectionHead eyebrow="Use cases" title="What teams build with it." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {leaf.useCases.map((u, i) => (
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
        <Faq items={leaf.faqs} />
      </Section>

      <CtaBand />
    </main>
  );
}
