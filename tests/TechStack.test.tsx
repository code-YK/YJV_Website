import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TechStack } from "@/components/shared/TechStack";
import { techStack } from "@/lib/content/tech-stack";

describe("TechStack", () => {
  it("renders every tech item once in grid variant", () => {
    render(<TechStack variant="grid" />);
    for (const item of techStack) {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    }
  });

  it("duplicates items for the seamless marquee variant", () => {
    render(<TechStack variant="marquee" />);
    for (const item of techStack) {
      expect(screen.getAllByText(item.name)).toHaveLength(2);
    }
  });

  it("defaults to marquee variant when none specified", () => {
    render(<TechStack />);
    expect(screen.getAllByText(techStack[0].name)).toHaveLength(2);
  });
});
