import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STEPS = [
  {
    n: "01",
    title: "Tell us your needs",
    body: "Share the role, scope, and timeline. We'll come back with clarifying questions same-day.",
  },
  {
    n: "02",
    title: "We match developers",
    body: "Within 3–5 days, we present 1–2 candidates we'd personally vouch for.",
  },
  {
    n: "03",
    title: "Interview",
    body: "Run your own technical interview. We'll send replacements free if they're not a fit.",
  },
  {
    n: "04",
    title: "Onboard",
    body: "Engineer joins your standup, repo, and tools. First PR usually lands in week one.",
  },
];

export function HiringTimeline() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="How hiring works"
          title="Four steps, typically under two weeks"
          subtitle="We don't run an opaque process. You see exactly where things stand at every step."
        />

        <ol className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <li key={step.n}>
              <GlowCard className="h-full">
                <p className="font-display text-4xl font-bold text-[var(--accent-blue)]">
                  {step.n}
                </p>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  {step.body}
                </p>
              </GlowCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
