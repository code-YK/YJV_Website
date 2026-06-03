import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HubtownCarousel } from "@/components/hubtown/HubtownCarousel";
import { testimonials } from "@/lib/content/testimonials";

describe("HubtownCarousel", () => {
  it("renders the first testimonial quote initially", () => {
    render(<HubtownCarousel />);
    const first = testimonials[0].quote;
    expect(screen.getByText(`“${first}”`)).toBeInTheDocument();
  });

  it("renders Prev, Next, and one dot button per testimonial", () => {
    render(<HubtownCarousel />);
    expect(screen.getByRole("button", { name: /Previous/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
    testimonials.forEach((_, i) => {
      expect(
        screen.getByRole("button", { name: new RegExp(`Go to testimonial ${i + 1}`, "i") }),
      ).toBeInTheDocument();
    });
  });

  it("advances to the next testimonial when Next is clicked", async () => {
    const user = userEvent.setup();
    render(<HubtownCarousel />);
    await user.click(screen.getByRole("button", { name: /Next/i }));
    expect(
      screen.getByText(`“${testimonials[1].quote}”`),
    ).toBeInTheDocument();
  });

  it("wraps from the first slide back to the last when Prev is clicked", async () => {
    const user = userEvent.setup();
    render(<HubtownCarousel />);
    await user.click(screen.getByRole("button", { name: /Previous/i }));
    const last = testimonials[testimonials.length - 1].quote;
    expect(screen.getByText(`“${last}”`)).toBeInTheDocument();
  });

  it("jumps to a specific testimonial via its dot button", async () => {
    const user = userEvent.setup();
    render(<HubtownCarousel />);
    const target = 2;
    await user.click(
      screen.getByRole("button", { name: new RegExp(`Go to testimonial ${target + 1}`) }),
    );
    expect(
      screen.getByText(`“${testimonials[target].quote}”`),
    ).toBeInTheDocument();
  });
});
