/**
 * Single source of truth for motion across the site.
 *
 * Prefer importing from here over declaring inline literals so
 * timing + feel stays consistent across components.
 *
 * All `springs.*` are typed so they can be passed directly to
 * framer-motion `transition={…}` props.
 */

/** Cubic-bezier easings, ready to drop into `transition.ease`. */
export const easings = {
  /** The project's signature ease — used across chapters, hero, workflow. */
  smooth: [0.22, 1, 0.36, 1] as const,
  easeOut: [0.16, 1, 0.3, 1] as const,
  easeIn: [0.6, 0, 0.32, 0.95] as const,
  linear: "linear" as const,
} as const;

/** Durations in seconds — match framer-motion's expected unit. */
export const durations = {
  fast: 0.18,
  normal: 0.32,
  slow: 0.55,
  crawl: 1.6,
} as const;

/**
 * Spring presets, typed so TS accepts them as `Transition`.
 * - `gentle`  — body content, large surfaces
 * - `snappy`  — buttons, micro-interactions
 * - `release` — drag-release physics
 * - `bouncy`  — playful entrances; use sparingly
 */
export const springs = {
  gentle: {
    type: "spring" as const,
    stiffness: 120,
    damping: 18,
    mass: 0.8,
  },
  snappy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 22,
    mass: 0.5,
  },
  release: {
    type: "spring" as const,
    stiffness: 220,
    damping: 28,
    mass: 0.6,
  },
  bouncy: {
    type: "spring" as const,
    stiffness: 260,
    damping: 12,
  },
} as const;

/** Hover / press / lift scale ratios. */
export const scales = {
  press: 0.97,
  tap: 0.98,
  pop: 1.02,
  lift: 1.04,
} as const;

/** Translate distances in pixels for slide-in animations. */
export const distances = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

/** CSS perspective tilt values used by the .tilt-card utility. */
export const tilt = {
  perspective: 1200,
  rotateXDeg: 2,
  rotateYDeg: 2,
  translateZ: 8,
} as const;
