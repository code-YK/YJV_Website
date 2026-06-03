import type { FooterConfig } from "./types";
import { industries } from "./industries";

// Social URLs are sourced from public env vars so they can be set
// per-environment without code changes. Defaults fall back to handle pages.
const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/company/yjventures";
const TWITTER_URL =
  process.env.NEXT_PUBLIC_TWITTER_URL ?? "https://twitter.com/yjventures";
const GITHUB_URL =
  process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/yjventures";

export const footerConfig: FooterConfig = {
  tagline: "AI automation and software built to ship.",
  columns: [
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Industries", href: "/industries" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Solutions",
      links: [
        { label: "Lead Automation", href: "/solutions/lead-automation" },
        { label: "Chat Automation", href: "/solutions/chat-automation" },
        { label: "Workflow Automation", href: "/solutions/workflow-automation" },
        { label: "AI Solutions", href: "/solutions/ai-solutions" },
      ],
    },
    {
      heading: "Platform",
      links: [
        { label: "Overview", href: "/platform" },
        { label: "Chatbot Engine", href: "/platform/chatbot" },
        { label: "CRM Integration", href: "/platform/crm" },
        { label: "Analytics", href: "/platform/analytics" },
      ],
    },
    {
      heading: "Industries",
      links: industries.map((i) => ({
        label: i.name,
        href: `/industries/${i.slug}`,
      })),
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Data Deletion", href: "/data-deletion" },
      ],
    },
  ],
  social: [
    { platform: "linkedin", href: LINKEDIN_URL, label: "LinkedIn" },
    { platform: "twitter", href: TWITTER_URL, label: "Twitter / X" },
    { platform: "github", href: GITHUB_URL, label: "GitHub" },
  ],
  copyright: `© ${new Date().getFullYear()} YJ Ventures. All rights reserved.`,
};
