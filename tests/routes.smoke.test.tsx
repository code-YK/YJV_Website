import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

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

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  notFound: () => {
    throw new Error("notFound called");
  },
}));

vi.mock("@/components/hubtown/FaultyTerminal", () => ({
  FaultyTerminal: () => <div data-testid="faulty-terminal" />,
}));

vi.mock("@/components/hubtown/HubtownAnimeGrid", () => ({
  HubtownAnimeGrid: () => <h1 aria-label="YJ VENTURES" data-testid="anime-grid">YJ</h1>,
}));

import Home from "@/app/page";
import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
import PlatformPage from "@/app/platform/page";
import PlatformLeafPage from "@/app/platform/[slug]/page";
import SolutionPage from "@/app/solutions/[slug]/page";
import IndustriesPage from "@/app/industries/page";
import IndustryDetailPage from "@/app/industries/[slug]/page";
import CaseStudiesPage from "@/app/case-studies/page";
import PrivacyPage from "@/app/privacy/page";
import TermsPage from "@/app/terms/page";
import DataDeletionPage from "@/app/data-deletion/page";
import { INDUSTRIES } from "@/lib/content/site/industries";
import { SOLUTIONS } from "@/lib/content/site/solutions";
import { PLATFORM_LEAVES } from "@/lib/content/site/platform";

async function renderAsync(node: Promise<React.ReactElement> | React.ReactElement) {
  const resolved = await node;
  return render(resolved);
}

function expectHasH1() {
  expect(screen.getAllByRole("heading", { level: 1 }).length).toBeGreaterThan(0);
}

describe("Route smoke tests — every page module renders without crashing", () => {
  it("/ — home", () => {
    render(<Home />);
    expectHasH1();
  });

  it.each([
    ["/about", AboutPage],
    ["/contact", ContactPage],
    ["/platform", PlatformPage],
    ["/industries", IndustriesPage],
    ["/case-studies", CaseStudiesPage],
    ["/privacy", PrivacyPage],
    ["/terms", TermsPage],
    ["/data-deletion", DataDeletionPage],
  ] as const)("%s — static page", (_path, Page) => {
    render(<Page />);
    expectHasH1();
  });

  it.each(PLATFORM_LEAVES.map((l) => l.slug))(
    "/platform/%s — dynamic detail",
    async (slug) => {
      await renderAsync(
        PlatformLeafPage({ params: Promise.resolve({ slug }) }) as Promise<
          React.ReactElement
        >,
      );
      expectHasH1();
    },
  );

  it.each(SOLUTIONS.map((s) => s.slug))(
    "/solutions/%s — dynamic detail",
    async (slug) => {
      await renderAsync(
        SolutionPage({ params: Promise.resolve({ slug }) }) as Promise<
          React.ReactElement
        >,
      );
      expectHasH1();
    },
  );

  it.each(INDUSTRIES.map((i) => i.slug))(
    "/industries/%s — dynamic detail",
    async (slug) => {
      await renderAsync(
        IndustryDetailPage({ params: Promise.resolve({ slug }) }) as Promise<
          React.ReactElement
        >,
      );
      expectHasH1();
    },
  );

  it("dynamic detail route calls notFound for an unknown industry slug", async () => {
    await expect(
      IndustryDetailPage({ params: Promise.resolve({ slug: "not-real" }) }),
    ).rejects.toThrow(/notFound called/);
  });

  it("dynamic detail route calls notFound for an unknown solution slug", async () => {
    await expect(
      SolutionPage({ params: Promise.resolve({ slug: "not-real" }) }),
    ).rejects.toThrow(/notFound called/);
  });

  it("dynamic detail route calls notFound for an unknown platform slug", async () => {
    await expect(
      PlatformLeafPage({ params: Promise.resolve({ slug: "not-real" }) }),
    ).rejects.toThrow(/notFound called/);
  });
});
