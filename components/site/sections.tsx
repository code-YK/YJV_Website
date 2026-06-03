import Link from "next/link";
import { Eyebrow, CtaButtons, Card, type CtaLink } from "@/components/site/primitives";

/** Numbered "how it works" steps. */
export function Steps({
  steps,
}: {
  steps: { title: string; body: string }[];
}) {
  return (
    <ol className="mt-10 grid gap-5 md:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title}>
          <Card className="h-full">
            <span className="font-[family-name:var(--font-space-mono)] text-sm font-bold tracking-[0.2em] text-hub-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white">
              {s.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{s.body}</p>
          </Card>
        </li>
      ))}
    </ol>
  );
}

/** Outcome / metric row. */
export function StatRow({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label}>
          <dt className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-white md:text-5xl">
            {s.value}
          </dt>
          <dd className="mt-2 text-sm text-white/60">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}

/** FAQ list (native <details> so it works without JS). */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
      {items.map((it) => (
        <details key={it.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--font-space-grotesk)] text-lg font-medium text-white marker:hidden">
            {it.q}
            <span
              aria-hidden
              className="text-hub-accent transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl leading-relaxed text-white/60">{it.a}</p>
        </details>
      ))}
    </div>
  );
}

/**
 * Page-level sections: a leaf-page hero and the reusable closing CTA band.
 */

/** Hero for hub/leaf pages: breadcrumb eyebrow, H1, description, CTAs, back link. */
export function LeafHero({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  back,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primary: CtaLink;
  secondary?: CtaLink;
  back?: CtaLink;
}) {
  return (
    <section className="relative px-5 pb-16 pt-32 md:px-12 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-4xl font-[family-name:var(--font-space-grotesk)] text-5xl font-bold leading-[1.04] tracking-tight text-white md:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/65">{description}</p>
        <CtaButtons primary={primary} secondary={secondary} className="mt-8" />
        {back ? (
          <Link
            href={back.href}
            className="mt-8 inline-block font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.25em] text-white/45 transition-colors hover:text-hub-accent"
          >
            ← {back.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

/**
 * Closing call-to-action band. Defaults to the site-wide "Ready to Transform
 * Your Business?" message; override for case studies. NOT rendered on legal
 * pages (audit fix: no sales CTA on legal).
 */
export function CtaBand({
  title = "Ready to Transform Your Business?",
  body = "Join hundreds of companies already using YJ Ventures to automate their workflows and accelerate growth.",
  primary = { label: "Book a Free Demo", href: "/contact" },
  secondary = { label: "Talk to Sales", href: "/contact" },
}: {
  title?: string;
  body?: string;
  primary?: CtaLink;
  secondary?: CtaLink;
}) {
  return (
    <section className="border-t border-white/[0.06] px-5 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-white md:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-white/60">{body}</p>
        <CtaButtons
          primary={primary}
          secondary={secondary}
          className="mt-8 justify-center"
        />
      </div>
    </section>
  );
}
