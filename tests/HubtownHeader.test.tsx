import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const pathname = { current: "/" };
vi.mock("next/navigation", () => ({
  usePathname: () => pathname.current,
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
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

import { HubtownHeader } from "@/components/hubtown/HubtownHeader";
import { solutions } from "@/lib/content/solutions";
import { services } from "@/lib/content/services";
import { industries } from "@/lib/content/industries";
import { roles } from "@/lib/content/roles";

beforeEach(() => {
  pathname.current = "/";
});

describe("HubtownHeader — primary surface", () => {
  it("renders the wordmark link to home", () => {
    render(<HubtownHeader />);
    const logos = screen.getAllByRole("link", { name: /YJ VENTURES/i });
    expect(logos.length).toBeGreaterThan(0);
    expect(logos[0]).toHaveAttribute("href", "/");
  });

  it("renders all 5 nav items as links", () => {
    render(<HubtownHeader />);
    expect(screen.getAllByRole("link", { name: /^Solutions$/i })[0]).toHaveAttribute(
      "href",
      "/solutions",
    );
    expect(screen.getAllByRole("link", { name: /^Services$/i })[0]).toHaveAttribute(
      "href",
      "/services",
    );
    expect(screen.getAllByRole("link", { name: /^Industries$/i })[0]).toHaveAttribute(
      "href",
      "/industries",
    );
    expect(
      screen.getAllByRole("link", { name: /^Hire Developer$/i })[0],
    ).toHaveAttribute("href", "/hire-developer");
    expect(screen.getAllByRole("link", { name: /^Contact$/i })[0]).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("renders the Book a call CTA", () => {
    render(<HubtownHeader />);
    const cta = screen.getByRole("link", { name: /Book a call/i });
    expect(cta).toHaveAttribute("href", "/contact");
  });

  it("opens the mobile menu when Menu button is clicked", async () => {
    const user = userEvent.setup();
    render(<HubtownHeader />);
    const btn = screen.getByRole("button", { name: /Open menu/i });
    await user.click(btn);
    expect(screen.getByRole("dialog", { name: /Site navigation/i })).toBeInTheDocument();
  });

  it("marks Solutions trigger with aria-haspopup and aria-expanded false initially", () => {
    render(<HubtownHeader />);
    const trigger = screen.getAllByRole("link", { name: /^Solutions$/i })[0];
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});

describe("HubtownHeader — dropdown keyboard & hover", () => {
  it("opens the Solutions dropdown on hover", async () => {
    const user = userEvent.setup();
    render(<HubtownHeader />);
    const trigger = screen.getAllByRole("link", { name: /^Solutions$/i })[0];
    await user.hover(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    const panel = document.getElementById("nav-panel-0");
    expect(panel).toBeTruthy();
    for (const s of solutions) {
      expect(within(panel!).getByRole("menuitem", { name: s.name })).toHaveAttribute(
        "href",
        `/solutions#${s.slug}`,
      );
    }
    expect(within(panel!).getByRole("menuitem", { name: /All Solutions →/i })).toHaveAttribute(
      "href",
      "/solutions",
    );
  });

  it("opens the Services dropdown with all service children", async () => {
    const user = userEvent.setup();
    render(<HubtownHeader />);
    const trigger = screen.getAllByRole("link", { name: /^Services$/i })[0];
    await user.hover(trigger);
    const panel = document.getElementById("nav-panel-1");
    for (const s of services) {
      expect(within(panel!).getByRole("menuitem", { name: s.name })).toHaveAttribute(
        "href",
        `/services/${s.slug}`,
      );
    }
  });

  it("opens the Industries dropdown with all industry children", async () => {
    const user = userEvent.setup();
    render(<HubtownHeader />);
    const trigger = screen.getAllByRole("link", { name: /^Industries$/i })[0];
    await user.hover(trigger);
    const panel = document.getElementById("nav-panel-2");
    for (const i of industries) {
      expect(within(panel!).getByRole("menuitem", { name: i.name })).toHaveAttribute(
        "href",
        `/industries/${i.slug}`,
      );
    }
  });

  it("opens the Hire Developer dropdown with all role children", async () => {
    const user = userEvent.setup();
    render(<HubtownHeader />);
    const trigger = screen.getAllByRole("link", {
      name: /^Hire Developer$/i,
    })[0];
    await user.hover(trigger);
    const panel = document.getElementById("nav-panel-3");
    for (const r of roles) {
      expect(within(panel!).getByRole("menuitem", { name: r.name })).toHaveAttribute(
        "href",
        `/hire-developer#${r.slug}`,
      );
    }
  });

  it("closes the dropdown on Escape", async () => {
    const user = userEvent.setup();
    render(<HubtownHeader />);
    const trigger = screen.getAllByRole("link", { name: /^Solutions$/i })[0];
    await user.hover(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("Contact has no dropdown (no aria-haspopup)", () => {
    render(<HubtownHeader />);
    const link = screen.getAllByRole("link", { name: /^Contact$/i })[0];
    expect(link).not.toHaveAttribute("aria-haspopup");
  });
});

describe("HubtownHeader — active route", () => {
  it("marks Solutions as active when on /solutions", () => {
    pathname.current = "/solutions";
    render(<HubtownHeader />);
    const link = screen.getAllByRole("link", { name: /^Solutions$/i })[0];
    expect(link.className).toMatch(/text-hub-accent/);
  });

  it("does not mark Solutions as active on /services", () => {
    pathname.current = "/services";
    render(<HubtownHeader />);
    const link = screen.getAllByRole("link", { name: /^Solutions$/i })[0];
    expect(link.className).not.toMatch(/text-hub-accent/);
  });
});
