import type { Solution } from "./types";

export const solutions: Solution[] = [
  {
    slug: "ai-workflow-automation-pack",
    name: "AI Workflow Automation Pack",
    tagline: "Three workflows. Six weeks. Audited execution.",
    description:
      "Three of your most painful repetitive workflows automated end-to-end in six weeks, agents that read context, decide, and execute inside the tools you already run.",
    longDescription:
      "We pick the three workflows your team complains about most, lead routing, invoice triage, customer onboarding, ticket dispatch, whatever they are, and rebuild them as LangGraph agent flows that read context across your SaaS stack, decide what to do, and execute. No new dashboards, no portal to log into; the work happens inside Slack, Notion, HubSpot, Linear, Gmail, or wherever you already run.\n\nEvery action a human used to take is logged with full input and output, so when something goes wrong you can replay it. Human-in-the-loop gates on anything with revenue, PR, or compliance risk. LangFuse eval traces wired into CI from sprint one, regressions get caught before they reach production.\n\nYou get the code, the prompts, the eval suite, the runbook, and a one-hour walkthrough with the engineer who built it. A junior on your team can run it after we're gone.",
    pricing: "From $28K · fixed price · 30-day post-launch warranty",
    timeline: "6 weeks: 1 wk discovery → 4 wk build → 1 wk handover",
    idealFor:
      "Ops, RevOps, or CX teams running 3+ repeatable workflows across SaaS tools (Slack, Notion, HubSpot, Linear, Gmail) where the team spends >10 hours/week on dispatch and stitching.",
    notFor:
      "Mission-critical financial transactions or hard-realtime systems, those need a custom build with bespoke guarantees, not a productised pack.",
    outcomes: [
      "50–80% reduction in human time on the three target workflows",
      "Audit-logged execution of every agent action, replayable on demand",
      "LangFuse dashboards live before launch, not bolted on after",
      "Production handover with runbook, on-call playbook, and a 1-hour walkthrough",
      "30-day post-launch warranty, we fix what breaks at no extra cost",
    ],
    features: [
      "Scoped to three workflows of your choice, lead routing, doc handling, ticket triage are typical",
      "Built on LangGraph + LangChain v0.3 over your existing SaaS stack, no rip-and-replace",
      "Human-in-the-loop approval gates on any action with revenue, PR, or compliance risk",
      "LangFuse evals + regression tracking from sprint one, wired into CI",
      "Presidio-based PII scrubbing before prompts leave your VPC",
      "Model routing via LiteLLM, cost-aware switching between OpenAI, Anthropic, and open-source",
    ],
    workflow: [
      "Discovery",
      "Workflow map",
      "Agent design",
      "Build",
      "Eval",
      "Handover",
    ],
    icon: "Workflow",
  },
  {
    slug: "ai-copilot-rag",
    name: "AI Copilot (RAG-grounded)",
    tagline: "Grounded answers with citations. Shipped in eight weeks.",
    description:
      "A deployed copilot grounded in your docs, data, and product surface, for support, sales, or knowledge-work teams, shipped in eight weeks.",
    longDescription:
      "Most \"AI copilot\" projects stall because they hallucinate, leak permissions, or can't be evaluated. This pack ships a copilot that doesn't do those things: grounded retrieval over your Notion, Drive, Confluence, help center, ticket history, and product DB; permission inheritance from your identity provider so users only see what they're entitled to; and a continuous eval loop against historical conversations so you can prove deflection / assist rates with numbers, not vibes.\n\nIt deploys where your users already are, Slack, Teams, embedded web widget, or as an API. Action calling for refunds, plan changes, lookups, ticket creation. Citations on every answer; if the model can't ground a claim, it says so instead of guessing.\n\nWe leave you with the retrieval pipeline, the eval harness, and a tuning playbook. The next 1% of accuracy is something your team can chase without us.",
    pricing: "From $44K · fixed price · 30-day post-launch warranty",
    timeline: "8 weeks: 2 wk discovery + data audit → 5 wk build → 1 wk launch",
    idealFor:
      "Support, sales, or knowledge-work teams handling >1,000 conversations/week, with at least 500 pages of documentation worth grounding against and a budget for proper retrieval infrastructure.",
    notFor:
      "Teams without any existing documentation or playbooks, a copilot needs something to ground against. Start by writing the runbooks first.",
    outcomes: [
      "30–50% query deflection or assist rate at handover, measured against your real history",
      "Grounded answers with citations on every response, no hallucinated paragraphs",
      "Continuous evaluation against historical conversations, dashboards included",
      "Permission inheritance from your IdP, users only see what they're entitled to see",
      "Multi-channel deployment: Slack, Teams, web widget, or API on day one",
    ],
    features: [
      "RAG over Notion, Drive, Confluence, your help center, ticket history, and product DB",
      "Hybrid retrieval, BM25 + dense embeddings + cross-encoder re-ranking",
      "pgvector or Pinecone backends, your choice based on scale and infra preferences",
      "Permission inheritance from your identity provider (Okta, Azure AD, Google Workspace)",
      "Action calling: refunds, plan changes, lookups, and ticket creation as tools",
      "Ragas-based offline eval suite running in CI, plus online human-rating capture",
    ],
    workflow: [
      "Discovery",
      "Data audit",
      "Index + retrieve",
      "Action layer",
      "Eval",
      "Deploy",
    ],
    icon: "Bot",
  },
  {
    slug: "mvp-to-production-saas",
    name: "MVP-to-Production SaaS Build",
    tagline: "Figma to live in nine weeks. Production-ready, not demo-ware.",
    description:
      "Full SaaS from Figma to live in nine weeks, auth, billing, multi-tenancy, and the observability scaffolding that turns a launch into a deploy, not a fire drill.",
    longDescription:
      "Most agencies ship a Figma-faithful MVP and then send you a list of \"production hardening\" tickets that doubles the budget. We don't. From day one the build includes auth, billing, multi-tenancy, audit logging, RBAC, CI/CD with preview environments, error tracking, and the dashboards you'll need when traffic shows up.\n\nNext.js 16 App Router with TypeScript, FastAPI or Node backend, Postgres multi-tenant by default. Stripe billing with the tax, dunning, and proration flows already wired. SSO-ready auth, audit logging on every privileged action, and feature flags from week one so launches don't need rollbacks.\n\nYou own the code, the infra, the models, and the IP. We commit ADRs in /docs so future engineers can read the why, not just the what. Median delivery is 9 weeks; the longest we've taken is 12.",
    pricing: "From $72K · fixed price · 30-day post-launch warranty",
    timeline: "9 weeks median: 1 wk scoping → 1 wk sprint 0 → 6 wk build → 1 wk beta + launch",
    idealFor:
      "Founders or product teams with a validated Figma, a clear monetisation model, and the appetite to launch in 9 weeks instead of 9 months. Best results when the team has done a previous SaaS launch.",
    notFor:
      "Pre-validation pivots, regulated medical devices, or teams that need a CTO-as-a-service for the next 12 months. This pack is a launch, not a long-term staff augmentation.",
    outcomes: [
      "Shippable v1 in 9 weeks (median delivery; 12 wk worst case)",
      "Production-ready from day one, tests, CI, monitoring, runbooks, ADRs",
      "Full ownership: code, infra, models, and IP delivered with the build",
      "Stripe billing live with tax, dunning, and proration flows already wired",
      "Preview environments per PR with full data seeding, no \"works on my machine\"",
    ],
    features: [
      "Next.js 16 + TypeScript on the App Router with React Server Components",
      "FastAPI or Node backend with Postgres multi-tenant by default, row-level security where needed",
      "Stripe billing with tax, dunning, proration, and webhook idempotency",
      "RBAC, audit logging, SSO-ready auth (Clerk, Auth.js, or your IdP)",
      "GitHub Actions CI/CD with preview environments and per-PR data seeding",
      "OpenTelemetry traces, Sentry, and a Grafana board seeded before launch",
    ],
    workflow: [
      "Scoping",
      "Sprint 0",
      "Build sprints",
      "Beta",
      "Launch",
    ],
    icon: "Rocket",
  },
  {
    slug: "ai-audit-rescue",
    name: "AI Audit & Rescue",
    tagline: "Two weeks. Written rescue plan. No vague slides.",
    description:
      "A two-week audit of your stalled or hallucinating AI system, ending with a written rescue plan and a 90-day remediation roadmap.",
    longDescription:
      "A senior AI engineer spends two weeks inside your codebase, infra, evals, and data. We're looking for the named root causes: bad chunking, missing re-ranking, prompt drift, vendor lock-in, latency-killing serialization, or, most often, no eval harness so nobody can tell which change made things worse.\n\nThe deliverable is a written architecture diff: this is what you have, this is what's failing, this is what needs to change, in priority order, with sprint-level scope and effort estimates. No slides. No \"consider modernising your stack.\" Concrete swaps, named libraries, and a 90-day plan you could hand to your current team or to one of our embedded engineers.\n\nIf you want us to execute the plan, we can, but the audit stands on its own. Most clients run the first 30 days themselves and hire us back for the harder lifts later.",
    pricing: "$18K · fixed price · written deliverable + 1-hour walkthrough",
    timeline: "2 weeks: 3 days kickoff → 7 days audit → 2 days writeup + walkthrough",
    idealFor:
      "Teams with a GenAI project that worked in demos but is failing in production, or where eval, latency, or cost has stalled the next release. Best when you have at least 4-6 weeks of production telemetry to look at.",
    notFor:
      "Pre-prototype \"should we use AI for this?\" decisions, those are a discovery conversation, not an audit. We do those for free in a discovery call.",
    outcomes: [
      "Architecture diff with named root causes, no vague \"consider modernising\" language",
      "Prioritised 90-day remediation plan with sprint-level scope and effort estimates",
      "Cost and latency budget review against your current architecture, with target numbers",
      "Vendor stack assessment with concrete swap recommendations and migration cost",
      "Optional hand-off to an embedded YJ engineer to execute the plan",
    ],
    features: [
      "Code, infra, eval, and data review by a senior AI engineer (≥ 8 years)",
      "Replay of representative production traces against alternative architectures",
      "Vendor-stack assessment with concrete swap recommendations and migration cost",
      "Cost and latency budget review against current architecture",
      "Written deliverable + one-hour walkthrough, no slides, no \"executive summary\" theatre",
      "Optional 30/60/90-day execution by an embedded YJ engineer if you want hand-off",
    ],
    workflow: [
      "Kickoff",
      "Audit",
      "Findings",
      "Remediation plan",
      "Handover",
    ],
    icon: "ShieldCheck",
  },
];
