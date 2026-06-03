"use client";

import { Icon } from "@/components/ui/Icon";
import { techStack } from "@/lib/content/tech-stack";
import { cn } from "@/lib/utils";

interface TechStackProps {
  variant?: "marquee" | "grid";
  className?: string;
}

/**
 * TechStack — renders the tech stack as either an infinite marquee (home TrustLogos)
 * or a static grid (services page tech section).
 *
 * NOTE: Tech "logos" are rendered as lucide-react icons + text labels rather than
 * brand SVGs. Replace with real brand assets when available.
 */
export function TechStack({ variant = "marquee", className }: TechStackProps) {
  if (variant === "grid") {
    return (
      <ul
        className={cn(
          "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
          className,
        )}
      >
        {techStack.map((item) => (
          <li
            key={item.name}
            className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 px-4 py-3 text-sm text-yj-on-surface backdrop-blur"
          >
            <Icon name={item.icon} className="h-4 w-4 text-[var(--accent-blue)]" />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    );
  }

  // marquee variant
  const items = [...techStack, ...techStack];
  return (
    <div
      className={cn(
        "relative h-16 w-full overflow-hidden",
        // Soft-fade edges so loop seam is invisible
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div
        className="absolute inset-y-0 left-0 flex items-center gap-12 whitespace-nowrap [animation:marquee_30s_linear_infinite] hover:[animation-play-state:paused]"
        aria-hidden
      >
        {items.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex flex-shrink-0 items-center gap-3 text-sm text-[var(--text-muted)]"
          >
            <Icon name={item.icon} className="h-5 w-5 text-[var(--accent-blue)]" />
            <span className="font-medium tracking-wide">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
