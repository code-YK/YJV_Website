import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const pathname = { current: "/" };
vi.mock("next/navigation", () => ({
  usePathname: () => pathname.current,
}));

import { RouteAnnouncer } from "@/components/yj/RouteAnnouncer";

describe("RouteAnnouncer", () => {
  it("renders a polite, sr-only status region", () => {
    pathname.current = "/";
    render(<RouteAnnouncer />);
    const status = screen.getByRole("status");
    expect(status).toHaveClass("sr-only");
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("announces 'Navigated to Home' on root", () => {
    pathname.current = "/";
    render(<RouteAnnouncer />);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Navigated to Home",
    );
  });

  it("formats segment-based pathnames into Title Case", () => {
    pathname.current = "/hire-developer";
    render(<RouteAnnouncer />);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Navigated to Hire Developer",
    );
  });

  it("announces nested pathnames using the last segment", () => {
    pathname.current = "/services/discovery";
    render(<RouteAnnouncer />);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Navigated to Discovery",
    );
  });
});
