import { vi } from "vitest";

export class Renderer {
  gl = {
    canvas: typeof document !== "undefined" ? document.createElement("canvas") : null,
    getExtension: vi.fn(),
  };
  setSize = vi.fn();
  render = vi.fn();
}

export class Program {
  uniforms: Record<string, { value: unknown }> = {};
}

export class Mesh {
  setParent = vi.fn();
}

export class Color {
  constructor(_: string) {}
}

export class Triangle {}
