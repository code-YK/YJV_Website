import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    onClick,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent) => void;
  } & Record<string, unknown>) => (
    <a href={href} onClick={onClick} {...rest}>
      {children}
    </a>
  ),
}));

import { HubtownMenuOverlay } from "@/components/hubtown/HubtownMenuOverlay";

const ROUTES = [
  ["Solutions", "/solutions"],
  ["Services", "/services"],
  ["Industries", "/industries"],
  ["Hire Developer", "/hire-developer"],
  ["Contact", "/contact"],
] as const;

const CHAPTERS = [
  ["Future", "/#future"],
  ["Innovation", "/#innovation"],
  ["Collaboration", "/#collaboration"],
  ["Excellence", "/#excellence"],
  ["Purpose", "/#purpose"],
  ["Legacy", "/#legacy"],
] as const;

describe("HubtownMenuOverlay — structure", () => {
  it("renders nothing when open=false", () => {
    render(<HubtownMenuOverlay open={false} onClose={() => {}} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders dialog with aria-modal when open", () => {
    render(<HubtownMenuOverlay open onClose={() => {}} />);
    const dialog = screen.getByRole("dialog", { name: /Site navigation/i });
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("renders all 5 route links with correct hrefs", () => {
    render(<HubtownMenuOverlay open onClose={() => {}} />);
    for (const [label, href] of ROUTES) {
      const link = screen.getByRole("link", {
        name: new RegExp(`^${label}`, "i"),
      });
      expect(link).toHaveAttribute("href", href);
    }
  });

  it("renders all 6 chapter links with correct hrefs", () => {
    render(<HubtownMenuOverlay open onClose={() => {}} />);
    for (const [label, href] of CHAPTERS) {
      const link = screen.getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", href);
    }
  });

  it("renders the home wordmark link", () => {
    render(<HubtownMenuOverlay open onClose={() => {}} />);
    const dialog = screen.getByRole("dialog");
    const wordmark = within(dialog).getByRole("link", { name: /YJ VENTURES/i });
    expect(wordmark).toHaveAttribute("href", "/");
  });

  it("renders the email link with correct mailto", () => {
    render(<HubtownMenuOverlay open onClose={() => {}} />);
    const email = screen.getByRole("link", { name: /info@yjventures\.in/ });
    expect(email).toHaveAttribute("href", "mailto:info@yjventures.in");
  });

  it("renders a Close button with aria-label", () => {
    render(<HubtownMenuOverlay open onClose={() => {}} />);
    expect(screen.getByRole("button", { name: /Close menu/i })).toBeInTheDocument();
  });
});

describe("HubtownMenuOverlay — interaction", () => {
  it("calls onClose when Close button is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<HubtownMenuOverlay open onClose={onClose} />);
    await user.click(screen.getByRole("button", { name: /Close menu/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when any route link is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<HubtownMenuOverlay open onClose={onClose} />);
    for (const [label] of ROUTES) {
      const link = screen.getByRole("link", { name: new RegExp(`^${label}`, "i") });
      await user.click(link);
    }
    expect(onClose).toHaveBeenCalledTimes(ROUTES.length);
  });

  it("calls onClose when a chapter link is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<HubtownMenuOverlay open onClose={onClose} />);
    await user.click(screen.getByRole("link", { name: "Future" }));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when the wordmark link is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<HubtownMenuOverlay open onClose={onClose} />);
    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByRole("link", { name: /YJ VENTURES/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn();
    render(<HubtownMenuOverlay open onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does NOT call onClose for other keys", () => {
    const onClose = vi.fn();
    render(<HubtownMenuOverlay open onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Enter" });
    fireEvent.keyDown(document, { key: "Tab" });
    expect(onClose).not.toHaveBeenCalled();
  });
});
