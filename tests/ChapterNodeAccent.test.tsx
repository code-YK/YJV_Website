import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChapterNodeAccent } from "@/components/home/ChapterNodeAccent";

describe("ChapterNodeAccent", () => {
  it("renders the zero-padded node number", () => {
    render(<ChapterNodeAccent index={3} label="Excellence" />);
    expect(screen.getByText(/Node 03/)).toBeInTheDocument();
  });

  it("renders the supplied label", () => {
    render(<ChapterNodeAccent index={1} label="Future" />);
    expect(screen.getByText("Future")).toBeInTheDocument();
  });

  it("exposes a descriptive aria-label", () => {
    const { container } = render(
      <ChapterNodeAccent index={6} label="Legacy" />,
    );
    expect(container.firstChild).toHaveAttribute(
      "aria-label",
      "Node 06: Legacy",
    );
  });
});
