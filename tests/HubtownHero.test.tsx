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

import { HubtownHero } from "@/components/hubtown/HubtownHero";

describe("HubtownHero (inner-page hero)", () => {
  const props = {
    eyebrow: "EYEBROW",
    title: "Built for the industries that pay for results.",
    body: "Body copy",
    cta: { label: "Primary", href: "/primary" },
    secondary: { label: "Secondary", href: "/secondary" },
  };

  it("renders eyebrow, title, body", () => {
    render(<HubtownHero {...props} />);
    expect(screen.getByText("EYEBROW")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /pay for results/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Body copy")).toBeInTheDocument();
  });

  it("renders primary CTA with correct href", () => {
    render(<HubtownHero {...props} />);
    expect(screen.getByRole("link", { name: /Primary/i })).toHaveAttribute(
      "href",
      "/primary",
    );
  });

  it("renders secondary CTA with correct href", () => {
    render(<HubtownHero {...props} />);
    expect(screen.getByRole("link", { name: /Secondary/i })).toHaveAttribute(
      "href",
      "/secondary",
    );
  });

  it("omits CTAs when not provided", () => {
    render(
      <HubtownHero
        eyebrow="E"
        title="T"
        cta={undefined}
        secondary={undefined}
      />,
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("sets section id to chapterId default 'future' if unspecified", () => {
    const { container } = render(<HubtownHero eyebrow="E" title="T" />);
    expect(container.querySelector("section#future")).toBeInTheDocument();
  });

  it("respects custom chapterId", () => {
    const { container } = render(
      <HubtownHero eyebrow="E" title="T" chapterId="custom-id" />,
    );
    expect(container.querySelector("section#custom-id")).toBeInTheDocument();
  });
});
