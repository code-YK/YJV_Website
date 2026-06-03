import { describe, it, expect } from "vitest";
import {
  easings,
  durations,
  springs,
  scales,
  distances,
  tilt,
} from "@/lib/motion-tokens";

describe("motion-tokens", () => {
  describe("easings", () => {
    it("exports a 4-tuple smooth cubic-bezier", () => {
      expect(Array.isArray(easings.smooth)).toBe(true);
      expect(easings.smooth).toHaveLength(4);
      easings.smooth.forEach((n) =>
        expect(typeof n).toBe("number"),
      );
    });

    it("exports easeOut, easeIn, and linear", () => {
      expect(easings.easeOut).toHaveLength(4);
      expect(easings.easeIn).toHaveLength(4);
      expect(easings.linear).toBe("linear");
    });
  });

  describe("durations", () => {
    it("are all positive seconds, not milliseconds", () => {
      for (const key of ["fast", "normal", "slow", "crawl"] as const) {
        expect(durations[key]).toBeGreaterThan(0);
        expect(durations[key]).toBeLessThan(10);
      }
    });

    it("orders fast < normal < slow < crawl", () => {
      expect(durations.fast).toBeLessThan(durations.normal);
      expect(durations.normal).toBeLessThan(durations.slow);
      expect(durations.slow).toBeLessThan(durations.crawl);
    });
  });

  describe("springs", () => {
    it("declare type: 'spring' so they're framer-motion compatible", () => {
      for (const key of ["gentle", "snappy", "release", "bouncy"] as const) {
        expect(springs[key].type).toBe("spring");
        expect(springs[key].stiffness).toBeGreaterThan(0);
        expect(springs[key].damping).toBeGreaterThan(0);
      }
    });
  });

  describe("scales", () => {
    it("press < tap < 1 < pop < lift", () => {
      expect(scales.press).toBeLessThan(scales.tap);
      expect(scales.tap).toBeLessThan(1);
      expect(1).toBeLessThan(scales.pop);
      expect(scales.pop).toBeLessThan(scales.lift);
    });
  });

  describe("distances", () => {
    it("are positive pixel offsets in ascending order", () => {
      expect(distances.sm).toBeGreaterThan(0);
      expect(distances.sm).toBeLessThan(distances.md);
      expect(distances.md).toBeLessThan(distances.lg);
      expect(distances.lg).toBeLessThan(distances.xl);
    });
  });

  describe("tilt", () => {
    it("has perspective, rotateX/Y degrees, and translateZ", () => {
      expect(tilt.perspective).toBeGreaterThan(0);
      expect(tilt.rotateXDeg).toBeGreaterThan(0);
      expect(tilt.rotateYDeg).toBeGreaterThan(0);
      expect(tilt.translateZ).toBeGreaterThan(0);
    });
  });
});
