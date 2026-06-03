"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/content/services";
import { industries } from "@/lib/content/industries";
import type { IconName } from "@/lib/content/types";
import { cn } from "@/lib/utils";

interface NavSubItem {
  label: string;
  href: string;
  tagline?: string;
  icon: IconName;
}

interface NavItem {
  label: string;
  href: string;
  items?: NavSubItem[];
}

const SOLUTION_ITEMS: NavSubItem[] = [
  {
    label: "AI Workflow Automation Pack",
    href: "/solutions#ai-workflow-automation-pack",
    tagline: "Automate repetitive ops in 4–6 weeks.",
    icon: "Workflow",
  },
  {
    label: "AI Copilot (RAG-grounded)",
    href: "/solutions#ai-copilot-rag",
    tagline: "Answers grounded in your private data.",
    icon: "BrainCircuit",
  },
  {
    label: "MVP-to-Production SaaS Build",
    href: "/solutions#mvp-to-production-saas",
    tagline: "From idea to live customers in a quarter.",
    icon: "Rocket",
  },
  {
    label: "AI Audit & Rescue",
    href: "/solutions#ai-audit-rescue",
    tagline: "Triage and fix a stalled AI initiative.",
    icon: "ShieldCheck",
  },
];

const ROLE_ITEMS: NavSubItem[] = [
  {
    label: "AI/ML Engineer",
    href: "/hire-developer#ai-ml",
    tagline: "LLMs, RAG pipelines, evals.",
    icon: "BrainCircuit",
  },
  {
    label: "Full-stack Engineer",
    href: "/hire-developer#full-stack",
    tagline: "TypeScript end-to-end, ships features.",
    icon: "LayoutGrid",
  },
  {
    label: "Backend Engineer",
    href: "/hire-developer#backend",
    tagline: "APIs, queues, data pipelines.",
    icon: "Server",
  },
  {
    label: "Mobile Engineer",
    href: "/hire-developer#mobile",
    tagline: "iOS, Android, React Native.",
    icon: "Smartphone",
  },
  {
    label: "DevOps / Platform",
    href: "/hire-developer#devops",
    tagline: "Cloud infra, CI/CD, observability.",
    icon: "Cloud",
  },
  {
    label: "Data Engineer",
    href: "/hire-developer#data",
    tagline: "Warehouses, ELT, analytics layers.",
    icon: "Database",
  },
];

const NAV_ITEMS: NavItem[] = [
  {
    label: "SOLUTIONS",
    href: "/solutions",
    items: SOLUTION_ITEMS,
  },
  {
    label: "SERVICES",
    href: "/services",
    items: services.map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
      tagline: s.tagline,
      icon: s.icon,
    })),
  },
  {
    label: "INDUSTRIES",
    href: "/industries",
    items: industries.map((i) => ({
      label: i.name,
      href: `/industries/${i.slug}`,
      tagline: i.description.split(" — ")[0] ?? i.name,
      icon: i.icon,
    })),
  },
  {
    label: "HIRE DEVELOPER",
    href: "/hire-developer",
    items: ROLE_ITEMS,
  },
];

