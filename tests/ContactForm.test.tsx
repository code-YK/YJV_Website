import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ContactForm } from "@/components/contact/ContactForm";

const validInput = {
  name: "Jane Doe",
  company: "Acme",
  email: "jane@example.com",
  phone: "+1 555 123 4567",
  service: "development",
  budget: "5l-15l",
  description:
    "We need an AI-powered intake workflow that triages support emails into Linear tickets.",
};

async function fillValidForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/^Name$/i), validInput.name);
  await user.type(screen.getByLabelText(/Company/i), validInput.company);
  await user.type(screen.getByLabelText(/Email/i), validInput.email);
  await user.type(screen.getByLabelText(/Phone/i), validInput.phone);
  await user.selectOptions(screen.getByLabelText(/Service/i), validInput.service);
  await user.selectOptions(screen.getByLabelText(/Budget/i), validInput.budget);
  await user.type(
    screen.getByLabelText(/Tell us about your project/i),
    validInput.description,
  );
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("ContactForm — fields", () => {
  it("renders Name, Company, Email, Phone, Service, Budget, Description inputs", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/^Name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Service/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Budget/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Tell us about your project/i),
    ).toBeInTheDocument();
  });

  it("marks Company as optional", () => {
    render(<ContactForm />);
    const companyLabel = screen.getByText(/Company/i).closest("label");
    expect(within(companyLabel!).getByText(/optional/i)).toBeInTheDocument();
  });

  it("renders Service options including 'Hire a Developer'", () => {
    render(<ContactForm />);
    const select = screen.getByLabelText(/Service/i);
    expect(within(select).getByText(/Pick a service/)).toBeInTheDocument();
    expect(within(select).getByText(/Development/)).toBeInTheDocument();
    expect(within(select).getByText(/Hire a Developer/)).toBeInTheDocument();
  });

  it("renders Budget options including 'Under ₹2L'", () => {
    render(<ContactForm />);
    const select = screen.getByLabelText(/Budget/i);
    expect(within(select).getByText(/Under ₹2L/)).toBeInTheDocument();
    expect(within(select).getByText(/₹15L\+/)).toBeInTheDocument();
  });

  it("renders the Send message submit button", () => {
    render(<ContactForm />);
    expect(
      screen.getByRole("button", { name: /Send message/i }),
    ).toBeInTheDocument();
  });
});

describe("ContactForm — validation errors", () => {
  it("shows Name error on empty submit", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /Send message/i }));
    expect(await screen.findByText(/Please enter your full name/i)).toBeInTheDocument();
  });

  it("shows Email error for invalid email", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/Email/i), "not-an-email");
    await user.click(screen.getByRole("button", { name: /Send message/i }));
    expect(
      await screen.findByText(/Please enter a valid email address/i),
    ).toBeInTheDocument();
  });

  it("shows Phone error for short phone", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/Phone/i), "123");
    await user.click(screen.getByRole("button", { name: /Send message/i }));
    expect(
      await screen.findByText(/Please enter a valid phone number/i),
    ).toBeInTheDocument();
  });

  it("shows Description error for short description", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(
      screen.getByLabelText(/Tell us about your project/i),
      "too short",
    );
    await user.click(screen.getByRole("button", { name: /Send message/i }));
    expect(
      await screen.findByText(/Tell us a bit more/i),
    ).toBeInTheDocument();
  });

  it("wires aria-invalid + aria-describedby on the failing input", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /Send message/i }));
    await screen.findByText(/Please enter your full name/i);
    const name = screen.getByLabelText(/^Name$/i);
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAttribute("aria-describedby", "name-error");
    expect(document.getElementById("name-error")).toBeInTheDocument();
  });
});

describe("ContactForm — submission", () => {
  it("POSTs JSON to /api/contact and shows success card", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      );
    render(<ContactForm />);
    await fillValidForm();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Send message/i }));
    await waitFor(() =>
      expect(screen.getByText(/We.?ll reply within one business day/i)).toBeInTheDocument(),
    );
    expect(fetchMock).toHaveBeenCalledWith("/api/contact", expect.objectContaining({
      method: "POST",
      headers: expect.objectContaining({ "content-type": "application/json" }),
    }));
    const body = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
    expect(body).toMatchObject({
      name: "Jane Doe",
      email: "jane@example.com",
      service: "development",
      budget: "5l-15l",
    });
  });

  it("'Send another message' button resets back to the form", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );
    render(<ContactForm />);
    await fillValidForm();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Send message/i }));
    await screen.findByText(/We.?ll reply within one business day/i);
    await user.click(screen.getByRole("button", { name: /Send another message/i }));
    expect(screen.getByLabelText(/^Name$/i)).toBeInTheDocument();
  });

  it("surfaces API error message from response body", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          ok: false,
          errors: { _form: ["Couldn't deliver. Try later."] },
        }),
        { status: 502 },
      ),
    );
    render(<ContactForm />);
    await fillValidForm();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Send message/i }));
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/Couldn't deliver\. Try later\./i);
  });

  it("shows fallback error copy when API gives no errors._form", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: false }), { status: 500 }),
    );
    render(<ContactForm />);
    await fillValidForm();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Send message/i }));
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/We couldn't submit your message/i);
  });

  it("shows network error copy when fetch throws", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));
    render(<ContactForm />);
    await fillValidForm();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Send message/i }));
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/Network error/i);
  });

  it("disables the fieldset while submitting", async () => {
    let resolveFetch!: (r: Response) => void;
    vi.spyOn(globalThis, "fetch").mockReturnValue(
      new Promise<Response>((r) => {
        resolveFetch = r;
      }),
    );
    render(<ContactForm />);
    await fillValidForm();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Send message/i }));
    const fieldset = document
      .querySelector("fieldset")
      ?.hasAttribute("disabled");
    expect(fieldset).toBe(true);
    expect(
      screen.getByRole("button", { name: /Sending/i }),
    ).toBeDisabled();
    resolveFetch(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    await waitFor(() =>
      expect(screen.queryByRole("button", { name: /Sending/i })).not.toBeInTheDocument(),
    );
  });
});
