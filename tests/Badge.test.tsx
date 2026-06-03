import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Contact</Badge>);
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("accepts and applies a className", () => {
    const { container } = render(
      <Badge className="custom-class">Hi</Badge>,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
