"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface HubtownMenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

const ROUTES = [
  { label: "Solutions", href: "/solutions" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Hire Developer", href: "/hire-developer" },
  { label: "Contact", href: "/contact" },
];

const CHAPTERS = [
  { label: "Future", href: "/#future" },
  { label: "Innovation", href: "/#innovation" },
  { label: "Collaboration", href: "/#collaboration" },
  { label: "Excellence", href: "/#excellence" },
  { label: "Purpose", href: "/#purpose" },
  { label: "Legacy", href: "/#legacy" },
];

const FOCUSABLE_SELECTOR =
  'a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function HubtownMenuOverlay({ open, onClose }: HubtownMenuOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const root = containerRef.current;
    const first = root?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    first?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => !el.hasAttribute("inert"));
      if (focusables.length === 0) return;
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && active === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={containerRef}
          key="menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[150] bg-hub-paper text-hub-ink"
        >
          <div className="flex items-center justify-between px-5 py-6 md:px-12">
            <Link
              href="/"
              onClick={onClose}
              className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold tracking-tight"
            >
              YJ VENTURES
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="hub-ghost-btn"
            >
              <X className="h-4 w-4" />
              Close
            </button>
          </div>

          <motion.div
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05 } },
            }}
            className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-16 px-5 pb-16 pt-12 md:px-12 lg:grid-cols-[3fr_2fr]"
          >
            <ul className="flex flex-col gap-3">
              {ROUTES.map((r) => (
                <motion.li
                  key={r.href}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={r.href}
                    onClick={onClose}
                    className="group flex items-baseline justify-between border-b border-hub-rule py-5 transition-colors hover:text-hub-accent"
                  >
                    <span className="hub-display text-5xl md:text-7xl">
                      {r.label}
                    </span>
                    <span
                      className="material-symbols-outlined text-2xl text-hub-ink-muted transition-transform duration-300 group-hover:translate-x-2 group-hover:text-hub-accent"
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      arrow_forward
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col gap-10">
              <div>
                <p className="hub-eyebrow mb-5">Chapters</p>
                <ul className="space-y-2">
                  {CHAPTERS.map((c, i) => (
                    <li key={c.href} className="flex items-baseline gap-4">
                      <span className="font-[family-name:var(--font-space-mono)] text-xs text-hub-ink-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Link
                        href={c.href}
                        onClick={onClose}
                        className="hub-link text-base font-[family-name:var(--font-space-grotesk)]"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="hub-eyebrow mb-3">Reach</p>
                <a
                  href="mailto:info@yjventures.in"
                  className="hub-link block font-[family-name:var(--font-inter)] text-base"
                >
                  info@yjventures.in
                </a>
                <p className="mt-2 text-sm text-hub-ink-muted">
                  Mumbai · Bengaluru · Remote
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
