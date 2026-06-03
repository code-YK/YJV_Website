"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Global site nav for YJ Ventures. Glassmorphism, near-invisible at the very
 * top, fades in after a small scroll. Solutions / Platform / Industries are
 * hover/focus dropdowns; Case Studies / About / Contact are direct links.
 * Shown on every page, including the homepage (fades in once you scroll past
 * the morph hero's first screen).
 */
interface MenuItem {
  label: string;
  href: string;
}
interface MenuGroup {
  label: string;
  /** Hub link for the trigger itself, if the group has an overview page. */
  href?: string;
  items: MenuItem[];
}

const MENUS: MenuGroup[] = [
  {
    label: "Solutions",
    items: [
      { label: "Lead Automation", href: "/solutions/lead-automation" },
      { label: "Chat Automation", href: "/solutions/chat-automation" },
      { label: "Workflow Automation", href: "/solutions/workflow-automation" },
      { label: "AI Solutions", href: "/solutions/ai-solutions" },
    ],
  },
  {
    label: "Platform",
    href: "/platform",
    items: [
      { label: "Overview", href: "/platform" },
      { label: "Chatbot Engine", href: "/platform/chatbot" },
      { label: "CRM Integration", href: "/platform/crm" },
      { label: "Analytics Dashboard", href: "/platform/analytics" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    items: [
      { label: "Overview", href: "/industries" },
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "E-commerce", href: "/industries/ecommerce" },
      { label: "Education", href: "/industries/education" },
    ],
  },
];

const LINKS: MenuItem[] = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Shared link typography for the top-level nav items (and dropdown triggers).
const NAV_LINK =
  "font-[family-name:var(--font-inter)] text-[15px] font-medium tracking-[-0.01em] text-white/75 transition-colors hover:text-white";

function Dropdown({ group }: { group: MenuGroup }) {
  const triggerClass = `flex cursor-pointer items-center gap-1.5 ${NAV_LINK} group-hover:text-white`;
  return (
    <div className="group relative">
      {group.href ? (
        <Link href={group.href} className={triggerClass}>
          {group.label}
          <span aria-hidden className="text-[9px] opacity-60">▼</span>
        </Link>
      ) : (
        <span className={triggerClass}>
          {group.label}
          <span aria-hidden className="text-[9px] opacity-60">▼</span>
        </span>
      )}
      <div className="invisible absolute left-1/2 top-full z-10 w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="rounded-2xl border border-white/10 bg-[rgba(11,15,20,0.95)] p-2 backdrop-blur-md shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]">
          {group.items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="block rounded-xl px-3 py-2.5 font-[family-name:var(--font-inter)] text-sm font-medium text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EngineNav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[120] transition-all duration-500"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(-8px)",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <div className="border-b border-white/[0.06] bg-[rgba(11,15,20,0.75)] backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Link href="/" className="leading-none">
            <div className="font-[family-name:var(--font-space-grotesk)] text-lg tracking-tight text-white">
              <span className="font-extrabold">YJ</span>{" "}
              <span className="font-medium tracking-[0.08em]">VENTURES</span>
            </div>
            <div className="mt-1.5 flex items-center gap-1.5 font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-[0.25em] text-emerald-400/90">
              <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
              System Status: Optimal
            </div>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {MENUS.map((m) => (
              <Dropdown key={m.label} group={m} />
            ))}
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={NAV_LINK}>
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#22D3EE] p-[1px] transition-shadow hover:shadow-[0_0_22px_-6px_rgba(34,211,238,0.7)]"
          >
            <span className="block rounded-full bg-[#0b0f14] px-5 py-2.5 font-[family-name:var(--font-inter)] text-sm font-semibold text-white transition-colors hover:bg-transparent hover:text-[#06121a]">
              Book a Demo
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default EngineNav;
