import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "development",
    name: "Development",
    tagline: "Custom software, AI-native by default.",
    description:
      "Custom AI software, SaaS products, internal tools, and mobile apps, led by a senior engineer with shipping experience in your domain.",
    longDescription:
      "We build the software that your business needs and the market doesn't sell. Every project is led by a senior engineer with ≥ 8 years shipping production code, scoped as fixed-price sprints, demoed weekly, and delivered with the full code, infrastructure, and runbooks.\n\nYou own everything from sprint 1, no rented IP, no vendor lock-in, no \"platform fees\" after launch. The repo is yours, the infra is in your cloud account, the models are accessed through your API keys. We leave behind documentation a future hire can read in a day, not a three-month onboarding.",
    features: [
      "Web and SaaS development on Next.js 16, FastAPI, and Postgres",
      "Agentic AI workflows with LangGraph, CrewAI, OpenAI, and Anthropic",
      "Mobile apps with React Native and Expo, OTA updates included",
      "Internal tools and admin dashboards that replace spreadsheet sprawl",
      "API and integration layers with OpenTelemetry observability from day one",
      "Self-hosted model deployments (Llama, Mistral) where compliance demands it",
    ],
    useCases: [
      "Zero-to-one SaaS MVPs delivered in 9 weeks (median)",
      "Internal operations tools that replace brittle scripts and Airtable hacks",
      "AI features bolted onto existing products without rewriting the stack",
      "Customer-facing copilots embedded into existing dashboards",
    ],
    proofPoint: "Median build: 9 weeks from kickoff to first paying user.",
    bestFor:
      "Founders and product teams with a validated Figma and a 9–12 week appetite to ship.",
    engagement: "Fixed-price sprints · weekly demos · full IP transfer at launch.",
    icon: "Code2",
    image: "/images/service_development.png",
    imageAlt: "Glowing lines of code transforming into a digital structure",
  },
  {
    slug: "implementation",
    name: "Implementation",
    tagline: "From AI pilot to running in production.",
    description:
      "We take prototypes, yours or someone else's, and turn them into deployed, monitored, integrated systems that actually run.",
    longDescription:
      "Most AI projects stall between pilot and production, not because the model doesn't work, but because nobody scoped the data plumbing, the auth flows, the eval harness, or the on-call. We do.\n\nWe take a working prototype, yours or someone else's, and harden it: production infra, identity-aware data access, multi-tenant isolation, LangFuse eval traces, OpenTelemetry observability, and the integrations into the SaaS your team already runs on. Pilot to production in four to six weeks, SLA-backed at handover, with the runbooks a junior engineer can follow at 2am.",
    features: [
      "Agentic AI workflows hardened for production traffic with circuit breakers",
      "LLM integrations into Salesforce, HubSpot, Zendesk, and custom CRMs",
      "Vector search and RAG pipelines on Pinecone, pgvector, or Qdrant",
      "Data pipelines using dbt, Airflow, or Prefect, your warehouse, our patterns",
      "Observability: LangFuse traces, OpenTelemetry spans, cost and latency dashboards",
      "Cost-aware model routing via LiteLLM with per-tenant budgets",
    ],
    useCases: [
      "Taking an internal AI prototype live with monitoring and 30-minute SLA",
      "Replacing a vendor AI tool with a self-hosted equivalent on your cloud",
      "Integrating a third-party model into existing CRM and support flows",
      "Adding eval + audit infrastructure to a system that's been silently drifting",
    ],
    proofPoint: "Average pilot-to-production: 5 weeks, with zero re-architecture mid-flight.",
    bestFor:
      "Teams with a working AI prototype that's stuck in staging, not a clean-slate project.",
    engagement: "4–6 week fixed-price engagement · SLA-backed handover · optional ongoing retainer.",
    icon: "Layers",
    image: "/images/service_implementation.png",
    imageAlt: "Data pipelines connecting into a robust core",
  },
  {
    slug: "consultancy",
    name: "Consultancy Services",
    tagline: "A senior second opinion before you spend the budget.",
    description:
      "A two- to four-week engagement that ends with a written roadmap, architecture, team, vendor stack, risks, and zero slide decks.",
    longDescription:
      "Most AI consultants sell slides. We sell decisions. You get a senior engineer for two to four weeks, fixed-price, who delivers a written report you can hand to your CTO, your investors, or your acquirer.\n\nThe report names the architecture, the team you actually need, the vendor risks worth de-risking, and the budget worth allocating, with sprint-level scope estimates, not abstract \"consider modernising your stack\" language. We sit in your codebase, your data warehouse, and your eval traces; the recommendations are grounded in what we saw, not what we sell.",
    features: [
      "AI roadmap and feasibility studies, two-week fixed-price sprints",
      "Technical due diligence for investors, acquirers, and boards (Series A and up)",
      "Architecture review and rescue plans for stalled or hallucinating projects",
      "Vendor selection: LLM, vector DB, orchestration, written trade-offs with cost models",
      "Cost-and-latency budget review with target numbers against current architecture",
      "Written deliverable plus a one-hour walkthrough; no slide deck, no \"executive summary\" theatre",
    ],
    useCases: [
      "Pre-funding architecture review before committing engineering budget",
      "Buy-vs-build decisions on LLM, vector DB, and orchestration layers",
      "Recovering a stalled internal AI project with a 90-day remediation plan",
      "Technical due-diligence ahead of an acquisition or partnership",
    ],
    proofPoint:
      "Deliverable: 1 written report (~20 pages) + 1-hour walkthrough, never a slide deck.",
    bestFor:
      "Founders, CTOs, and investment teams who need a senior second opinion before committing capital.",
    engagement: "2-4 week fixed-price audit · written report + 1-hour walkthrough · no slides.",
    icon: "Compass",
    image: "/images/service_consultancy.png",
    imageAlt: "Glowing compass made of digital nodes",
  },
  {
    slug: "training",
    name: "Training",
    tagline: "Teach the team to ship, not just to prompt.",
    description:
      "Workshops and structured cohorts for engineering, product, and leadership teams who want to build AI in-house, not outsource it forever.",
    longDescription:
      "Every program ships working code by the last day. We run cohorts of four to twenty people, on-site, remote, or hybrid, built around your stack and your actual use cases, no generic LLM tutorials.\n\nYour engineers leave with agents, evals, and deployment patterns they applied to your data and your problems. Your PMs leave with a discovery framework that filters \"sounds-like-AI\" features from \"would-actually-move-metrics\" features. Your leadership leaves with a written investment trade-off matrix, not a vendor-pitch worksheet.",
    features: [
      "AI for engineers, three days on agents, RAG, evals, observability, deployment",
      "AI for product teams, two days on discovery, prompt design, metrics, and roadmapping",
      "AI for leadership, half-day on what to fund, what to defer, and what to kill",
      "Custom curriculum built around your stack, codebase, and current backlog",
      "Cohorts of 4–20 people; on-site, remote, or hybrid delivery",
      "Take-home repos with eval suites your team can keep extending",
    ],
    useCases: [
      "Engineering teams adopting AI tooling but unsure of evaluation patterns",
      "Product orgs upskilling PMs to scope and ship AI features responsibly",
      "Leadership offsites focused on AI strategy and investment trade-offs",
      "Cross-functional teams aligning on what \"AI-ready\" means for the next year",
    ],
    proofPoint: "Cohorts ship working code by the last day, never a tutorial-only program.",
    bestFor:
      "Teams of 4–20 actively shipping AI features, not exploratory \"AI literacy\" workshops.",
    engagement: "Half-day to 3-day cohorts · on-site, remote, or hybrid · take-home eval repos.",
    icon: "GraduationCap",
    image: "/images/service_training.png",
    imageAlt: "Glowing knowledge nodes expanding outwards",
  },
  {
    slug: "support",
    name: "Support",
    tagline: "Keep the AI running while you sleep.",
    description:
      "Three retainer tiers covering monitoring, on-call response, evals, model drift, and quarterly architecture reviews for production AI.",
    longDescription:
      "AI systems drift, vendors break, models deprecate. Our support tier watches what we, or someone else, built, and fixes things before they page your team.\n\nThree retainer levels: **Maintain** (8h/mo, business hours, monthly health review). **Operate** (40h/mo, 24/7 on-call, vendor failover). **Co-pilot** (160h/mo, embedded senior engineer running with your team). All three include eval-based drift detection, cost dashboards, and quarterly architecture reviews. Cancel with 30 days' notice; no annual lock-in.",
    features: [
      "Model drift detection with eval-based alerting on regressions",
      "Vendor incident triage and failover across OpenAI, Anthropic, and cloud providers",
      "Cost monitoring with per-tenant token-budget alerts",
      "Patching, dependency updates, and monthly written health reviews",
      "Quarterly architecture reviews with written recommendations and migration plans",
      "30-minute SLA on Operate and Co-pilot tiers during business hours",
    ],
    useCases: [
      "Production AI copilots needing on-call coverage outside business hours",
      "Teams without an in-house ML/LLM ops capability yet",
      "Continuing roadmap delivery after an initial build is launched",
      "Bridge coverage while you hire your first AI platform engineer",
    ],
    proofPoint: "On-call SLA: 30 minutes during business hours on Operate and Co-pilot tiers.",
    bestFor:
      "Teams running production AI in front of customers without a dedicated platform engineer.",
    engagement:
      "Three tiers · monthly retainer · 30-day cancellation · no annual lock-in.",
    icon: "LifeBuoy",
    image: "/images/service_support.png",
    imageAlt: "Glowing shield and health metrics overlaying a digital core",
  },
];
