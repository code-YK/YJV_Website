import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HubtownStats } from "@/components/hubtown/HubtownStats";

describe("HubtownStats", () => {
  it("renders all four stat tile labels", () => {
    render(<HubtownStats />);
    expect(screen.getByText("Projects shipped")).toBeInTheDocument();
    expect(screen.getByText("Countries served")).toBeInTheDocument();
    expect(screen.getByText("Median time to prod")).toBeInTheDocument();
    expect(screen.getByText("Senior engineers")).toBeInTheDocument();
  });

  it("renders four tile cells", () => {
    const { container } = render(<HubtownStats />);
    expect(container.querySelectorAll(".hub-eyebrow").length).toBe(4);
  });
});
