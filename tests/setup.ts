import "@testing-library/jest-dom/vitest";
import React from "react";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

vi.mock("framer-motion", async () => import("./mocks/framer-motion"));
vi.mock("animejs", async () => import("./mocks/animejs"));
vi.mock("ogl", async () => import("./mocks/ogl"));

vi.mock("next/font/google", () => {
  const stub = () => ({
    variable: "--font-stub",
    className: "font-stub",
    style: { fontFamily: "stub" },
  });
  return {
    Space_Grotesk: stub,
    Inter: stub,
    Space_Mono: stub,
  };
});

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { src, alt, priority: _p, fill: _f, sizes: _s, ...rest } = props as {
      src?: string;
      alt?: string;
      priority?: boolean;
      fill?: boolean;
      sizes?: string;
    } & Record<string, unknown>;
    return React.createElement("img", { src, alt, ...rest });
  },
}));

vi.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: { children?: React.ReactNode }) =>
    React.createElement("div", { "data-stub": "r3f-canvas" }, children),
  useFrame: () => {},
  useThree: () => ({ camera: { position: { lerp: () => {} }, lookAt: () => {} } }),
}));

vi.mock("@react-three/drei", () => ({
  Line: () => React.createElement("div", { "data-stub": "drei-line" }),
}));

vi.mock("three", () => {
  class Vector3 {
    x = 0;
    y = 0;
    z = 0;
    constructor(x = 0, y = 0, z = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
    set(x: number, y: number, z: number) {
      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    }
    clone() {
      return new Vector3(this.x, this.y, this.z);
    }
    lerp(_v: Vector3, _a: number) {
      return this;
    }
    add(_v: Vector3) {
      return this;
    }
  }
  class CubicBezierCurve3 {
    constructor(public a: Vector3, public b: Vector3, public c: Vector3, public d: Vector3) {}
    getPoints(_n: number) {
      return [this.a, this.d];
    }
  }
  return {
    Vector3,
    CubicBezierCurve3,
    MathUtils: { lerp: (a: number, b: number, t: number) => a + (b - a) * t },
    Mesh: class {},
    Points: class {},
  };
});

// HomeScene3D pulls in r3f Canvas at module load and renders a heavy
// scene — replace it with a stub for any test that imports the home
// route or HomeShell.
vi.mock("@/components/home/HomeScene3D", () => ({
  HomeScene3D: () => React.createElement("div", { "data-stub": "home-scene-3d" }),
}));

if (typeof window !== "undefined") {
  if (!window.matchMedia) {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    });
  }

  if (!window.ResizeObserver) {
    window.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }

  if (!window.IntersectionObserver) {
    // @ts-expect-error minimal mock
    window.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    };
  }

  if (!window.scrollTo) {
    window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
  }

  if (!HTMLCanvasElement.prototype.getContext) {
    HTMLCanvasElement.prototype.getContext = vi.fn(() => null) as never;
  }
}
