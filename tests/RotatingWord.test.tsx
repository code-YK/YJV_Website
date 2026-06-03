import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RotatingWord } from "@/components/hubtown/RotatingWord";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("RotatingWord", () => {
  it("renders the first word initially", () => {
    render(<RotatingWord words={["alpha", "bravo", "charlie"]} />);
    expect(screen.getAllByText("alpha").length).toBeGreaterThan(0);
  });

  it("advances to the next word after intervalMs", () => {
    render(<RotatingWord words={["alpha", "bravo"]} intervalMs={1000} />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getAllByText("bravo").length).toBeGreaterThan(0);
  });

  it("cycles back to the first word", () => {
    render(<RotatingWord words={["alpha", "bravo"]} intervalMs={1000} />);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getAllByText("alpha").length).toBeGreaterThan(0);
  });

  it("pauses on mouseEnter and resumes on mouseLeave", async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    vi.useFakeTimers();
    render(<RotatingWord words={["alpha", "bravo"]} intervalMs={500} />);
    const wrapper = screen.getAllByText("alpha")[0].closest("span")
      ?.parentElement;
    expect(wrapper).toBeTruthy();
    vi.useRealTimers();
    await user.hover(wrapper!);
    vi.useFakeTimers();
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    // Paused — still on alpha
    expect(screen.getAllByText("alpha").length).toBeGreaterThan(0);
  });

  it("exposes an aria-label naming all words", () => {
    render(<RotatingWord words={["alpha", "bravo"]} />);
    const wrapper = screen.getByLabelText(/Rotating: alpha, bravo/);
    expect(wrapper).toBeInTheDocument();
  });
});
