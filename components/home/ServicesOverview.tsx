import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/content/services";

export function ServicesOverview() {
  return (
    <section className="relative isolate py-24 md:py-32" id="services">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Services"
          title="What we build"
          subtitle="Six core practices that compound: AI automation, custom SaaS, agents, data, mobile, and the infra holding it all up."
        />

        <ul className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services#${service.slug}`}
                className="block h-full focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] focus:ring-offset-2 focus:ring-offset-black rounded-2xl"
              >
                <GlowCard className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(139,92,246,0.18))] text-[var(--accent-blue)]">
                      <Icon name={service.icon} className="h-6 w-6" />
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 text-[var(--text-muted)] transition-colors group-hover:text-white"
                      aria-hidden
                    />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-white">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">
                    {service.tagline}
                  </p>
                </GlowCard>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
