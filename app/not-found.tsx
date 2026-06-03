import Link from "next/link";
import { ArrowRight } from "lucide-react";

const QUICK_LINKS = [
  { label: "Platform", href: "/platform" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
];

export default function NotFound() {
  return (
    <section
      className="relative isolate flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-hub-paper px-5 pt-32 pb-20 text-hub-ink md:px-12 md:pt-40"
      aria-labelledby="not-found-title"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <p className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.32em] text-hub-ink-muted">
          Error · 404
        </p>
        <h1
          id="not-found-title"
          className="mt-6 font-[family-name:var(--font-space-grotesk)] text-[clamp(64px,12vw,160px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-hub-accent"
        >
          404
        </h1>
        <h2 className="mt-6 max-w-xl font-[family-name:var(--font-space-grotesk)] text-2xl font-medium leading-snug text-hub-ink md:text-3xl">
          This page wandered off the map.
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-hub-ink-muted md:text-base">
          The link may be stale, the page may have moved, or it may never have
          existed. Try one of the routes below, or head back to the homepage.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="hub-accent-btn">
            Back to home
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/contact" className="hub-ghost-btn">
            Book a call
          </Link>
        </div>

        <div className="mt-16 grid w-full grid-cols-2 gap-px overflow-hidden border border-hub-rule bg-hub-rule md:grid-cols-4">
          {QUICK_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group bg-hub-paper p-5 text-left transition-colors hover:bg-hub-paper-alt"
            >
              <p className="hub-eyebrow text-hub-ink-muted transition-colors group-hover:text-hub-accent">
                {l.label}
              </p>
              <p className="mt-2 font-[family-name:var(--font-space-grotesk)] text-sm font-medium text-hub-ink">
                Explore →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
