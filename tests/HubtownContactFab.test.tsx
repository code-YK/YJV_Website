import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const pathname = { current: "/" };
vi.mock("next/navigation", () => ({
  usePathname: () => pathname.current,
}));

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

import { HubtownContactFab } from "@/components/hubtown/HubtownContactFab";

describe("HubtownContactFab", () => {
  it("renders a link to /contact?source=fab with Book a call label", () => {
    pathname.current = "/";
    render(<HubtownContactFab />);
    const link = screen.getByRole("link", { name: /Book a call/i });
    expect(link).toHaveAttribute("href", "/contact?source=fab");
  });

  it("renders nothing on /contact", () => {
    pathname.current = "/contact";
    render(<HubtownContactFab />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders nothing on nested /contact/* routes", () => {
    pathname.current = "/contact/thanks";
    render(<HubtownContactFab />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders on /solutions, /services, /industries, /hire-developer", () => {
    for (const p of ["/solutions", "/services", "/industries", "/hire-developer"]) {
      pathname.current = p;
      const { unmount } = render(<HubtownContactFab />);
      expect(screen.getByRole("link")).toBeInTheDocument();
      unmount();
    }
  });
});
