import { Badge } from "@/components/ui/Badge";
import { FloatingElement } from "@/components/parallax/FloatingElement";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <FloatingElement strength={16} className="absolute -top-16 left-[12%] -z-10">
        <div className="h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />
      </FloatingElement>
      <FloatingElement strength={-10} className="absolute top-10 right-[8%] -z-10">
        <div className="h-80 w-80 rounded-full bg-purple-500/10 blur-[140px]" />
      </FloatingElement>

      <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black to-transparent" />

      <div
        className={cn(
          "mx-auto max-w-4xl px-6 md:px-8",
          align === "center" ? "text-center" : "text-left",
        )}
      >
        {eyebrow && (
          <div className={cn(align === "center" ? "flex justify-center" : "")}>
            <Badge>{eyebrow}</Badge>
          </div>
        )}
        <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg text-[var(--text-muted)] md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
