"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, RotateCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function GlobalError({ error, unstable_retry }: ErrorProps) {
  useEffect(() => {
    console.error("[app] route error:", error);
  }, [error]);

  return (
    <section
      className="relative isolate flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-hub-paper px-5 pt-32 pb-20 text-hub-ink md:px-12 md:pt-40"
      aria-labelledby="error-title"
      role="alert"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <p className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.32em] text-hub-ink-muted">
          Error · Something went wrong
        </p>
        <h1
          id="error-title"
          className="mt-6 font-[family-name:var(--font-space-grotesk)] text-[clamp(48px,9vw,120px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-hub-accent"
        >
          500
        </h1>
        <h2 className="mt-6 max-w-xl font-[family-name:var(--font-space-grotesk)] text-2xl font-medium leading-snug text-hub-ink md:text-3xl">
          We hit a snag rendering this page.
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-hub-ink-muted md:text-base">
          The error has been logged. Try again, if it keeps happening, head to
          the contact page and tell us the URL you were on.
        </p>

        {error.digest && (
          <p className="mt-6 font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.28em] text-hub-ink-muted">
            Reference · {error.digest}
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="hub-accent-btn"
          >
            <RotateCw className="h-3.5 w-3.5" aria-hidden />
            Try again
          </button>
          <Link href="/" className="hub-ghost-btn">
            Back to home
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/contact" className="hub-ghost-btn">
            Report it
          </Link>
        </div>
      </div>
    </section>
  );
}
