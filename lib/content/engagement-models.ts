import type { EngagementModel } from "./types";

export const engagementModels: EngagementModel[] = [
  {
    name: "Embedded",
    tagline: "Most teams start here",
    description:
      "A dedicated senior engineer working only on your roadmap. Joins your standup, your Slack, your repo. Treats your codebase like their own.",
    bestFor: [
      "Multi-quarter product builds",
      "Replacing a missing senior hire on the team",
      "AI features that need someone living inside the codebase",
    ],
    commitment: "Full-time, 40h/wk, minimum 3 months",
    icon: "Briefcase",
    featured: true,
  },
  {
    name: "Fractional",
    tagline: "Advisory + part-build",
    description:
      "Senior engineer on retainer for code review, architecture calls, and the tricky parts of the build, without the full-time commitment.",
    bestFor: [
      "Founders who need a senior second pair of hands",
      "Architecture review while your team executes",
      "Ongoing AI maintenance and eval work",
    ],
    commitment: "Part-time, 10–20h/wk, minimum 2 months",
    icon: "Compass",
  },
  {
    name: "Project-based",
    tagline: "Scope it, price it, ship it",
    description:
      "Fixed scope, fixed price, fixed timeline. We write the scoping doc, you approve, and we ship to it. No hourly billing surprises.",
    bestFor: [
      "MVPs with a known feature list",
      "Defined migrations or integrations",
      "Time-boxed pilots with a hard launch date",
    ],
    commitment: "Fixed scope, fixed price, fixed timeline",
    icon: "Rocket",
  },
];
