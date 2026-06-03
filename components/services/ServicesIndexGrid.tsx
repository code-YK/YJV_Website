import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/content/services";

export function ServicesIndexGrid() {
  return (
    <section className="relative isolate py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-2 md:px-8 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]/60 rounded-2xl"
          >
            <GlowCard className="h-full">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(139,92,246,0.18))] text-[var(--accent-blue)]">
                  <Icon name={service.icon} className="h-6 w-6" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent-blue)]" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">
                {service.name}
              </h3>
              <p className="mt-2 text-sm text-[var(--accent-blue)]">
                {service.tagline}
              </p>
              <p className="mt-3 text-sm text-[var(--text-muted)] line-clamp-3">
                {service.description}
              </p>
            </GlowCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
