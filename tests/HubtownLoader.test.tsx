import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HubtownLoader } from "@/components/hubtown/HubtownLoader";

describe("HubtownLoader", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("renders the loading copy on first visit", () => {
    render(<HubtownLoader />);
    expect(screen.getByText(/Loading content/i)).toBeInTheDocument();
  });

  it("renders 000 left and 100 right endpoint markers, plus initial 000 progress", () => {
    render(<HubtownLoader />);
    expect(screen.getAllByText("000").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("renders nothing when the session flag is already set", () => {
    sessionStorage.setItem("yj-loaded-v2", "1");
    const { container } = render(<HubtownLoader />);
    expect(container.querySelector("[aria-hidden]")).toBeNull();
  });
});
