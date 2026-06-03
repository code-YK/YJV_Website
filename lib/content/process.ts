import type { ProcessStep } from "./types";

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    name: "Discovery call",
    description:
      "Thirty minutes, free, no sales script. We listen to what you're trying to ship and end with a written next-step you can act on whether or not you hire us.",
    deliverables: ["30-minute call", "Written next-step", "No sales script"],
    icon: "MessageSquare",
  },
  {
    step: 2,
    name: "Scoping doc",
    description:
      "Within 48 hours of the call, you receive a written scoping document with the work, the team, the fixed price, and the delivery timeline.",
    deliverables: ["Fixed price", "Timeline", "48-hour turnaround"],
    icon: "FileText",
  },
  {
    step: 3,
    name: "Sprint 0",
    description:
      "We lock the architecture, data model, and success metrics before a single feature is built. Sprint 0 is where the project stops drifting.",
    deliverables: ["Architecture", "Data model", "Success metrics"],
    icon: "Compass",
  },
  {
    step: 4,
    name: "Build sprints",
    description:
      "Weekly demos every Friday, weekly invoices every Monday, scope locked at sprint start. You see real working software each week, not slide decks.",
    deliverables: ["Weekly demos", "Weekly invoices", "Zero scope creep"],
    icon: "Code2",
  },
  {
    step: 5,
    name: "Launch",
    description:
      "Production deploy with the full handover, code, models, infrastructure, runbook, and a post-launch SLA. Nothing rented, nothing locked away.",
    deliverables: ["Code handover", "Runbook", "Post-launch SLA"],
    icon: "Rocket",
  },
  {
    step: 6,
    name: "Run",
    description:
      "Optional retainer: on-call coverage, model evals, drift monitoring, and a senior engineer continuing the roadmap. Stay engaged or take the keys.",
    deliverables: ["Optional support", "On-call retainer", "Roadmap continuity"],
    icon: "LifeBuoy",
  },
];
