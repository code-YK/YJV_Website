"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { durations, easings, scales, springs } from "@/lib/motion-tokens";

export function HubtownContactFab() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  if (pathname?.startsWith("/contact")) return null;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.85, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        ...springs.gentle,
        delay: reduced ? 0 : 0.6,
      }}
      className="fixed bottom-6 right-6 z-[80]"
    >
      <motion.div
        whileHover={reduced ? undefined : { scale: scales.pop, y: -2 }}
        whileTap={reduced ? undefined : { scale: scales.tap }}
        transition={{ duration: durations.fast, ease: easings.smooth }}
      >
        <Link
          href="/contact?source=fab"
          aria-label="Book a call with YJ Ventures"
          className="group inline-flex items-center gap-2 rounded-full border border-hub-rule bg-hub-paper px-5 py-3 font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-[0.22em] text-hub-ink shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all hover:border-hub-accent hover:text-hub-accent hover:shadow-[0_14px_40px_-8px_rgba(167,139,250,0.5)]"
        >
          <MessageCircle className="h-4 w-4 text-hub-accent" aria-hidden />
          <span className="hidden md:inline">Book a call</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
