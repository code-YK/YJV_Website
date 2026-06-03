import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GradientText } from "@/components/ui/GradientText";

describe("GradientText", () => {
  it("renders children", () => {
    render(<GradientText>hello</GradientText>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    const { container } = render(
      <GradientText className="extra">x</GradientText>,
    );
    expect(container.firstChild).toHaveClass("extra");
  });
});
