import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import { RouteProgress } from "@/components/yj/RouteProgress";

describe("RouteProgress", () => {
  it("mounts without crashing and is hidden on first render", () => {
    const { container } = render(<RouteProgress />);
    expect(
      container.querySelector('[aria-hidden]'),
    ).toBeNull();
  });

  it("attaches a document click listener while mounted", () => {
    const add = vi.spyOn(document, "addEventListener");
    const remove = vi.spyOn(document, "removeEventListener");
    const { unmount } = render(<RouteProgress />);
    expect(
      add.mock.calls.some(([type]) => type === "click"),
    ).toBe(true);
    unmount();
    expect(
      remove.mock.calls.some(([type]) => type === "click"),
    ).toBe(true);
    add.mockRestore();
    remove.mockRestore();
  });
});
