import Link from "next/link";
import { LinkedinIcon, TwitterIcon, GithubIcon } from "@/components/ui/SocialIcons";
import { footerConfig } from "@/lib/content/footer";

const socialIconMap = {
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  github: GithubIcon,
} as const;

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-tight text-white"
            >
              YJ <span className="text-[var(--accent-blue)]">Ventures</span>
            </Link>
            {footerConfig.tagline && (
              <p className="mt-4 max-w-xs text-sm text-[var(--text-muted)]">
                {footerConfig.tagline}
              </p>
            )}
            <ul className="mt-6 flex items-center gap-3">
              {footerConfig.social.map((s) => {
                const SocialIcon = socialIconMap[s.platform];
                return (
                  <li key={s.platform}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        s.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)] transition-colors hover:border-[var(--accent-blue)] hover:text-white"
                    >
                      <SocialIcon className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-4">
            {footerConfig.columns.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h3 className="font-display text-sm uppercase tracking-[0.18em] text-white">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--text-muted)] transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[var(--border-subtle)] pt-8 text-xs text-[var(--text-muted)] md:flex-row md:items-center">
          <p>{footerConfig.copyright}</p>
          <p>
            Built with care in{" "}
            <span className="text-white">Next.js + Tailwind</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
