import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function WorkflowDiagram({
  steps,
  className,
}: {
  steps: string[];
  className?: string;
}) {
  return (
    <ol
      aria-label="Workflow"
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/40 p-4 backdrop-blur",
        className,
      )}
    >
      {steps.map((step, i) => (
        <li key={step} className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-1.5 text-xs font-medium text-yj-on-surface">
            {step}
          </span>
          {i < steps.length - 1 && (
            <ArrowRight
              className="h-4 w-4 text-[var(--text-muted)]"
              aria-hidden
            />
          )}
        </li>
      ))}
    </ol>
  );
}
