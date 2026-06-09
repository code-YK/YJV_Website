"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { distances, durations, easings } from "@/lib/motion-tokens";

const SOLUTIONS = [
  { label: "Lead Automation", href: "/solutions/lead-automation" },
  { label: "Chat Automation", href: "/solutions/chat-automation" },
  { label: "Workflow Automation", href: "/solutions/workflow-automation" },
  { label: "AI Solutions", href: "/solutions/ai-solutions" },
];

const PLATFORM = [
  { label: "Overview", href: "/platform" },
  { label: "Chatbot Engine", href: "/platform/chatbot" },
  { label: "CRM Integration", href: "/platform/crm" },
  { label: "Analytics", href: "/platform/analytics" },
];

const COMPANY = [
  { label: "About Us", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
];

const REACH = [
  { label: "info@yjventures.in", href: "mailto:info@yjventures.in" },
  { label: "+91 6352998995", href: "tel:+916352998995" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Data Deletion", href: "/data-deletion" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const columnVariants = {
  hidden: { opacity: 0, y: distances.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.slow, ease: easings.smooth },
  },
};

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <motion.div variants={columnVariants}>
      <p className="hub-eyebrow mb-6 text-hub-ink-muted">{heading}</p>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="hub-link text-sm">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function HubtownFooter() {
  const reduced = useReducedMotion();

  return (
    <footer className="border-t border-hub-rule bg-hub-paper py-20">
      <motion.div
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={containerVariants}
        className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-12 px-5 md:grid-cols-5 md:px-12"
      >
        <motion.div variants={columnVariants} className="col-span-2 md:col-span-1">
          <Link href="/" className="hub-display block text-2xl">
            YJ VENTURES
          </Link>
          <p className="mt-6 max-w-xs text-sm text-hub-ink-muted">
            AI communication and automation that turns conversations into
            customers, for businesses on five continents.
          </p>
          <ul className="mt-6 space-y-2">
            {REACH.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hub-link text-sm">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <FooterColumn heading="Solutions" links={SOLUTIONS} />
        <FooterColumn heading="Platform" links={PLATFORM} />
        <FooterColumn heading="Company" links={COMPANY} />
        <FooterColumn heading="Legal" links={LEGAL} />
      </motion.div>

      <div className="mx-auto mt-16 flex w-full max-w-[1440px] flex-col items-start justify-between gap-4 border-t border-hub-rule px-5 pt-8 text-xs uppercase tracking-[0.22em] text-hub-ink-muted md:flex-row md:items-center md:px-12">
        <p>© {new Date().getFullYear()} YJ Ventures · All rights reserved</p>
        <p className="font-[family-name:var(--font-space-mono)]">
          Built by the engineers who maintain it
        </p>
      </div>
    </footer>
  );
}
