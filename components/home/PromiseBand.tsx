import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/lib/content/types";

interface Promise {
  icon: IconName;
  title: string;
  body: string;
}

const PROMISES: Promise[] = [
  {
    icon: "GraduationCap",
    title: "Senior-only team",
    body: "Every engineer has shipped production AI and SaaS. No juniors learning on your project.",
  },
  {
    icon: "Rocket",
    title: "4 to 6 week pilots",
    body: "From kickoff to a measurable outcome in six weeks or less. No twelve-month black holes.",
  },
  {
    icon: "LineChart",
    title: "Documented outcomes",
    body: "We instrument success metrics before launch. Results are numbers, not vibes.",
  },
];

export function PromiseBand() {
  return (
    <section
      aria-label="What working with us looks like"
      className="relative border-y border-[var(--border-subtle)] bg-[var(--bg-secondary)]/40 py-10 md:py-14"
    >
      <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 md:grid-cols-3 md:gap-6 md:px-8">
        {PROMISES.map((p) => (
          <li
            key={p.title}
            className="relative overflow-hidden rounded-2xl bg-[var(--bg-card)]/60 p-5 backdrop-blur md:p-6"
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-2xl p-px"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.55), rgba(139,92,246,0.35), rgba(255,255,255,0.04))",
                WebkitMask:
                  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
              aria-hidden
            />
            <div className="relative flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(139,92,246,0.18))] text-[var(--accent-blue)]">
                <Icon name={p.icon} className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-display text-base font-semibold text-white md:text-lg">
                  {p.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                  {p.body}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
