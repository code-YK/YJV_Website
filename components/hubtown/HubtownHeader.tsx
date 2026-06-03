"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/yj/ThemeToggle";
import { HubtownMenuOverlay } from "./HubtownMenuOverlay";
import { services } from "@/lib/content/services";
import { industries } from "@/lib/content/industries";
import { solutions } from "@/lib/content/solutions";
import { roles } from "@/lib/content/roles";
import { cn } from "@/lib/utils";

type NavChild = { label: string; href: string; sub?: string };
type NavItem = { label: string; href: string; children?: NavChild[] };

const NAV: NavItem[] = [
  {
    label: "Solutions",
    href: "/solutions",
    children: solutions.map((s) => ({ label: s.name, href: `/solutions#${s.slug}` })),
  },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
  },
  {
    label: "Industries",
    href: "/industries",
    children: industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` })),
  },
  {
    label: "Hire Developer",
    href: "/hire-developer",
    children: roles.map((r) => ({ label: r.name, href: `/hire-developer#${r.slug}` })),
  },
  { label: "Contact", href: "/contact" },
];

export function HubtownHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const justClosedRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setOpenIndex(null);
  }, [pathname]);

  const open = (i: number) => {
    if (justClosedRef.current) return;
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenIndex(i);
  };

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setOpenIndex(null);
      closeTimer.current = null;
    }, 140);
  };

  const handleBlurCapture = (
    e: React.FocusEvent<HTMLDivElement>,
    i: number,
  ) => {
    const next = e.relatedTarget as Node | null;
    if (!next || !e.currentTarget.contains(next)) {
      if (openIndex === i) scheduleClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, i: number) => {
    if (e.key === "Escape" && openIndex === i) {
      e.preventDefault();
      setOpenIndex(null);
      justClosedRef.current = true;
      const trigger = e.currentTarget.querySelector<HTMLElement>(
        "[data-nav-trigger]",
      );
      trigger?.focus();
      window.setTimeout(() => {
        justClosedRef.current = false;
      }, 0);
    }
  };

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[120] transition-all duration-300",
          scrolled
            ? "bg-hub-paper/90 backdrop-blur-md border-b border-hub-rule"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-5 md:px-12">
          <Link
            href="/"
            className="font-[family-name:var(--font-space-grotesk)] text-base font-bold tracking-tight text-hub-ink md:text-lg"
          >
            YJ VENTURES
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item, i) => {
              const active = isActive(item.href);
              const hasChildren = !!item.children?.length;
              const isOpen = openIndex === i;
              const panelId = `nav-panel-${i}`;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => hasChildren && open(i)}
                  onMouseLeave={() => hasChildren && scheduleClose()}
                  onFocusCapture={() => hasChildren && open(i)}
                  onBlurCapture={(e) => hasChildren && handleBlurCapture(e, i)}
                  onKeyDown={(e) => hasChildren && handleKeyDown(e, i)}
                >
                  <Link
                    href={item.href}
                    data-nav-trigger
                    aria-haspopup={hasChildren ? "menu" : undefined}
                    aria-expanded={hasChildren ? isOpen : undefined}
                    aria-controls={hasChildren ? panelId : undefined}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-4 py-2 font-[family-name:var(--font-space-grotesk)] text-[11px] font-bold uppercase tracking-[0.22em] transition-colors",
                      active
                        ? "text-hub-accent"
                        : "text-hub-ink-muted hover:text-hub-ink",
                    )}
                  >
                    {item.label}
                    {hasChildren && (
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 transition-transform duration-200",
                          isOpen && "rotate-180",
                        )}
                        aria-hidden
                      />
                    )}
                  </Link>

                  {hasChildren && (
                    <div
                      id={panelId}
                      role="menu"
                      aria-label={item.label}
                      className={cn(
                        "absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-200",
                        isOpen
                          ? "pointer-events-auto opacity-100 translate-y-0"
                          : "pointer-events-none opacity-0 -translate-y-1",
                      )}
                    >
                      <div className="min-w-[260px] rounded-2xl border border-hub-rule bg-hub-paper/95 p-2 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            tabIndex={isOpen ? 0 : -1}
                            className="block rounded-xl px-4 py-3 font-[family-name:var(--font-space-grotesk)] text-sm font-medium text-hub-ink transition-colors hover:bg-hub-accent/10 hover:text-hub-accent"
                          >
                            {child.label}
                          </Link>
                        ))}
                        <Link
                          href={item.href}
                          role="menuitem"
                          tabIndex={isOpen ? 0 : -1}
                          className="block border-t border-hub-rule px-4 py-3 font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.28em] text-hub-ink-muted transition-colors hover:text-hub-accent"
                        >
                          All {item.label} →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden md:inline-flex hub-accent-btn"
            >
              Book a call
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="hub-ghost-btn lg:hidden"
            >
              <Menu className="h-4 w-4" />
              <span className="hidden md:inline">Menu</span>
            </button>
          </div>
        </div>
      </header>

      <HubtownMenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
