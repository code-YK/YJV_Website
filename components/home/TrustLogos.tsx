import { TechStack } from "@/components/shared/TechStack";

export function TrustLogos() {
  return (
    <section
      aria-label="Tech stack"
      className="border-y border-[var(--border-subtle)] bg-[var(--bg-secondary)]/40 py-10"
    >
      <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
        Built with the tools your team already trusts
      </p>
      <TechStack variant="marquee" />
    </section>
  );
}
