import { vi } from "vitest";

export const animate = vi.fn(() => ({
  pause: vi.fn(),
  play: vi.fn(),
  restart: vi.fn(),
}));

export const stagger = vi.fn((value: number) => value);

export const createTimeline = vi.fn(() => {
  const tl = {
    add: vi.fn(() => tl),
    play: vi.fn(),
    pause: vi.fn(),
  };
  return tl;
});

export const scrambleText = vi.fn((opts: unknown) => opts);

export const text = {
  split: vi.fn((el: unknown) => ({
    chars: [] as unknown[],
    words: [] as unknown[],
    lines: [] as unknown[],
    el,
  })),
};
