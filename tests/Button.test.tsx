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

import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders a <button> when no href is provided", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /Click me/i }),
    ).toBeInTheDocument();
  });

  it("fires onClick when clicked as a button", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Tap</Button>);
    await user.click(screen.getByRole("button", { name: /Tap/i }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders a Link when href is provided", () => {
    render(<Button href="/contact">Talk</Button>);
    const link = screen.getByRole("link", { name: /Talk/i });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("applies the outline variant classes", () => {
    render(<Button variant="outline">Out</Button>);
    const btn = screen.getByRole("button", { name: /Out/i });
    expect(btn.className).toMatch(/border/);
  });

  it("merges a custom className", () => {
    render(<Button className="my-extra">x</Button>);
    expect(screen.getByRole("button").className).toMatch(/my-extra/);
  });
});
