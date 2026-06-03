import { services } from "./content/services";
import { industries } from "./content/industries";
import type { IconName } from "./content/types";

export interface NavSubItem {
  label: string;
  href: string;
  tagline?: string;
  icon?: IconName;
}

export interface NavItem {
  label: string;
  href: string;
  items?: NavSubItem[];
}

export const navLinks: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    items: services.map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
      tagline: s.tagline,
      icon: s.icon,
    })),
  },
  {
    label: "Industries",
    href: "/industries",
    items: industries.map((i) => ({
      label: i.name,
      href: `/industries/${i.slug}`,
      tagline: i.description.split(", ")[0] ?? i.name,
      icon: i.icon,
    })),
  },
  { label: "Solutions", href: "/solutions" },
  { label: "Hire Developer", href: "/hire-developer" },
  { label: "Contact", href: "/contact" },
];

export const heroContent = {
  eyebrow: "AI Automation · Custom SaaS · Hire Developers",
  headline: "Build the systems that replace the work.",
  subhead:
    "Agentic AI, custom SaaS, and senior engineers, delivered as a single team. Fixed-price sprints, weekly demos, production code on day one.",
  primaryCta: { label: "Book a discovery call", href: "/contact?intent=demo" },
  secondaryCta: { label: "See our work", href: "/solutions" },
  trustPills: ["50+ projects shipped", "7 countries", "Senior team, no juniors-only"],
};
