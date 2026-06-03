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

import { HubtownFooter } from "@/components/hubtown/HubtownFooter";

const SITE_LINKS = [
  ["Lead Automation", "/solutions/lead-automation"],
  ["Chatbot Engine", "/platform/chatbot"],
  ["About Us", "/about"],
  ["Case Studies", "/case-studies"],
  ["Industries", "/industries"],
  ["Contact", "/contact"],
] as const;

describe("HubtownFooter", () => {
  it("renders the YJ VENTURES wordmark linking to /", () => {
    render(<HubtownFooter />);
    const wm = screen.getByRole("link", { name: /YJ VENTURES/i });
    expect(wm).toHaveAttribute("href", "/");
  });

  it("renders every site link with correct href", () => {
    render(<HubtownFooter />);
    for (const [label, href] of SITE_LINKS) {
      const link = screen.getByRole("link", { name: new RegExp(`^${label}$`, "i") });
      expect(link).toHaveAttribute("href", href);
    }
  });

  it("renders the email link with mailto: yjventures.in", () => {
    render(<HubtownFooter />);
    const email = screen.getByRole("link", { name: /info@yjventures\.in/i });
    expect(email).toHaveAttribute("href", "mailto:info@yjventures.in");
  });

  it("renders the phone reach link", () => {
    render(<HubtownFooter />);
    const link = screen.getByRole("link", { name: /\+91 6352998995/i });
    expect(link).toHaveAttribute("href", "tel:+916352998995");
  });

  it("renders Privacy, Terms, and Data Deletion legal links", () => {
    render(<HubtownFooter />);
    expect(
      screen.getByRole("link", { name: /Privacy Policy/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Terms of Service/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Data Deletion/i }),
    ).toBeInTheDocument();
  });

  it("renders the year in the copyright", () => {
    render(<HubtownFooter />);
    expect(
      screen.getByText(new RegExp(String(new Date().getFullYear()))),
    ).toBeInTheDocument();
  });
});
