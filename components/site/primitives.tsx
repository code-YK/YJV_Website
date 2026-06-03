import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared building blocks for the rebuilt YJ Ventures site (teal-on-dark).
 * Small, presentational, and dependency-free so every route page composes the
 * same visual system.
 */

/** Small uppercase mono label above a section heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.3em] text-hub-accent">
      {children}
    </p>
  );
}

/** Section wrapper with a top rule, max width, and consistent padding. */
export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`border-t border-white/[0.06] px-5 py-20 md:px-12 md:py-28 ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

/** Eyebrow + heading + optional intro, used at the top of most sections. */
export function SectionHead({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      {intro ? <p className="mt-5 text-base text-white/60 md:text-lg">{intro}</p> : null}
    </div>
  );
}

export interface CtaLink {
  label: string;
  href: string;
}

/** Primary (teal) + optional ghost CTA pair. */
export function CtaButtons({
  primary,
  secondary,
  className = "",
}: {
  primary: CtaLink;
  secondary?: CtaLink;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Link
        href={primary.href}
        className="inline-flex items-center rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#22D3EE] px-6 py-3 text-sm font-bold text-[#06121a] shadow-[0_0_24px_-6px_rgba(34,211,238,0.6)] transition-transform hover:scale-[1.02]"
      >
        {primary.label}
      </Link>
      {secondary ? (
        <Link
          href={secondary.href}
          className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.02] px-6 py-3 text-sm font-bold text-white/90 transition-colors hover:border-hub-accent hover:text-white"
        >
          {secondary.label}
        </Link>
      ) : null}
    </div>
  );
}

/** A bordered card used in capability/feature/value grids. */
export function Card({
  title,
  children,
  className = "",
}: {
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-hub-accent/40 ${className}`}
    >
      {title ? (
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white">
          {title}
        </h3>
      ) : null}
      {children}
    </div>
  );
}

/** Long-form prose: a stack of readable paragraphs. */
export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="mt-8 max-w-3xl space-y-5">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-base leading-relaxed text-white/65 md:text-lg">
          {p}
        </p>
      ))}
    </div>
  );
}

/** Teal check bullet list, used for capabilities / features / benefits. */
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 text-white/75">
          <span aria-hidden className="mt-1 text-hub-accent">
            ✓
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
