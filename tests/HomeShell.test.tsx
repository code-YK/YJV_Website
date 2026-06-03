import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HomeShell } from "@/components/home/HomeShell";

describe("HomeShell", () => {
  it("renders its children", () => {
    render(
      <HomeShell>
        <div data-testid="child">hello</div>
      </HomeShell>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("wraps children with a relative-positioned z-10 container", () => {
    const { container } = render(
      <HomeShell>
        <span>x</span>
      </HomeShell>,
    );
    // Outer wrapper has class "relative"; inner wrapper around children
    // has classes "relative z-10".
    const inner = container.querySelector(".relative.z-10");
    expect(inner).not.toBeNull();
  });

  it("does not crash when given multiple data-node-index sections", () => {
    render(
      <HomeShell>
        <section data-node-index={0}>one</section>
        <section data-node-index={1}>two</section>
        <section data-node-index={2}>three</section>
      </HomeShell>,
    );
    expect(screen.getByText("one")).toBeInTheDocument();
    expect(screen.getByText("two")).toBeInTheDocument();
    expect(screen.getByText("three")).toBeInTheDocument();
  });
});
