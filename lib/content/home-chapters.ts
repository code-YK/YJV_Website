import type { HubtownSectionVariant } from "@/components/hubtown/HubtownSection";


export interface HomeChapter {
  id: string;
  number: string;
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd?: string;
  body: string;
  bullets?: { label: string; detail: string }[];
  proofLine?: string;
  cta: { label: string; href: string };
  variant: HubtownSectionVariant;
  imageOnRight?: boolean;
  image?: { src: string; alt: string };
}

export const homeChapters: HomeChapter[] = [
  {
    id: "innovation",
    number: "02",
    eyebrow: "02 — Innovation",
    titleStart: "See what could ",
    titleAccent: "be.",
    body:
      "LangGraph for stateful multi-agent flows, CrewAI for role-based coordination, RAG pipelines grounded in your own data, built on the stack the industry will be standardising on in eighteen months, and made boring enough to run in production today. Model routing across OpenAI, Anthropic, and self-hosted Llama / Mistral so you pay for the cheapest model that meets the spec.",
    bullets: [
      {
        label: "Agent runtime",
        detail: "LangGraph + LangChain v0.3 for durable, replayable agent flows with checkpointing.",
      },
      {
        label: "Retrieval layer",
        detail: "pgvector / Pinecone / Weaviate with hybrid BM25 + dense retrieval and re-ranking.",
      },
      {
        label: "Eval harness",
        detail: "Ragas + LangFuse traces wired into CI so regressions get caught before release.",
      },
      {
        label: "Model routing",
        detail: "OpenRouter + LiteLLM for cost-aware routing across closed and open-source models.",
      },
    ],
    proofLine: "Average build: 6 weeks from kickoff to first production traffic.",
    cta: { label: "Explore the stack", href: "/services" },
    variant: "split-image",
    imageOnRight: true,
    image: {
      src: "/images/innovation.png",
      alt: "Glowing AI network nodes on a circuit board",
    },
  },
  {
    id: "collaboration",
    number: "03",
    eyebrow: "03 — Collaboration",
    titleStart: "One team across ",
    titleAccent: "every discipline.",
    body:
      "Senior engineers embedded directly into your Slack and Linear, async-first across four time zones, with weekly written demos and a 7-day swap guarantee if the fit is wrong. We don't hand off PowerPoints, we ship side-by-side with your team until the system is theirs to own, and we leave behind runbooks, dashboards, and tests so it stays that way.",
    bullets: [
      {
        label: "Embedded squads",
        detail: "Senior engineers join your Slack, Linear, and standups from day one.",
      },
      {
        label: "Async-first cadence",
        detail: "Written daily updates, Loom demos, decision records. Meetings only when blocked.",
      },
      {
        label: "Weekly written scope",
        detail: "Every Friday: shipped / next-up / risks. Signed before the next week starts.",
      },
      {
        label: "7-day swap",
        detail: "If a teammate isn't a fit, we replace within a week, no contract negotiation.",
      },
    ],
    proofLine: "Median engineer tenure on YJ engagements: 14 months.",
    cta: { label: "Meet the team", href: "/hire-developer" },
    variant: "split-image",
    imageOnRight: false,
    image: {
      src: "/images/collaboration.png",
      alt: "Abstract visualization of digital collaboration and connected nodes",
    },
  },
  {
    id: "excellence",
    number: "04",
    eyebrow: "04 — Excellence",
    titleStart: "Aim higher. ",
    titleAccent: "Ship deeper.",
    body:
      "Four productised builds with fixed scopes, fixed prices, and production-grade code on day one, no throwaway demos, no \"we'll harden it later.\" Architectural solutions designed to retire manual labour, not paper over it. Each engagement ships with the tests, observability, and runbook a junior engineer on your team could keep alive without us.",
    bullets: [
      {
        label: "AI Workflow Automation Pack",
        detail: "4-week build. Slack / email / Notion / CRM triggers wired into multi-step agent flows.",
      },
      {
        label: "AI Copilot (RAG-grounded)",
        detail: "6-week build. Domain-specific assistant on your docs, tickets, and codebase.",
      },
      {
        label: "MVP-to-Production SaaS",
        detail: "8–12 week build. Next.js + Postgres + Stripe + auth + AI features, day-one tested.",
      },
      {
        label: "AI Audit & Rescue",
        detail: "2-week diagnostic. We unstick stalled GenAI projects and ship a corrected plan.",
      },
    ],
    proofLine: "All four packages include a 30-day post-launch warranty.",
    cta: { label: "View solutions", href: "/solutions" },
    variant: "split-image",
    imageOnRight: true,
    image: {
      src: "/images/excellence.png",
      alt: "Architectural facade detail with neon accents",
    },
  },
  {
    id: "purpose",
    number: "05",
    eyebrow: "05 — Purpose",
    titleStart: "Automation that ",
    titleAccent: "compounds.",
    body:
      "Agents that defer to people on the calls that matter and quietly own the rest. Approval gates on every irreversible action, a full audit trail of every decision, PII scrubbing before any prompt leaves your VPC, and bias/drift monitoring baked in. We build systems compliance teams can actually sign off on, not demos that fail their first security review.",
    bullets: [
      {
        label: "Human-in-the-loop gates",
        detail: "Configurable approval thresholds on irreversible writes, refunds, and outbound comms.",
      },
      {
        label: "Audit trail",
        detail: "Every prompt, tool call, and decision logged with replay against the original input.",
      },
      {
        label: "PII firewall",
        detail: "Presidio-based scrubbing before any prompt is sent to a third-party model.",
      },
      {
        label: "Compliance-aware",
        detail: "SOC 2, HIPAA, and GDPR patterns built in, not bolted on three months later.",
      },
    ],
    proofLine: "Two YJ clients passed enterprise InfoSec review without remediation requests.",
    cta: { label: "How we work", href: "/services" },
    variant: "split-image-dark",
    imageOnRight: false,
    image: {
      src: "/images/purpose.png",
      alt: "Glowing digital lock representing security and compliance",
    },
  },
  {
    id: "legacy",
    number: "06",
    eyebrow: "06 — Legacy",
    titleStart: "The work that ",
    titleAccent: "outlasts the team.",
    body:
      "Systems that compound: documented, observable, and owned. Architectural decision records committed in /docs, Grafana and LangFuse dashboards seeded on day one, ≥90% test coverage on critical paths, and on-call runbooks signed off before handover. Built once, run for a decade, and small enough for the next hire to read end-to-end on day one.",
    bullets: [
      {
        label: "Decision records",
        detail: "ADRs committed in /docs/decisions for every load-bearing architectural call.",
      },
      {
        label: "Observability on day one",
        detail: "Grafana + LangFuse + OpenTelemetry traces seeded before first production traffic.",
      },
      {
        label: "Test coverage SLA",
        detail: "≥ 90% on critical paths, 70% overall, enforced in CI, not a suggestion in the README.",
      },
      {
        label: "Runbooks before handover",
        detail: "On-call playbooks for every alert, with simulated incident dry-runs before exit.",
      },
    ],
    cta: { label: "Book a discovery call", href: "/contact" },
    variant: "split-image",
    imageOnRight: true,
    image: {
      src: "/images/legacy.png",
      alt: "Glowing digital monolith representing a timeless digital system",
    },
  },
];
