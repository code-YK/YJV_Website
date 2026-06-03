import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  LinkedinIcon,
  TwitterIcon,
  GithubIcon,
} from "@/components/ui/SocialIcons";

describe("SocialIcons", () => {
  it("LinkedinIcon renders an svg", () => {
    const { container } = render(<LinkedinIcon className="size-4" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("size-4");
    expect(svg).toHaveAttribute("aria-hidden");
  });

  it("TwitterIcon renders an svg", () => {
    const { container } = render(<TwitterIcon />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("GithubIcon renders an svg", () => {
    const { container } = render(<GithubIcon />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
