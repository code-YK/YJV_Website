import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from "@/components/yj/ThemeProvider";

function Probe() {
  const { theme, toggle, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button type="button" onClick={toggle}>
        toggle
      </button>
      <button type="button" onClick={() => setTheme("light")}>
        set-light
      </button>
      <button type="button" onClick={() => setTheme("dark")}>
        set-dark
      </button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("light");
  });

  it("exposes a theme value via useTheme", () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    expect(["light", "dark"]).toContain(
      screen.getByTestId("theme").textContent,
    );
  });

  it("toggle flips the theme and the html.light class", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    const initial = screen.getByTestId("theme").textContent;
    await user.click(screen.getByRole("button", { name: "toggle" }));
    expect(screen.getByTestId("theme").textContent).not.toBe(initial);
    if (screen.getByTestId("theme").textContent === "light") {
      expect(document.documentElement.classList.contains("light")).toBe(true);
    } else {
      expect(document.documentElement.classList.contains("light")).toBe(false);
    }
  });

  it("persists the chosen theme to localStorage", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    await user.click(screen.getByRole("button", { name: "set-light" }));
    expect(localStorage.getItem("yj-theme")).toBe("light");
    await user.click(screen.getByRole("button", { name: "set-dark" }));
    expect(localStorage.getItem("yj-theme")).toBe("dark");
  });

  it("useTheme returns safe defaults outside a provider", () => {
    render(<Probe />);
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });
});
