import type { Industry } from "./types";

export const industries: Industry[] = [
  {
    slug: "education",
    name: "Education",
    tagline: "Grading, admissions, and tutoring, grounded in your curriculum.",
    description:
      "AI built for institutions that teach at scale, grading, admissions, content updates, and tutoring copilots grounded in your curriculum.",
    longDescription:
      "Education AI works when it's grounded in *your* syllabi, *your* rubrics, and *your* historical student work, not on generic LLM behaviour. We build grading assistants that defer to faculty on edge cases, tutoring copilots that cite the exact lecture slide, and admissions triage that follows the rubric your committee actually uses.\n\nEvery system ships with FERPA-aware data handling, faculty-controlled human-in-the-loop gates, and an audit trail that survives accreditation review. We've shipped into universities, K-12 districts, and online learning platforms, and we know the difference between \"ChatGPT for students\" and an AI that an institution can responsibly stand behind.",
    bestFor:
      "Universities, K-12 districts, and online learning platforms with 1,000+ students and a defined curriculum to ground against.",
    regulations: "FERPA-aware data handling · institutional review board (IRB) patterns where required.",
    proofLine:
      "One YJ-built grading assistant cut faculty review time 73% across a 12-course cohort.",
    painPoints: [
      "Grading load that scales with cohort size, not faculty headcount",
      "Course content that goes stale faster than it can be updated",
      "Admissions triage drowning in unstructured applications",
      "Personalized tutoring impossible to staff at affordable cost",
      "Accreditation review buried under unstructured outcome data",
    ],
    outcomes: [
      "Up to 80% reduction in time-to-grade with human-in-the-loop faculty review",
      "Adaptive learning paths that respond to per-student performance and pace",
      "Admissions cycles 3× faster with rubric-aligned shortlisting and bias review",
      "24/7 tutor copilots grounded in your lecture material with cited responses",
      "Accreditation evidence rolled up automatically from learning-outcome data",
    ],
    signals: [
      "Cohorts above 500 students per term",
      "Adjunct-heavy teaching load with high faculty turnover",
      "Existing LMS (Canvas, Blackboard, Moodle) with API access",
    ],
    icon: "GraduationCap",
    images: {
      hero: "/images/industry_education.png",
      card: "/images/industry_education.png",
      secondary: "/images/industry_education.png",
      alt: "Glowing knowledge nodes connecting like neurons",
    },
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    tagline: "AI for the regulated edge, HIPAA-aware from day one.",
    description:
      "AI for the regulated edge, clinical documentation, intake, pre-auth, and triage workflows built with HIPAA-aware architecture from day one.",
    longDescription:
      "Healthcare AI fails for the same three reasons every time: PHI leaks into vendor prompts, the audit trail can't be reconstructed, and the model writes things no clinician would sign their name to. We build with that failure mode as the starting point, PHI scrubbing before any prompt leaves your VPC, every model call logged with full input/output for replay, and human-in-the-loop gates on anything that touches a patient record.\n\nWe've shipped clinical documentation assistants, intake triage flows, pre-authorization automation, and after-hours nurse-triage copilots, all reviewed by the client's compliance team before launch. SOC 2 patterns built in. HIPAA-aware architecture isn't an afterthought; it's the architecture.",
    bestFor:
      "Health systems, clinics, payers, and digital health startups handling PHI with an existing EMR (Epic, Cerner, athena) integration appetite.",
    regulations:
      "HIPAA-aware architecture · BAA-supported model providers · SOC 2 Type II patterns · audit-friendly logging.",
    proofLine:
      "Two YJ healthcare clients passed enterprise InfoSec review with zero remediation requests.",
    painPoints: [
      "Clinician burnout from documentation overhead consuming 2+ hours per shift",
      "Patient intake forms that lose context before it reaches the EMR",
      "Insurance pre-authorization turnarounds measured in days, not hours",
      "Nurse triage lines flooded outside business hours with no overflow",
      "PHI leakage risk every time a clinician pastes notes into a chatbot",
    ],
    outcomes: [
      "50–70% reduction in clinical documentation time with ambient-scribe assistants",
      "Structured intake handoff direct to EMR with no manual re-entry",
      "Pre-auth turnaround in hours, not days, with payer-rule automation",
      "Triage assistants that filter and route 24/7 with a complete audit trail",
      "PHI firewall: Presidio-based scrubbing before any third-party model call",
    ],
    signals: [
      "Existing Epic, Cerner, or athena integration appetite",
      "Compliance team with a BAA process already established",
      "Clinical leadership willing to define the human-in-the-loop policy",
    ],
    icon: "HeartPulse",
    images: {
      hero: "/images/industry_healthcare.png",
      card: "/images/industry_healthcare.png",
      secondary: "/images/industry_healthcare.png",
      alt: "Glowing medical crosses and pulse motifs within a secure digital core",
    },
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    tagline: "AI that pays for itself in a quarter.",
    description:
      "AI that pays for itself in a quarter, catalog enrichment, support copilots, returns triage, and personalization rails built into your stack.",
    longDescription:
      "E-commerce is where AI ROI is easiest to measure and hardest to fake. Tickets either deflect or they don't. Catalogs either enrich or they don't. Returns either route correctly or they don't. We build for those numbers, and we instrument every system so you can see the lift in your existing analytics, not in a vendor dashboard.\n\nCatalog enrichment agents that fill titles, attributes, and image tags across 10K+ SKUs. Support copilots that resolve 30–50% of tickets with full order-system access. Returns triage that surfaces fraud signals before refunds clear. Personalized merchandising backed by behaviour and LLM reasoning. All deployed inside Shopify, BigCommerce, or your custom stack, never as a separate \"AI platform\" your team has to learn.",
    bestFor:
      "DTC brands, marketplaces, and retailers with 1,000+ SKUs and 10,000+ monthly orders running on Shopify, BigCommerce, or a custom stack.",
    regulations:
      "PCI-aware data handling · GDPR-compliant personalization patterns · regional data-residency support.",
    proofLine:
      "Average payback on YJ e-commerce engagements: 12 weeks. Measured in your analytics, not ours.",
    painPoints: [
      "Catalog sprawl with thin titles, missing attributes, and stale copy",
      "Support volume scaling linearly with SKU count and order growth",
      "Returns workflows that swallow margin without surfacing fraud",
      "Personalization stuck on rules that haven't been touched in years",
      "Cross-border listings with inconsistent translations and currency formatting",
    ],
    outcomes: [
      "Catalog enrichment agents that fill titles, attributes, and image tags at scale",
      "Support copilots resolving 30–50% of tickets with order-system access",
      "Returns triage with fraud-flag scoring and automated routing to ops",
      "Personalized merchandising backed by behavior, intent, and LLM reasoning",
      "Multi-language listing automation with reviewable translation workflows",
    ],
    signals: [
      "1,000+ active SKUs with a clear taxonomy",
      "Support volume above 500 tickets/week",
      "Shopify, BigCommerce, or custom stack with API access",
    ],
    icon: "ShoppingBag",
    images: {
      hero: "/images/industry_ecommerce.png",
      card: "/images/industry_ecommerce.png",
      secondary: "/images/industry_ecommerce.png",
      alt: "Glowing digital transactions and catalog nodes",
    },
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    tagline: "AI for the moments that close deals.",
    description:
      "AI for the moments that close deals, lead qualification, listing copy, contract review, and tenant communication across every channel.",
    longDescription:
      "Real estate runs on response time and follow-through. Leads that wait more than five minutes for a reply go cold. Contracts that wait two days for legal review lose deals. Tenant requests that get lost in spreadsheets cost relationships.\n\nWe build the AI rails that close that gap: lead-qualification bots on web, SMS, and WhatsApp with sub-30-second reply times; listing-copy generators that read photos, specs, and neighbourhood data; contract review with clause-level flagging surfaced to your legal team; and tenant-request routing that learns from your maintenance history. All integrated with the CRM and channels your agents actually use, never a separate \"AI portal.\"",
    bestFor:
      "Brokerages, property managers, and PropTech platforms with multi-channel lead flow and 100+ active listings or tenants.",
    proofLine:
      "Average lead-reply time on YJ real-estate engagements drops from 22 minutes to 28 seconds.",
    painPoints: [
      "Leads going cold because response time slips past five minutes",
      "Listing copy written by hand for every property, every channel",
      "Contracts reviewed by hand with clause-level risk missed under deadline",
      "Tenant maintenance requests routed by spreadsheet and prayer",
      "Cross-channel conversation history fragmented across SMS, email, and CRM notes",
    ],
    outcomes: [
      "Lead qualification bots on web, SMS, and WhatsApp, 3× faster reply",
      "Auto-generated listing copy from photos, specs, and neighborhood data",
      "Contract review with clause-level flagging surfaced to legal in minutes",
      "Tenant requests routed to the right vendor with SLA tracking and follow-up",
      "Unified conversation history across every channel for every prospect or tenant",
    ],
    signals: [
      "Lead flow above 100/week across multiple channels",
      "CRM (Salesforce, HubSpot, AppFolio) with API access",
      "Existing follow-up workflow that everyone admits is broken",
    ],
    icon: "Home",
    images: {
      hero: "/images/excellence.png",
      card: "/images/excellence.png",
      secondary: "/images/excellence.png",
      alt: "Architectural facade detail with neon accents",
    },
  },
  {
    slug: "outreach",
    name: "Outreach",
    tagline: "Research, write, route, at scale, without spamming.",
    description:
      "AI for sales, partnerships, and growth teams, research agents, personalized sequences, reply triage, and CRM routing that hold up at scale.",
    longDescription:
      "Outbound AI is mostly garbage right now, \"personalized\" templates that aren't personal, reply triage that ignores intent, and research agents that hallucinate company facts. We build the version that doesn't get blocked or unsubscribed.\n\nResearch agents that pull from public filings, product surfaces, and recent news, not just LinkedIn scraping. Outbound copy generated per-prospect with verifiable hooks. Reply triage that detects intent (interest, objection, unsubscribe, autoresponder) and routes accordingly. CRM hygiene maintained automatically so your reports stop lying to you. Built to your sales motion, not a vendor's playbook.",
    bestFor:
      "Sales teams, BDR organisations, and growth-led startups running outbound at 1,000+ touches/week across email, LinkedIn, and SMS.",
    regulations:
      "CAN-SPAM, GDPR, and CCPA-compliant sequencing · suppression-list and unsubscribe automation built in.",
    proofLine:
      "Average reply-rate lift on YJ outreach engagements: 2.4× across A/B-tested campaigns.",
    painPoints: [
      "Reps spending more time researching prospects than writing to them",
      "Outbound templates with personalization tokens that aren't really personal",
      "Reply triage swallowing manager hours every morning",
      "CRM hygiene that decays the moment outbound volume goes up",
      "Compliance risk every time a rep forgets to suppress an unsubscribe",
    ],
    outcomes: [
      "Research agents enriching company and persona context from public data",
      "Outbound copy generated per-prospect with verifiable hooks, not template fills",
      "Multi-channel sequencing with reply detection and intent scoring",
      "Inbox triage and CRM auto-routing tuned to your sales motion",
      "Compliance-aware suppression handling across email, LinkedIn, and SMS",
    ],
    signals: [
      "Outbound volume above 1,000 touches/week across multiple channels",
      "CRM (Salesforce, HubSpot, Pipedrive) as system of record",
      "An RVP or Head of Sales willing to A/B test against the current motion",
    ],
    icon: "MessageSquare",
    images: {
      hero: "/images/collaboration.png",
      card: "/images/collaboration.png",
      secondary: "/images/collaboration.png",
      alt: "Abstract visualization of digital collaboration and network nodes",
    },
  },
];
