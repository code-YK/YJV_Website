import { useSyncExternalStore } from "react";

/**
 * Shared scroll-progress store for the Digital Engine Room hero.
 *
 * A dependency-free, framework-agnostic singleton. The GSAP ScrollTrigger
 * writes raw progress via `setHeroProgress`; the raw-THREE canvas reads the
 * live snapshot imperatively in its RAF loop (no React re-render at 60fps);
 * DOM panels subscribe through `useHeroScroll` (useSyncExternalStore).
 *
 * State play order is the legacy 3 -> 1 -> 4 -> 2 sequence, expressed here as
 * the scroll-percentage ordering DeepCore -> Reveal -> Ledger -> Detachment.
 */

export const HeroState = {
  /** Deep Core — camera inside the orb, boot readout (0% -> 8%). */
  DeepCore: "deep-core",
  /** Reveal — orb condenses right, headline + live status slide in (8% -> 35%). */
  Reveal: "reveal",
  /** Integration Ledger — orb docks left, capability bento fills the right (35% -> 70%). */
  Ledger: "integration-ledger",
  /** Detachment — orb shatters/stretches into the full-width topology map (70% -> 100%). */
  Detachment: "detachment",
} as const;

export type HeroStateValue = (typeof HeroState)[keyof typeof HeroState];

export interface HeroScrollSnapshot {
  /** Overall progress across the 3000px pin, 0..1. */
  progress: number;
  /** Active state, derived from `progress`. */
  state: HeroStateValue;
  /** Local progress within the active state, 0..1. */
  stateProgress: number;
}

/** Scroll-percentage breakpoints between the four states (brief: 0/35/70/100). */
const DEEPCORE_END = 0.08; // short boot window before the Reveal
const REVEAL_END = 0.35;
const LEDGER_END = 0.7;

function clamp01(n: number): number {
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

function deriveState(progress: number): {
  state: HeroStateValue;
  stateProgress: number;
} {
  // Deep Core holds a short window at the top so the boot readout is visible
  // before the orb begins condensing into the Reveal.
  if (progress < DEEPCORE_END) {
    return {
      state: HeroState.DeepCore,
      stateProgress: clamp01(progress / DEEPCORE_END),
    };
  }
  if (progress < REVEAL_END) {
    return {
      state: HeroState.Reveal,
      stateProgress: (progress - DEEPCORE_END) / (REVEAL_END - DEEPCORE_END),
    };
  }
  if (progress < LEDGER_END) {
    return {
      state: HeroState.Ledger,
      stateProgress: (progress - REVEAL_END) / (LEDGER_END - REVEAL_END),
    };
  }
  return {
    state: HeroState.Detachment,
    stateProgress: clamp01((progress - LEDGER_END) / (1 - LEDGER_END)),
  };
}

const DEFAULT_SNAPSHOT: HeroScrollSnapshot = {
  progress: 0,
  state: HeroState.DeepCore,
  stateProgress: 0,
};

let snapshot: HeroScrollSnapshot = DEFAULT_SNAPSHOT;
const subscribers = new Set<() => void>();

/**
 * Imperative writer used by GSAP's `onUpdate`. Allocates a new snapshot object
 * only when the visible values actually change, so `useSyncExternalStore`
 * receives a referentially-stable value between identical writes.
 */
export function setHeroProgress(rawProgress: number): void {
  const progress = clamp01(rawProgress);
  const { state, stateProgress } = deriveState(progress);

  if (
    progress === snapshot.progress &&
    state === snapshot.state &&
    stateProgress === snapshot.stateProgress
  ) {
    return;
  }

  snapshot = { progress, state, stateProgress };
  for (const cb of subscribers) cb();
}

/** Synchronous reader for the canvas RAF loop (no React involvement). */
export function getHeroSnapshot(): HeroScrollSnapshot {
  return snapshot;
}

/** Subscribe to snapshot changes. Returns an unsubscribe function. */
export function subscribeHero(cb: () => void): () => void {
  subscribers.add(cb);
  return () => {
    subscribers.delete(cb);
  };
}

function getServerSnapshot(): HeroScrollSnapshot {
  return DEFAULT_SNAPSHOT;
}

/** React hook for DOM panels. */
export function useHeroScroll(): HeroScrollSnapshot {
  return useSyncExternalStore(subscribeHero, getHeroSnapshot, getServerSnapshot);
}

/** Test-only reset so unit tests start from a known state. */
export function __resetHeroStore(): void {
  snapshot = DEFAULT_SNAPSHOT;
  subscribers.clear();
}
