/**
 * Dependency-free GPU-tier heuristic used to scale the orb particle count so
 * the 60fps budget holds on low-end devices. No `detect-gpu` dependency — a
 * coarse signal from hardware concurrency, device memory, and the unmasked
 * renderer string is enough to pick a particle count.
 */
export type GpuTier = "low" | "mid" | "high";

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

function readUnmaskedRenderer(): string {
  if (typeof document === "undefined") return "";
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return "";
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    if (!ext) return "";
    const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
    return typeof renderer === "string" ? renderer.toLowerCase() : "";
  } catch {
    return "";
  }
}

export function detectGpuTier(): GpuTier {
  if (typeof navigator === "undefined") return "mid";

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as NavigatorWithMemory).deviceMemory ?? 4;
  const renderer = readUnmaskedRenderer();

  const isMobileGpu =
    /adreno|mali|powervr|apple gpu|apple a\d/.test(renderer) ||
    /Mobi|Android/i.test(navigator.userAgent ?? "");
  const isStrongDesktopGpu = /nvidia|geforce|rtx|radeon|apple m\d/.test(
    renderer,
  );

  if (isStrongDesktopGpu && cores >= 8 && memory >= 8) return "high";
  if (isMobileGpu || cores <= 4 || memory <= 4) return "low";
  return "mid";
}

/** Orb particle count per tier — keeps the GLSL render loop within 60fps. */
export function particleCountForTier(tier: GpuTier): number {
  switch (tier) {
    case "high":
      return 8000;
    case "low":
      return 1500;
    default:
      return 4000;
  }
}
