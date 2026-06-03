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

import GlobalError from "@/app/error";

describe("GlobalError boundary", () => {
  it("renders 500 heading and friendly copy", () => {
    render(
      <GlobalError
        error={new Error("boom")}
        unstable_retry={() => {}}
      />,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("500");
    expect(screen.getByText(/hit a snag/i)).toBeInTheDocument();
  });

  it("shows the digest reference when provided", () => {
    const err = Object.assign(new Error("boom"), { digest: "abc-123" });
    render(<GlobalError error={err} unstable_retry={() => {}} />);
    expect(screen.getByText(/abc-123/)).toBeInTheDocument();
  });

  it("calls unstable_retry when 'Try again' is clicked", async () => {
    const retry = vi.fn();
    const user = userEvent.setup();
    render(
      <GlobalError error={new Error("boom")} unstable_retry={retry} />,
    );
    await user.click(screen.getByRole("button", { name: /Try again/i }));
    expect(retry).toHaveBeenCalledTimes(1);
  });

  it("renders 'Back to home' linking to /", () => {
    render(
      <GlobalError error={new Error("boom")} unstable_retry={() => {}} />,
    );
    const home = screen.getByRole("link", { name: /Back to home/i });
    expect(home).toHaveAttribute("href", "/");
  });

  it("renders 'Report it' linking to /contact", () => {
    render(
      <GlobalError error={new Error("boom")} unstable_retry={() => {}} />,
    );
    const report = screen.getByRole("link", { name: /Report it/i });
    expect(report).toHaveAttribute("href", "/contact");
  });

  it("section has role='alert'", () => {
    render(
      <GlobalError error={new Error("boom")} unstable_retry={() => {}} />,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
