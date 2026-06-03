/**
 * Early WebGL + motion-preference detection for the hero.
 *
 * Returns false (degrade to the SVG fallback) when WebGL is unavailable, when
 * only a software/major-performance-caveat context is offered, or when the
 * user prefers reduced motion. Always client-only; guards `window`.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Lenient check: can a WebGL context be created at all (software GL allowed)?
 * Used to gate decorative background canvases so they never throw on machines
 * where WebGL is disabled/sandboxed.
 */
export function webGLAvailable(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return gl != null;
  } catch {
    return false;
  }
}

export function supportsWebGL(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }
  if (prefersReducedMotion()) return false;

  try {
    const canvas = document.createElement("canvas");
    const attrs: WebGLContextAttributes = {
      failIfMajorPerformanceCaveat: true,
    };
    const gl =
      canvas.getContext("webgl2", attrs) ||
      canvas.getContext("webgl", attrs) ||
      canvas.getContext("experimental-webgl", attrs);
    return gl != null;
  } catch {
    return false;
  }
}
