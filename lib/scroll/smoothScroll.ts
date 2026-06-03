import { useSyncExternalStore } from "react";
import type Lenis from "lenis";

/**
 * Shared smooth-scroll store for the Dala-style hero.
 *
 * A dependency-free singleton mirroring `lib/hero/scrollStore.ts`. The global
 * `SmoothScrollProvider` owns the Lenis instance and writes live velocity /
 * scroll position here on every Lenis `scroll` event. The raw-THREE
 * `DalaScene` reads `getScrollVelocity()` imperatively in its RAF loop (no
 * React re-render at 60fps) to drive per-element parallax; DOM consumers can
 * subscribe through `useSmoothScroll`.
 *
 * Native vertical scroll only — Lenis drives the real `window.scrollY`, so
 * `getBoundingClientRect()` on the DOM anchors stays accurate for the
 * DOM-to-WebGL placement.
 */

export interface SmoothScrollSnapshot {
  /** Instantaneous scroll velocity from Lenis (px/frame, signed). */
  velocity: number;
  /** Current smoothed scroll position in px. */
  scrollY: number;
}

const DEFAULT_SNAPSHOT: SmoothScrollSnapshot = { velocity: 0, scrollY: 0 };

let lenis: Lenis | null = null;
let snapshot: SmoothScrollSnapshot = DEFAULT_SNAPSHOT;
const subscribers = new Set<() => void>();

/** Provider hook: register / clear the active Lenis instance. */
export function setLenis(instance: Lenis | null): void {
  lenis = instance;
}

/** The live Lenis instance, or null under reduced-motion / before mount. */
export function getLenis(): Lenis | null {
  return lenis;
}

/**
 * Provider hook: record the latest scroll telemetry. Allocates a new snapshot
 * only on change so `useSyncExternalStore` stays referentially stable.
 */
export function setScrollState(velocity: number, scrollY: number): void {
  if (velocity === snapshot.velocity && scrollY === snapshot.scrollY) return;
  snapshot = { velocity, scrollY };
  for (const cb of subscribers) cb();
}

/** Synchronous reader for the canvas RAF loop (no React involvement). */
export function getScrollVelocity(): number {
  return snapshot.velocity;
}

/** Synchronous reader for the canvas RAF loop (no React involvement). */
export function getScrollY(): number {
  return snapshot.scrollY;
}

function subscribe(cb: () => void): () => void {
  subscribers.add(cb);
  return () => {
    subscribers.delete(cb);
  };
}

function getSnapshot(): SmoothScrollSnapshot {
  return snapshot;
}

function getServerSnapshot(): SmoothScrollSnapshot {
  return DEFAULT_SNAPSHOT;
}

/** React hook for any DOM consumer that wants the live scroll telemetry. */
export function useSmoothScroll(): SmoothScrollSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Test-only reset so unit tests start from a known state. */
export function __resetSmoothScroll(): void {
  lenis = null;
  snapshot = DEFAULT_SNAPSHOT;
  subscribers.clear();
}