export function YJHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const closeTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const triggerRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setIndicator(null);
    setHovered(null);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  useEffect(() => {
    const timers = closeTimers.current;
    return () => {
      Object.values(timers).forEach((t) => clearTimeout(t));
    };
  }, []);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cancelClose = useCallback((href: string) => {
    const t = closeTimers.current[href];
    if (t) {
      clearTimeout(t);
      delete closeTimers.current[href];
    }
  }, []);

  const scheduleClose = useCallback((href: string) => {
    cancelClose(href);
    closeTimers.current[href] = setTimeout(() => {
      setOpenDropdown((curr) => (curr === href ? null : curr));
    }, 120);
  }, [cancelClose]);

  const openNow = useCallback(
    (href: string) => {
      cancelClose(href);
      setOpenDropdown(href);
    },
    [cancelClose],
  );

  const moveIndicatorTo = (el: HTMLElement | null) => {
    const root = navRef.current;
    if (!el || !root) return;
    const rootRect = root.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setIndicator({ left: rect.left - rootRect.left, width: rect.width });
  };

  const isActiveRoute = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        "bg-yj-surface/80 backdrop-blur-[24px] border-b",
        scrolled
          ? "border-yj-primary-container/20 shadow-[0_0_40px_rgba(0,219,233,0.18)]"
          : "border-white/10 shadow-[0_0_30px_rgba(0,219,233,0.08)]",
      )}
    >
      <div className="flex h-20 w-full max-w-[1440px] items-center justify-between px-5 md:px-20 mx-auto">
        <Link
          href="/"
          className="group relative font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold tracking-tighter text-yj-primary transition-all duration-300 hover:[text-shadow:0_0_20px_rgba(0,240,255,0.55)]"
        >
          YJ VENTURES
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-yj-primary-container to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </Link>

        <div
          ref={navRef}
          className="hidden md:block relative"
          onMouseLeave={() => {
            setHovered(null);
            setIndicator(null);
          }}
        >
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((link) => {
              const active = isActiveRoute(link.href);
              const isHover = hovered === link.label;
              const hasDropdown = Boolean(link.items && link.items.length > 0);
              const isOpen = hasDropdown && openDropdown === link.href;

              return (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={hasDropdown ? () => openNow(link.href) : undefined}
                  onMouseLeave={hasDropdown ? () => scheduleClose(link.href) : undefined}
                >
                  <Link
                    href={link.href}
                    ref={(el) => {
                      triggerRefs.current[link.href] = el;
                    }}
                    aria-haspopup={hasDropdown ? "menu" : undefined}
                    aria-expanded={hasDropdown ? isOpen : undefined}
                    onMouseEnter={(e) => {
                      setHovered(link.label);
                      moveIndicatorTo(e.currentTarget);
                    }}
                    onFocus={(e) => {
                      setHovered(link.label);
                      moveIndicatorTo(e.currentTarget);
                      if (hasDropdown) openNow(link.href);
                    }}
                    onBlur={() => setHovered(null)}
                    className={cn(
                      "relative inline-flex items-center gap-1 px-4 py-2 rounded-md font-[family-name:var(--font-space-grotesk)]",
                      "text-xs font-bold tracking-[0.15em] uppercase",
                      "transition-all duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yj-primary-container/60",
                      active || isHover || isOpen
                        ? "text-yj-primary [text-shadow:0_0_18px_rgba(0,240,255,0.65)]"
                        : "text-yj-on-surface-variant hover:text-yj-primary",
                    )}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {hasDropdown && (
                      <ChevronDown
                        className={cn(
                          "relative h-3.5 w-3.5 transition-transform duration-200",
                          isOpen ? "rotate-180 text-yj-primary" : "text-yj-on-surface-variant",
                        )}
                        aria-hidden
                      />
                    )}
                    {active && !isHover && !isOpen && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -bottom-[1px] left-1/2 h-[2px] w-[60%] -translate-x-1/2 rounded-full bg-yj-primary-container shadow-[0_0_18px_rgba(0,240,255,0.9)]"
                      />
                    )}
                  </Link>

                  {hasDropdown && (
                    <AnimatePresence>
                      {isOpen && (
                        <DropdownPanel
                          link={link}
                          pathname={pathname}
                          onClose={() => {
                            setOpenDropdown(null);
                            triggerRefs.current[link.href]?.focus();
                          }}
                          onPanelEnter={() => cancelClose(link.href)}
                          onPanelLeave={() => scheduleClose(link.href)}
                        />
                      )}
                    </AnimatePresence>
                  )}
                </li>
              );
            })}
          </ul>

          {indicator && (
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 h-full transition-all duration-300 ease-out"
              style={{ left: indicator.left, width: indicator.width }}
            >
              <div className="absolute inset-y-1 inset-x-1 rounded-md bg-gradient-to-b from-white/[0.06] to-transparent ring-1 ring-inset ring-yj-primary-container/20" />
              <div className="absolute -bottom-[1px] left-1/2 h-[2px] w-[60%] -translate-x-1/2 rounded-full bg-yj-primary-container shadow-[0_0_18px_rgba(0,240,255,0.9)]" />
            </div>
          )}
        </div>

        <Link
          href="/contact"
          className={cn(
            "hidden md:inline-flex items-center justify-center px-6 py-3 rounded-full yj-neon-button",
            "font-[family-name:var(--font-space-grotesk)] text-xs font-bold tracking-[0.15em] uppercase text-yj-primary",
          )}
        >
          BOOK DISCOVERY CALL
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-yj-primary"
        >
          <span
            className="material-symbols-outlined text-3xl"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            {open ? "close" : "menu"}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t border-white/10 bg-yj-surface/95 backdrop-blur-[24px] max-h-[calc(100vh-5rem)] overflow-y-auto"
          >
            <nav className="flex flex-col gap-1 px-5 py-6">
              {NAV_ITEMS.map((link) => {
                const active = isActiveRoute(link.href);
                const hasDropdown = Boolean(link.items && link.items.length > 0);
                const expanded = mobileExpanded === link.href;

                return (
                  <div key={link.href} className="border-b border-white/5">
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "group relative flex-1 font-[family-name:var(--font-space-grotesk)] text-sm font-bold tracking-[0.15em] uppercase py-3 transition-colors",
                          active
                            ? "text-yj-primary"
                            : "text-yj-on-surface-variant hover:text-yj-primary",
                        )}
                      >
                        <span
                          className={cn(
                            "absolute left-0 top-1/2 h-px -translate-y-1/2 bg-yj-primary-container shadow-[0_0_10px_rgba(0,240,255,0.6)] transition-all duration-300",
                            active ? "w-4" : "w-0 group-hover:w-4",
                          )}
                        />
                        <span
                          className={cn(
                            "inline-block transition-transform duration-300",
                            active ? "translate-x-7" : "group-hover:translate-x-7",
                          )}
                        >
                          {link.label}
                        </span>
                      </Link>
                      {hasDropdown && (
                        <button
                          type="button"
                          aria-label={expanded ? `Collapse ${link.label}` : `Expand ${link.label}`}
                          aria-expanded={expanded}
                          onClick={() => setMobileExpanded(expanded ? null : link.href)}
                          className="p-3 text-yj-on-surface-variant"
                        >
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 transition-transform duration-200",
                              expanded && "rotate-180 text-yj-primary",
                            )}
                            aria-hidden
                          />
                        </button>
                      )}
                    </div>

                    {hasDropdown && (
                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.ul
                            key="sub"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pb-3 pl-3 flex flex-col gap-1">
                              {link.items!.map((sub) => (
                                <li key={sub.href}>
                                  <Link
                                    href={sub.href}
                                    onClick={() => {
                                      setOpen(false);
                                      setMobileExpanded(null);
                                    }}
                                    className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-yj-on-surface-variant hover:text-yj-primary hover:bg-white/[0.04] transition-colors"
                                  >
                                    <span className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-yj-primary-container/25 to-yj-secondary-container/25 ring-1 ring-inset ring-white/10">
                                      <Icon name={sub.icon} className="h-4 w-4 text-yj-primary" />
                                    </span>
                                    <span className="flex min-w-0 flex-col">
                                      <span className="font-[family-name:var(--font-space-grotesk)] text-[13px] font-semibold text-white">
                                        {sub.label}
                                      </span>
                                      {sub.tagline && (
                                        <span className="text-[11px] text-yj-on-surface-variant line-clamp-1">
                                          {sub.tagline}
                                        </span>
                                      )}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </div>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-full yj-neon-button font-[family-name:var(--font-space-grotesk)] text-xs font-bold tracking-[0.15em] uppercase text-yj-primary"
              >
                BOOK DISCOVERY CALL
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

interface DropdownPanelProps {
  link: NavItem;
  pathname: string;
  onClose: () => void;
  onPanelEnter: () => void;
  onPanelLeave: () => void;
}

function DropdownPanel({
  link,
  pathname,
  onClose,
  onPanelEnter,
  onPanelLeave,
}: DropdownPanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const items = link.items ?? [];
  const twoCol = items.length >= 5;

  const onPanelKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const root = panelRef.current;
    if (!root) return;
    const focusable = Array.from(
      root.querySelectorAll<HTMLAnchorElement>("a[role='menuitem']"),
    );
    if (focusable.length === 0) return;
    e.preventDefault();
    const idx = focusable.indexOf(document.activeElement as HTMLAnchorElement);
    const next =
      e.key === "ArrowDown"
        ? focusable[(idx + 1 + focusable.length) % focusable.length]
        : focusable[(idx - 1 + focusable.length) % focusable.length];
    next?.focus();
  };

  const isSubActive = useMemo(
    () => (href: string) => {
      const path = href.split("#")[0];
      return pathname === path;
    },
    [pathname],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -4, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute left-1/2 top-full -translate-x-1/2 pt-3 z-50"
      onMouseEnter={onPanelEnter}
      onMouseLeave={onPanelLeave}
    >
      <div className="absolute -top-1 left-0 right-0 h-3" aria-hidden />
      <div
        ref={panelRef}
        role="menu"
        aria-label={`${link.label} menu`}
        onKeyDown={onPanelKeyDown}
        className={cn(
          "rounded-2xl border border-white/10 bg-yj-surface/95 backdrop-blur-xl",
          "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7),0_0_40px_-10px_rgba(0,240,255,0.25)]",
          "p-3",
          twoCol ? "w-[560px]" : "w-[340px]",
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-yj-primary-container/70 to-transparent"
        />
        <ul
          className={cn(
            "grid gap-1",
            twoCol ? "grid-cols-2" : "grid-cols-1",
          )}
        >
          {items.map((sub) => (
            <li key={sub.href}>
              <Link
                href={sub.href}
                role="menuitem"
                onClick={onClose}
                className={cn(
                  "group flex items-start gap-3 rounded-xl p-2.5 transition-all duration-150",
                  "hover:bg-white/[0.05] focus-visible:bg-white/[0.05]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yj-primary-container/60",
                )}
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                    "bg-gradient-to-br from-yj-primary-container/20 to-yj-secondary-container/25",
                    "ring-1 ring-inset ring-white/10",
                    "transition-all duration-150",
                    "group-hover:from-yj-primary-container/45 group-hover:to-yj-secondary/35",
                    "group-hover:ring-yj-primary-container/40",
                    "group-hover:shadow-[0_0_18px_rgba(0,240,255,0.35)]",
                  )}
                >
                  <Icon name={sub.icon} className="h-4 w-4 text-yj-primary" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="inline-flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] text-[13px] font-semibold text-white">
                    {isSubActive(sub.href) && (
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-yj-primary-container shadow-[0_0_10px_rgba(0,240,255,0.9)]"
                      />
                    )}
                    {sub.label}
                  </span>
                  {sub.tagline && (
                    <span className="mt-0.5 font-[family-name:var(--font-inter)] text-[11px] leading-snug text-yj-on-surface-variant line-clamp-2">
                      {sub.tagline}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
