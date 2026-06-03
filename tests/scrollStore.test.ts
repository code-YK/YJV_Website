import { describe, it, expect, beforeEach } from "vitest";
import {
  HeroState,
  setHeroProgress,
  getHeroSnapshot,
  subscribeHero,
  __resetHeroStore,
} from "@/lib/hero/scrollStore";

describe("hero scrollStore", () => {
  beforeEach(() => {
    __resetHeroStore();
  });

  it("starts in DeepCore at progress 0", () => {
    const snap = getHeroSnapshot();
    expect(snap.progress).toBe(0);
    expect(snap.state).toBe(HeroState.DeepCore);
    expect(snap.stateProgress).toBe(0);
  });

  it("maps progress to the DeepCore -> Reveal -> Ledger -> Detachment sequence", () => {
    setHeroProgress(0);
    expect(getHeroSnapshot().state).toBe(HeroState.DeepCore);

    setHeroProgress(0.07);
    expect(getHeroSnapshot().state).toBe(HeroState.DeepCore);

    setHeroProgress(0.08);
    expect(getHeroSnapshot().state).toBe(HeroState.Reveal);

    setHeroProgress(0.34);
    expect(getHeroSnapshot().state).toBe(HeroState.Reveal);

    setHeroProgress(0.35);
    expect(getHeroSnapshot().state).toBe(HeroState.Ledger);

    setHeroProgress(0.69);
    expect(getHeroSnapshot().state).toBe(HeroState.Ledger);

    setHeroProgress(0.7);
    expect(getHeroSnapshot().state).toBe(HeroState.Detachment);

    setHeroProgress(1);
    expect(getHeroSnapshot().state).toBe(HeroState.Detachment);
  });

  it("computes local stateProgress within each state", () => {
    setHeroProgress(0.04); // halfway through DeepCore (0..0.08)
    expect(getHeroSnapshot().stateProgress).toBeCloseTo(0.5, 5);

    setHeroProgress(0.215); // halfway through Reveal (0.08..0.35)
    expect(getHeroSnapshot().stateProgress).toBeCloseTo(0.5, 5);

    setHeroProgress(0.525); // halfway through Ledger (0.35..0.70)
    expect(getHeroSnapshot().stateProgress).toBeCloseTo(0.5, 5);

    setHeroProgress(0.85); // halfway through Detachment (0.70..1.0)
    expect(getHeroSnapshot().stateProgress).toBeCloseTo(0.5, 5);
  });

  it("clamps progress to [0,1]", () => {
    setHeroProgress(-0.5);
    expect(getHeroSnapshot().progress).toBe(0);
    setHeroProgress(2);
    expect(getHeroSnapshot().progress).toBe(1);
  });

  it("notifies subscribers only when the snapshot changes", () => {
    let calls = 0;
    const unsub = subscribeHero(() => {
      calls += 1;
    });

    setHeroProgress(0.5);
    expect(calls).toBe(1);

    // identical write -> no notification, no new object
    const before = getHeroSnapshot();
    setHeroProgress(0.5);
    expect(calls).toBe(1);
    expect(getHeroSnapshot()).toBe(before);

    setHeroProgress(0.6);
    expect(calls).toBe(2);

    unsub();
    setHeroProgress(0.7);
    expect(calls).toBe(2);
  });

  it("returns a referentially-stable snapshot between identical writes", () => {
    setHeroProgress(0.42);
    const a = getHeroSnapshot();
    setHeroProgress(0.42);
    const b = getHeroSnapshot();
    expect(a).toBe(b);
  });
});
