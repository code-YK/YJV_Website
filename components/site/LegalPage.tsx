import type { LegalDoc } from "@/lib/content/site/legal";
import { Eyebrow } from "@/components/site/primitives";

/**
 * Renders a legal document (Privacy / Terms / Data Deletion). Intentionally
 * carries NO sales CTA band (audit fix: legal pages stay neutral).
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <main>
      <section className="px-5 pb-12 pt-32 md:px-12 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-5 font-[family-name:var(--font-space-grotesk)] text-4xl font-bold tracking-tight text-white md:text-6xl">
            {doc.title}
          </h1>
          <p className="mt-5 text-white/60">{doc.intro}</p>
          <p className="mt-4 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.25em] text-white/40">
            Last updated: {doc.lastUpdated}
          </p>
        </div>
      </section>

      <section className="px-5 pb-28 md:px-12">
        <div className="mx-auto max-w-3xl space-y-10">
          {doc.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-white">
                {s.heading}
              </h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-3 leading-relaxed text-white/65">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
