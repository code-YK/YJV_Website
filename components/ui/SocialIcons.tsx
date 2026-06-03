"use client";

import { motion, useReducedMotion } from "framer-motion";
import { durations, easings, scales } from "@/lib/motion-tokens";

interface IconProps {
  className?: string;
}

function withHover<P extends IconProps>(Inner: React.FC<P>) {
  function HoverShell(props: P) {
    const reduced = useReducedMotion();
    return (
      <motion.span
        className="inline-flex transition-colors duration-200 hover:text-hub-accent"
        whileHover={reduced ? undefined : { scale: scales.lift, y: -1 }}
        whileTap={reduced ? undefined : { scale: scales.tap }}
        transition={{ duration: durations.fast, ease: easings.smooth }}
      >
        <Inner {...props} />
      </motion.span>
    );
  }
  HoverShell.displayName = `withHover(${Inner.displayName || Inner.name || "Icon"})`;
  return HoverShell;
}

function LinkedinIconBase({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.99 0 1.78-.77 1.78-1.72V1.72C24 .77 23.21 0 22.22 0z" />
    </svg>
  );
}

function TwitterIconBase({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.84l-5.36-7.013L4.6 22H1.34l8.02-9.166L1 2h7l4.84 6.39L18.244 2zm-2.397 18h1.83L7.246 4H5.27l10.577 16z" />
    </svg>
  );
}

function GithubIconBase({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.23 2.78.11 3.07.74.81 1.19 1.83 1.19 3.09 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
    </svg>
  );
}

export const LinkedinIcon = withHover(LinkedinIconBase);
export const TwitterIcon = withHover(TwitterIconBase);
export const GithubIcon = withHover(GithubIconBase);
