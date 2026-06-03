import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("smoke", () => {
  it("renders a button", () => {
    render(<button type="button">Hi</button>);
    expect(screen.getByRole("button", { name: "Hi" })).toBeInTheDocument();
  });
});
