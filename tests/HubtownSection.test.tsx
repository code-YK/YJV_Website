import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  } & Record<string, unknown>) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

import { HubtownSection } from "@/components/hubtown/HubtownSection";

describe("HubtownSection", () => {
  it("renders eyebrow, title, body, and CTA", () => {
    render(
      <HubtownSection
        eyebrow="01 — TEST"
        title="A test title."
        body="Body line one.\n\nBody line two."
        cta={{ label: "Read more", href: "/read" }}
      />,
    );
    expect(screen.getByText("01 — TEST")).toBeInTheDocument();
    expect(screen.getByText(/A test title/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Read more/i })).toHaveAttribute(
      "href",
      "/read",
    );
  });

  it("splits body on double newlines into multiple paragraphs", () => {
    render(
      <HubtownSection
        eyebrow="E"
        title="T"
        body={"First para.\n\nSecond para.\n\nThird para."}
      />,
    );
    expect(screen.getByText("First para.")).toBeInTheDocument();
    expect(screen.getByText("Second para.")).toBeInTheDocument();
    expect(screen.getByText("Third para.")).toBeInTheDocument();
  });

  it("renders no CTA when cta prop is omitted", () => {
    render(<HubtownSection eyebrow="E" title="T" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders the image in split-image variant", () => {
    render(
      <HubtownSection
        eyebrow="E"
        title="T"
        variant="split-image"
        image={{ src: "/x.png", alt: "Alt copy" }}
      />,
    );
    expect(screen.getByAltText("Alt copy")).toHaveAttribute("src", "/x.png");
  });

  it("renders children below the heading block", () => {
    render(
      <HubtownSection eyebrow="E" title="T">
        <div data-testid="child">child content</div>
      </HubtownSection>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("sets the section id when provided", () => {
    const { container } = render(
      <HubtownSection id="future" eyebrow="E" title="T" />,
    );
    expect(container.querySelector("section#future")).toBeInTheDocument();
  });
});
