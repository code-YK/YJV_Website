"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: Variant;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] focus:ring-offset-2 focus:ring-offset-black";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-[linear-gradient(135deg,var(--accent-blue),var(--accent-purple))] hover:shadow-[0_0_28px_var(--accent-glow)]",
  outline:
    "text-yj-on-surface border border-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/15",
  ghost: "text-[var(--accent-blue)] hover:text-yj-on-surface",
};

export function Button({
  variant = "primary",
  href,
  children,
  className,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);
  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 18 },
  };

  if (href) {
    const { onClick } = rest;
    return (
      <motion.span {...motionProps} className="inline-flex">
        <Link
          href={href}
          className={classes}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {children}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button {...motionProps} className={classes} {...rest}>
      {children}
    </motion.button>
  );
}
