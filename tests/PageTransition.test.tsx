import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import { PageTransition } from "@/components/yj/PageTransition";

describe("PageTransition", () => {
  it("renders its children", () => {
    render(
      <PageTransition>
        <span data-testid="child">page-content</span>
      </PageTransition>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
