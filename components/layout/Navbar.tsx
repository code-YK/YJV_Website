"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-colors duration-300",
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-[var(--border-subtle)]"
            : "bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight text-white"
          >
            YJ <span className="text-[var(--accent-blue)]">Ventures</span>
          </Link>

          <ul
            className="hidden md:flex items-center gap-2"
            onMouseLeave={() => setHovered(null)}
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;
              const isIndicator =
                hovered === link.href || (hovered === null && active);
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    onMouseEnter={() => setHovered(link.href)}
                    onFocus={() => setHovered(link.href)}
                    onBlur={() => setHovered(null)}
                    className={cn(
                      "relative block rounded-md px-3 py-2 text-sm transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]/60",
                      active || hovered === link.href
                        ? "text-white"
                        : "text-[var(--text-muted)] hover:text-white",
                    )}
                  >
                    {hovered === link.href && (
                      <motion.span
                        layoutId="nav-hover-bg"
                        className="absolute inset-0 -z-10 rounded-md bg-white/[0.04] ring-1 ring-inset ring-white/10"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                    {isIndicator && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--accent-blue)] shadow-[0_0_10px_var(--accent-blue)]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <Button variant="primary" href="/contact">
              Get Started
            </Button>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="md:hidden p-2 text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-6">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="font-display text-lg font-bold tracking-tight text-white"
              >
                YJ <span className="text-[var(--accent-blue)]">Ventures</span>
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="p-2 text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
              className="mt-8 flex flex-col items-center gap-6"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-2xl text-white"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0 },
                }}
                className="mt-4"
              >
                <Button
                  variant="primary"
                  href="/contact"
                  onClick={() => setOpen(false)}
                >
                  Get Started
                </Button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
