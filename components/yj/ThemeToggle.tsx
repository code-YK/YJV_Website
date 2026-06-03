"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "full";
}

export function ThemeToggle({ className, variant = "icon" }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted ? theme === "light" : false;
  const label = isLight ? "Switch to dark mode" : "Switch to light mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={mounted ? isLight : undefined}
      title={label}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full",
        "border border-hub-rule bg-hub-paper/60 backdrop-blur text-hub-ink",
        "transition-all duration-300",
        "hover:border-hub-accent hover:text-hub-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hub-accent/60",
        variant === "full"
          ? "h-10 gap-2 px-4 text-xs uppercase tracking-[0.22em] font-[family-name:var(--font-space-grotesk)] font-bold"
          : "h-10 w-10",
        className,
      )}
    >
      <span className="relative h-5 w-5 overflow-hidden" aria-hidden>
        <AnimatePresence mode="wait" initial={false}>
          {mounted && isLight ? (
            <motion.span
              key="sun"
              initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 grid place-items-center"
            >
              <Sun className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ rotate: 90, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 grid place-items-center"
            >
              <Moon className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      {variant === "full" && (
        <span>{isLight ? "Light" : "Dark"}</span>
      )}
    </button>
  );
}
