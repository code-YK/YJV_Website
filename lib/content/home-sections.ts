const UNSPLASH = "https://images.unsplash.com";
const wide = (id: string) =>
  `${UNSPLASH}/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

export interface HomeSection {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  body: string;
  image: { src: string; alt: string; priority?: boolean };
  cta: { label: string; href: string };
  align: "left" | "right";
  tone: "surface" | "subtle";
  variant: "innovation" | "collaboration" | "excellence" | "purpose";
}

export const homeSections: HomeSection[] = [
  {
    eyebrow: "02 — Innovation",
    titleStart: "Engineered on the ",
    titleAccent: "bleeding edge.",
    titleEnd: "",
    body: "LangGraph, CrewAI, RAG pipelines, multi-agent orchestration. We build with the stack the rest of the industry will be standardising on in 18 months, and we make it boring enough to run in production today.",
    image: {
      src: wide("1518770660439-4636190af475"),
      alt: "Close-up of a green and orange circuit board",
      priority: true,
    },
    cta: { label: "See the stack", href: "/services" },
    align: "right",
    tone: "subtle",
    variant: "innovation",
  },
  {
    eyebrow: "03 — Collaboration",
    titleStart: "One team across ",
    titleAccent: "product, AI, and engineering.",
    titleEnd: "",
    body: "Embedded specialists, weekly demos, written scopes. We don't hand off, we ship side-by-side with your team until the system is theirs to run.",
    image: {
      src: wide("1521737711867-e3b97375f902"),
      alt: "Team collaborating around a whiteboard in a glass-walled office",
    },
    cta: { label: "Meet the team", href: "/hire-developer" },
    align: "left",
    tone: "surface",
    variant: "collaboration",
  },
  {
    eyebrow: "04 — Excellence",
    titleStart: "We ship the systems that ",
    titleAccent: "replace the work.",
    titleEnd: "",
    body: "Productised builds with fixed scopes, fixed prices, and production code on day one. Architectural solutions designed to retire manual labour, not paper over it.",
    image: {
      src: wide("1487958449943-2429e8be8625"),
      alt: "Architectural facade detail with strong diagonal lines",
    },
    cta: { label: "Explore solutions", href: "/solutions" },
    align: "right",
    tone: "subtle",
    variant: "excellence",
  },
  {
    eyebrow: "05 — Purpose",
    titleStart: "Automation that ",
    titleAccent: "compounds, not consumes.",
    titleEnd: "",
    body: "Audit-friendly, human-in-the-loop, transparent. We build agents that defer to people on the calls that matter, and quietly own the rest.",
    image: {
      src: wide("1470770841072-f978cf4d019e"),
      alt: "Sunlit mountain horizon at dawn",
    },
    cta: { label: "How we work", href: "/services" },
    align: "left",
    tone: "surface",
    variant: "purpose",
  },
];
