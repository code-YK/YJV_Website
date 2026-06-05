"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLenis } from "@/lib/scroll/smoothScroll";

/**
 * Global site nav for YJ Ventures. Glassmorphism bar that is transparent over
 * the hero and fades to solid glass once you scroll. Solutions / Platform /
 * Industries are hover/focus dropdowns on desktop (lg+); below lg the entire
 * menu collapses into an accessible slide-out drawer (hamburger -> dialog with
 * focus trap, ESC-to-close, scroll lock, and close-on-navigate).
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

/** Collapsible group inside the mobile drawer. */
function DrawerGroup({
  group,
  onNavigate,
}: {
  group: MenuGroup;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `drawer-group-${group.label.toLowerCase()}`;
  return (
    <div className="border-b border-white/[0.08]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-12 w-full items-center justify-between py-3.5 font-[family-name:var(--font-inter)] text-lg font-medium text-white"
      >
        {group.label}
        <span
          aria-hidden
          className={`text-hub-accent transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="overflow-hidden pb-2"
      >
        {group.items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            onClick={onNavigate}
            className="flex min-h-11 items-center rounded-lg px-3 py-2.5 font-[family-name:var(--font-inter)] text-[15px] text-white/65 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            {it.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/** Accessible slide-out mobile menu (dialog + focus trap + scroll lock). */
function MobileDrawer({
  open,
  onClose,
  returnFocusRef,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock body scroll (and pause Lenis) while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      getLenis()?.start();
    };
  }, [open]);

  // Focus management: move focus into the panel on open, trap Tab, ESC closes,
  // and restore focus to the hamburger on close.
  useEffect(() => {
    if (!open) return;
    const node = panelRef.current;
    if (!node) return;
    const trigger = returnFocusRef.current;

    const focusables = () =>
      Array.from(
        node.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    node.addEventListener("keydown", onKeyDown);
    return () => {
      node.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  return (
    <div className="lg:hidden" aria-hidden={!open}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[190] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={`fixed inset-y-0 right-0 z-[200] flex w-[min(86vw,360px)] flex-col border-l border-white/10 bg-[rgba(11,15,20,0.98)] shadow-[-24px_0_60px_-20px_rgba(0,0,0,0.8)] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
          <span className="font-[family-name:var(--font-space-grotesk)] text-base tracking-tight text-white">
            <span className="font-extrabold">YJ</span>{" "}
            <span className="font-medium tracking-[0.08em]">VENTURES</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-5 py-2">
          {MENUS.map((m) => (
            <DrawerGroup key={m.label} group={m} onNavigate={onClose} />
          ))}
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="flex min-h-12 items-center border-b border-white/[0.08] py-3.5 font-[family-name:var(--font-inter)] text-lg font-medium text-white/85 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/[0.08] p-5">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#22D3EE] px-5 py-3 font-[family-name:var(--font-inter)] text-sm font-bold text-[#06121a]"
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </div>
  );
}

export function EngineNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer whenever the route changes (deferred off the effect body
  // to avoid the set-state-in-effect cascading-render lint).
  useEffect(() => {
    const id = requestAnimationFrame(() => setMenuOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-[120]">
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-white/[0.06] bg-[rgba(11,15,20,0.75)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
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

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#22D3EE] p-[1px] transition-shadow hover:shadow-[0_0_22px_-6px_rgba(34,211,238,0.7)] sm:block"
            >
              <span className="block rounded-full bg-[#0b0f14] px-5 py-2.5 font-[family-name:var(--font-inter)] text-sm font-semibold text-white transition-colors hover:bg-transparent hover:text-[#06121a]">
                Book a Demo
              </span>
            </Link>

            {/* Hamburger — below lg only. */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/[0.06] lg:hidden"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-drawer">
        <MobileDrawer
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          returnFocusRef={hamburgerRef}
        />
      </div>
    </header>
  );
}

export default EngineNav;
