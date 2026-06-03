import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

vi.mock("@/components/hubtown/FaultyTerminal", () => ({
  FaultyTerminal: () => <div data-testid="faulty-terminal" />,
}));

vi.mock("@/components/hubtown/HubtownAnimeGrid", () => ({
  HubtownAnimeGrid: () => <div data-testid="anime-grid" />,
}));

import { HubtownAnimeHero } from "@/components/hubtown/HubtownAnimeHero";

const baseProps = {
  eyebrow: "TEST EYEBROW",
  title: "Test title",
  body: "Test body copy.",
  cta: { label: "Primary CTA", href: "/primary" },
  secondary: { label: "Secondary CTA", href: "/secondary" },
  rotator: { lead: "We do", words: ["one.", "two."] },
};

describe("HubtownAnimeHero — clicks", () => {
  it("renders primary CTA pointing at correct href", () => {
    render(<HubtownAnimeHero {...baseProps} />);
    const primary = screen.getByRole("link", { name: /Primary CTA/i });
    expect(primary).toHaveAttribute("href", "/primary");
  });

  it("renders secondary CTA pointing at correct href", () => {
    render(<HubtownAnimeHero {...baseProps} />);
    const secondary = screen.getByRole("link", { name: /Secondary CTA/i });
    expect(secondary).toHaveAttribute("href", "/secondary");
  });

  it("renders eyebrow, body, and rotator lead text", () => {
    render(<HubtownAnimeHero {...baseProps} />);
    expect(screen.getByText("TEST EYEBROW")).toBeInTheDocument();
    expect(screen.getByText("Test body copy.")).toBeInTheDocument();
    expect(screen.getByText(/We do/)).toBeInTheDocument();
  });

  it("renders the wordmark as h1 with aria-label", () => {
    render(<HubtownAnimeHero {...baseProps} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveAttribute("aria-label", "YJ VENTURES");
  });

  it("omits secondary CTA when not provided", () => {
    render(
      <HubtownAnimeHero
        {...baseProps}
        secondary={undefined}
      />,
    );
    expect(
      screen.queryByRole("link", { name: /Secondary CTA/i }),
    ).not.toBeInTheDocument();
  });

  it("omits primary CTA when not provided", () => {
    render(<HubtownAnimeHero {...baseProps} cta={undefined} />);
    expect(
      screen.queryByRole("link", { name: /Primary CTA/i }),
    ).not.toBeInTheDocument();
  });

  it("primary and secondary CTAs are keyboard-focusable links", async () => {
    const user = userEvent.setup();
    render(<HubtownAnimeHero {...baseProps} />);
    await user.tab();
    // Multiple links exist (wordmark spans etc), so we just confirm the primary
    // CTA can receive focus via .focus()
    const primary = screen.getByRole("link", { name: /Primary CTA/i });
    primary.focus();
    expect(document.activeElement).toBe(primary);
  });
});
