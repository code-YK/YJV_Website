import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "@/components/ui/SectionHeading";

describe("SectionHeading", () => {
  it("renders title as an h2", () => {
    render(<SectionHeading title="Our promise" />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Our promise" }),
    ).toBeInTheDocument();
  });

  it("renders eyebrow inside a Badge when provided", () => {
    render(<SectionHeading eyebrow="ABOUT" title="x" />);
    expect(screen.getByText("ABOUT")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<SectionHeading title="x" subtitle="Subline copy." />);
    expect(screen.getByText("Subline copy.")).toBeInTheDocument();
  });

  it("omits eyebrow and subtitle when not provided", () => {
    render(<SectionHeading title="only-title" />);
    expect(screen.queryByText("ABOUT")).not.toBeInTheDocument();
  });
});
