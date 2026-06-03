import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode } & Record<string, unknown>) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

import { ThemeProvider } from "@/components/yj/ThemeProvider";
import { ThemeToggle } from "@/components/yj/ThemeToggle";

beforeEach(() => {
  document.documentElement.classList.remove("light");
  window.localStorage.clear();
});

function withProvider(node: React.ReactNode) {
  return <ThemeProvider>{node}</ThemeProvider>;
}

describe("ThemeToggle", () => {
  it("renders a button with an aria-label that names the target theme", () => {
    render(withProvider(<ThemeToggle />));
    expect(
      screen.getByRole("button", { name: /Switch to (dark|light) mode/ }),
    ).toBeInTheDocument();
  });

  it("toggles the html.light class on click", async () => {
    const user = userEvent.setup();
    render(withProvider(<ThemeToggle />));
    const btn = screen.getByRole("button");
    expect(document.documentElement.classList.contains("light")).toBe(false);
    await user.click(btn);
    expect(document.documentElement.classList.contains("light")).toBe(true);
    await user.click(btn);
    expect(document.documentElement.classList.contains("light")).toBe(false);
  });

  it("updates aria-label after toggle", async () => {
    const user = userEvent.setup();
    render(withProvider(<ThemeToggle />));
    const btn = screen.getByRole("button");
    const initial = btn.getAttribute("aria-label");
    await user.click(btn);
    const next = btn.getAttribute("aria-label");
    expect(next).not.toBe(initial);
  });

  it("persists theme choice to localStorage", async () => {
    const user = userEvent.setup();
    render(withProvider(<ThemeToggle />));
    await user.click(screen.getByRole("button"));
    expect(window.localStorage.getItem("yj-theme")).toBe("light");
  });
});
