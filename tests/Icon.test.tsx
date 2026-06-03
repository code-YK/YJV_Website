import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Icon } from "@/components/ui/Icon";

describe("Icon", () => {
  it("renders an svg for a known IconName", () => {
    const { container } = render(<Icon name="Rocket" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the svg with the supplied className", () => {
    const { container } = render(
      <Icon name="Database" className="text-blue-500 h-4 w-4" />,
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("text-blue-500");
    expect(svg).toHaveClass("h-4");
    expect(svg).toHaveClass("w-4");
  });

  it("renders the svg as aria-hidden", () => {
    const { container } = render(<Icon name="Bot" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden");
  });
});
