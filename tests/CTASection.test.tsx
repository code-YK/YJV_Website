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

import { CTASection } from "@/components/layout/CTASection";

describe("CTASection", () => {
  const baseProps = {
    title: "Ready to ship?",
    primary: { label: "Book a call", href: "/contact" },
  };

  it("renders title and primary CTA with correct href", () => {
    render(<CTASection {...baseProps} />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Ready to ship/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Book a call/i }),
    ).toHaveAttribute("href", "/contact");
  });

  it("renders secondary CTA when provided", () => {
    render(
      <CTASection
        {...baseProps}
        secondary={{ label: "See work", href: "/solutions" }}
      />,
    );
    expect(
      screen.getByRole("link", { name: /See work/i }),
    ).toHaveAttribute("href", "/solutions");
  });

  it("omits secondary CTA when not provided", () => {
    render(<CTASection {...baseProps} />);
    expect(screen.queryByRole("link", { name: /See work/i })).not.toBeInTheDocument();
  });

  it("renders eyebrow when provided", () => {
    render(<CTASection {...baseProps} eyebrow="NEXT STEPS" />);
    expect(screen.getByText("NEXT STEPS")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<CTASection {...baseProps} subtitle="One call, no slides." />);
    expect(screen.getByText("One call, no slides.")).toBeInTheDocument();
  });
});
