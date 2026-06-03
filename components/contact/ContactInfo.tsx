import { Mail, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { LinkedinIcon } from "@/components/ui/SocialIcons";

const EMAIL = "info@yjventures.in";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
const LINKEDIN_URL = "https://www.linkedin.com/company/yjventures";

export function ContactInfo() {
  const whatsAppHref = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER.replace(/[^\d]/g, "")}`
    : null;

  return (
    <div className="flex flex-col">
      <Badge>Contact</Badge>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-yj-on-surface md:text-5xl">
        Tell us what you&rsquo;re trying to ship.
      </h1>
      <p className="mt-4 text-lg text-[var(--text-muted)]">
        One business-day response. NDA on request. No sales scripts.
      </p>

      <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
        Prefer another channel?
      </p>

      <ul className="mt-4 space-y-3">
        <li>
          <a
            href={`mailto:${EMAIL}`}
            className="tilt-card group flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 px-4 py-3 text-sm text-yj-on-surface transition-colors hover:border-[var(--accent-blue)] hover:shadow-[0_18px_40px_-20px_rgba(167,139,250,0.5)]"
          >
            <Mail className="h-4 w-4 text-[var(--accent-blue)]" aria-hidden />
            <span>{EMAIL}</span>
          </a>
        </li>
        {whatsAppHref && (
          <li>
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="tilt-card group flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 px-4 py-3 text-sm text-yj-on-surface transition-colors hover:border-[var(--accent-blue)] hover:shadow-[0_18px_40px_-20px_rgba(167,139,250,0.5)]"
            >
              <MessageCircle
                className="h-4 w-4 text-[var(--accent-blue)]"
                aria-hidden
              />
              <span>WhatsApp · {WHATSAPP_NUMBER}</span>
            </a>
          </li>
        )}
        <li>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="tilt-card group flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 px-4 py-3 text-sm text-yj-on-surface transition-colors hover:border-[var(--accent-blue)] hover:shadow-[0_18px_40px_-20px_rgba(167,139,250,0.5)]"
          >
            <LinkedinIcon className="h-4 w-4 text-[var(--accent-blue)]" />
            <span>LinkedIn</span>
          </a>
        </li>
      </ul>

      <div className="tilt-card mt-10 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/40 p-5 text-sm text-[var(--text-muted)] hover:border-hub-accent/40">
        One business-day response on weekdays. If it&rsquo;s time-sensitive,
        say so in the message and we&rsquo;ll move faster.
      </div>
    </div>
  );
}
