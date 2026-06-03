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

import NotFound from "@/app/not-found";

describe("NotFound (404)", () => {
  it("shows 404 heading and friendly copy", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("404");
    expect(screen.getByText(/wandered off the map/i)).toBeInTheDocument();
  });

  it("renders 'Back to home' linking to /", () => {
    render(<NotFound />);
    const home = screen.getByRole("link", { name: /Back to home/i });
    expect(home).toHaveAttribute("href", "/");
  });

  it("renders 'Book a call' linking to /contact", () => {
    render(<NotFound />);
    const cta = screen.getByRole("link", { name: /^Book a call$/i });
    expect(cta).toHaveAttribute("href", "/contact");
  });

  it("renders 4 quick-link tiles", () => {
    render(<NotFound />);
    const quickLinks = [
      ["Platform", "/platform"],
      ["Case Studies", "/case-studies"],
      ["Industries", "/industries"],
      ["About", "/about"],
    ] as const;
    for (const [label, href] of quickLinks) {
      const cell = screen.getByText(label).closest("a");
      expect(cell).toHaveAttribute("href", href);
    }
  });
});
