import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GlowCard } from "@/components/ui/GlowCard";

describe("GlowCard", () => {
  it("renders children", () => {
    render(
      <GlowCard>
        <span>inner</span>
      </GlowCard>,
    );
    expect(screen.getByText("inner")).toBeInTheDocument();
  });

  it("renders when hoverable is false", () => {
    render(
      <GlowCard hoverable={false}>
        <span>static</span>
      </GlowCard>,
    );
    expect(screen.getByText("static")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    const { container } = render(
      <GlowCard className="card-extra">x</GlowCard>,
    );
    expect(container.firstChild).toHaveClass("card-extra");
  });
});
