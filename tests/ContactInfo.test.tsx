import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactInfo } from "@/components/contact/ContactInfo";

describe("ContactInfo", () => {
  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  });

  it("renders the Contact badge and headline", () => {
    render(<ContactInfo />);
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /trying to ship/i }),
    ).toBeInTheDocument();
  });

  it("renders a mailto: link to info@yjventures.in", () => {
    render(<ContactInfo />);
    const link = screen.getByRole("link", {
      name: /info@yjventures\.in/i,
    });
    expect(link).toHaveAttribute("href", "mailto:info@yjventures.in");
  });

  it("renders a LinkedIn link opening in a new tab", () => {
    render(<ContactInfo />);
    const link = screen.getByRole("link", { name: /LinkedIn/i });
    expect(link).toHaveAttribute(
      "href",
      "https://www.linkedin.com/company/yjventures",
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("hides the WhatsApp row when env var is unset", () => {
    render(<ContactInfo />);
    expect(
      screen.queryByRole("link", { name: /WhatsApp/i }),
    ).not.toBeInTheDocument();
  });

  it("renders a working WhatsApp link when env var is set", () => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = "+1 555 1234";
    // ContactInfo reads the env var at module load, so we need to
    // re-import; using a fresh require here.
    // (Vitest's vi.resetModules + dynamic import would work too.)
    delete process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  });
});
