import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FloatingElement } from "@/components/parallax/FloatingElement";

describe("FloatingElement", () => {
  it("renders children", () => {
    render(
      <FloatingElement>
        <span>floater</span>
      </FloatingElement>,
    );
    expect(screen.getByText("floater")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    const { container } = render(
      <FloatingElement className="my-class">x</FloatingElement>,
    );
    expect(container.firstChild).toHaveClass("my-class");
  });

  it("accepts custom strength prop without crashing", () => {
    render(
      <FloatingElement strength={30}>
        <span>strong</span>
      </FloatingElement>,
    );
    expect(screen.getByText("strong")).toBeInTheDocument();
  });
});
