import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { roles } from "@/lib/content/roles";

export function RolesGrid() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Roles we staff"
          title="Six senior specialisations, no juniors."
          subtitle="Every engineer has shipped production AI or SaaS work before joining our roster. The skills below are the ones clients actually hire them for."
        />

        <ul className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {roles.map((role) => (
            <li key={role.slug} id={role.slug} className="scroll-mt-28">
              <GlowCard className="h-full">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(139,92,246,0.18))] text-[var(--accent-blue)]">
                    <Icon name={role.icon} className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white">
                      {role.name}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      {role.experience}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm text-[var(--text-muted)]">
                  {role.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {role.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 px-3 py-1 text-xs text-white/85"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
