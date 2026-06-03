/**
 * Solutions leaf pages (/solutions/[slug]). Copy mirrored from the reference
 * site and expanded with detail: hero, an "unlocks" overview, a how-it-works
 * sequence, outcome metrics, a capabilities checklist, and FAQs. One closing
 * CTA (the reference's doubled CTA is de-duplicated per the audit).
 */
export interface Step {
  title: string;
  body: string;
}
export interface Stat {
  value: string;
  label: string;
}
export interface Faq {
  q: string;
  a: string;
}

export interface SolutionLeaf {
  slug: string;
  num: string;
  /** Breadcrumb label, e.g. "Lead Automation". */
  name: string;
  /** Hero H1. */
  title: string;
  description: string;
  /** Expanded overview paragraph. */
  overview: string;
  /** Long-form detail (2–3 paragraphs). */
  longBody: string[];
  howItWorks: Step[];
  outcomes: Stat[];
  capabilities: string[];
  faqs: Faq[];
}

export const SOLUTIONS: SolutionLeaf[] = [
  {
    slug: "lead-automation",
    num: "01",
    name: "Lead Automation",
    title: "Capture & qualify leads automatically",
    description:
      "Transform your lead generation with AI-powered automation that captures, qualifies, and nurtures leads 24/7.",
    overview:
      "Most teams lose deals not because the product is wrong, but because follow-up is slow and inconsistent. Lead Automation captures every inbound — web, WhatsApp, ads, and forms — qualifies it against your criteria in seconds, and routes hot leads to the right rep while nurturing the rest until they're ready to buy.",
    longBody: [
      "Speed and consistency are the two things every high-performing sales team gets right — and the two things that break first when volume grows. A prospect who fills out a form at 11pm, messages you on WhatsApp during a commute, or replies to an ad on the weekend expects a response while their interest is still hot. Doing that manually, every time, simply isn't sustainable. Lead Automation closes the gap by treating every inbound the same way: captured instantly, qualified against your real criteria, and either routed to a rep or placed into a nurture track within seconds.",
      "Under the hood, it scores each lead on the signals you actually care about — budget, intent, fit, and source — so your team never burns a call on a tyre-kicker or lets a serious buyer go cold. Leads that aren't ready yet receive personalized, well-timed follow-ups that feel human rather than robotic, until they raise their hand. Everything writes back to your CRM with the full conversation attached, so when a rep finally picks up the phone they already know the context. The result is a pipeline that isn't just bigger, but cleaner: more of the right conversations and far fewer of the wrong ones.",
    ],
    howItWorks: [
      { title: "Capture everything", body: "Every inbound lands in one pipeline from your forms, landing pages, ads, WhatsApp, and website chat — no lead slips through the cracks." },
      { title: "Qualify & score", body: "AI scores each lead against your ideal-customer profile and intent signals, so reps spend time only on the ones worth a call." },
      { title: "Nurture & hand off", body: "Personalized follow-up sequences keep cold leads warm and push qualified ones straight into your CRM with full context." },
    ],
    outcomes: [
      { value: "3×", label: "More qualified leads reaching sales" },
      { value: "<60s", label: "Average first response time" },
      { value: "40%", label: "Higher lead-to-deal conversion" },
    ],
    capabilities: [
      "Intelligent lead capture forms",
      "Automatic lead scoring and qualification",
      "Personalized follow-up sequences",
      "CRM integration and sync",
      "Real-time lead notifications",
      "Conversion analytics",
    ],
    faqs: [
      { q: "Which channels can it capture leads from?", a: "Web forms, landing pages, paid ads, WhatsApp, website chat, and most messaging platforms — all unified into one pipeline." },
      { q: "Will it work with our CRM?", a: "Yes. We sync bidirectionally with Salesforce, HubSpot, and most major CRMs, or you can use our built-in contact management." },
      { q: "How long does setup take?", a: "Most teams are live in 1–2 weeks, including channel connections, scoring rules, and follow-up sequences." },
    ],
  },
  {
    slug: "chat-automation",
    num: "02",
    name: "Chat Automation",
    title: "Intelligent conversational AI",
    description:
      "Deploy smart chatbots across WhatsApp, web, and messaging platforms to handle customer inquiries instantly.",
    overview:
      "Customers expect instant answers, around the clock, in the channel they already use. Chat Automation deploys AI assistants across WhatsApp, web, and messaging that understand context, resolve common questions on their own, and hand off cleanly to a human the moment real nuance is needed.",
    longBody: [
      "Customer expectations have quietly reset. People no longer want to wait for business hours, sit in a phone queue, or repeat themselves to three different agents. They want an answer now, in the channel they already have open — and if they don't get it, they assume you don't care. Chat Automation meets that expectation by putting a capable AI assistant everywhere your customers already are: WhatsApp, your website, and the messaging platforms they use every day.",
      "What makes it work is restraint as much as capability. The assistant resolves the high-volume, repetitive questions — order status, opening hours, pricing, how-tos — instantly and accurately, drawing on your own content so it never invents an answer. But the moment a conversation needs judgment, empathy, or authority, it hands off to a human with the entire thread attached, so nothing is lost and no one has to start over. Your team stops drowning in repetitive tickets and gets to spend its time on the conversations that genuinely need a person.",
    ],
    howItWorks: [
      { title: "Connect your channels", body: "Deploy one assistant across WhatsApp, web chat, and messaging in days — from a single configuration." },
      { title: "Understand & respond", body: "Natural-language understanding reads intent and context to answer accurately, in any supported language." },
      { title: "Escalate when needed", body: "Complex or sensitive conversations hand off to a human agent with the full thread attached." },
    ],
    outcomes: [
      { value: "24/7", label: "Always-on customer coverage" },
      { value: "70%", label: "Of queries auto-resolved" },
      { value: "<5s", label: "Average response time" },
    ],
    capabilities: [
      "Multi-platform deployment",
      "Natural language processing",
      "Context-aware conversations",
      "Handoff to human agents",
      "Multi-language support",
      "24/7 availability",
    ],
    faqs: [
      { q: "Does it support multiple languages?", a: "Yes — the assistant detects and replies in your customers' language across all connected channels." },
      { q: "Can it hand off to a human?", a: "Always. You set the rules for when to escalate, and the human agent receives the full conversation context." },
      { q: "Where can we deploy it?", a: "WhatsApp, your website, and major messaging platforms — all from one configuration." },
    ],
  },
  {
    slug: "workflow-automation",
    num: "03",
    name: "Workflow Automation",
    title: "Streamline business processes",
    description:
      "Connect your tools and automate repetitive tasks to save time and reduce errors across your organization.",
    overview:
      "Repetitive, manual handoffs between tools are where time and accuracy go to die. Workflow Automation connects your stack and runs the busywork — moving data, triggering actions, and enforcing logic — reliably, with retries and audit trails so nothing silently fails.",
    longBody: [
      "Every growing company accumulates the same hidden tax: people copying data between tools, chasing approvals, re-keying the same information, and holding together processes that live half in software and half in someone's head. It's invisible on any single day and enormous over a quarter. Workflow Automation removes that tax by turning your real processes — including the branches, exceptions, and edge cases — into reliable automations that simply run in the background.",
      "Rather than forcing your team into rigid templates, we model the way you actually work, connect the apps you already use through 500+ integrations and webhooks, and add the logic that decides what happens when. Crucially, these automations are built to be trustworthy: failed steps retry, anything that needs a human raises an alert, and every run leaves an audit trail. That means you get the time savings of automation without the quiet risk of things silently breaking — the failure mode that makes teams stop trusting automation in the first place.",
    ],
    howItWorks: [
      { title: "Map the process", body: "We model your real workflow visually, including the branches and edge cases that off-the-shelf tools miss." },
      { title: "Connect your tools", body: "500+ integrations plus webhooks tie your apps together — no brittle glue code to maintain." },
      { title: "Run & monitor", body: "Automations run on schedule or on trigger, with error handling, retries, and full visibility into every step." },
    ],
    outcomes: [
      { value: "500+", label: "App integrations available" },
      { value: "90%", label: "Less time on manual tasks" },
      { value: "0", label: "Silently dropped tasks" },
    ],
    capabilities: [
      "Visual workflow builder",
      "500+ app integrations",
      "Conditional logic and branching",
      "Scheduled automations",
      "Error handling and retries",
      "Webhook support",
    ],
    faqs: [
      { q: "What can it integrate with?", a: "Over 500 apps out of the box, plus any service with an API or webhook via custom connectors." },
      { q: "What happens when a step fails?", a: "Built-in error handling retries transient failures and alerts you to anything that needs attention — no silent drops." },
      { q: "Do we need engineers to maintain it?", a: "No. The visual builder lets ops teams adjust logic; we handle the complex integrations behind it." },
    ],
  },
  {
    slug: "ai-solutions",
    num: "04",
    name: "AI Solutions",
    title: "Custom AI & ML development",
    description:
      "Leverage the power of artificial intelligence with custom solutions tailored to your specific business needs.",
    overview:
      "When off-the-shelf tools don't fit, we build the model. AI Solutions is custom AI and ML development — from predictive analytics and document processing to recommendation systems — designed around your data, your workflow, and the exact metric you're trying to move.",
    longBody: [
      "There's a point where configurable tools stop being enough and you need something built for your specific problem — a model that understands your documents, predicts your particular outcome, or makes recommendations grounded in your data. That's where custom AI and ML development comes in, and it's also where most projects quietly go wrong: teams build something impressive in a notebook that never survives contact with production. We work the other way around.",
      "Every engagement starts with the problem and the metric it should move, not the technology. We assess whether your data can actually support the goal, build and evaluate the model against real-world conditions rather than tidy benchmarks, and then ship it into your stack with the monitoring needed to keep it honest over time. You get an AI capability that's measured from the first sprint, owned by you, and designed to compound in value — not a proof-of-concept that quietly gets shelved.",
    ],
    howItWorks: [
      { title: "Discovery & strategy", body: "We scope the problem, assess your data, and define what success looks like before building anything." },
      { title: "Build & evaluate", body: "We develop and rigorously evaluate the model against real-world data, not just benchmarks." },
      { title: "Deploy & iterate", body: "We ship it into your stack with monitoring, then keep tuning as it meets production load." },
    ],
    outcomes: [
      { value: "Custom", label: "Models built for your data" },
      { value: "Eval-first", label: "Measured from sprint one" },
      { value: "In-stack", label: "Deployed where you work" },
    ],
    capabilities: [
      "Custom AI model development",
      "Predictive analytics",
      "Document processing",
      "Image and video analysis",
      "Recommendation systems",
      "AI strategy consulting",
    ],
    faqs: [
      { q: "What kinds of AI do you build?", a: "Custom models for prediction, classification, document and image analysis, recommendations, and more — plus AI strategy consulting." },
      { q: "How do you handle our data?", a: "We build around your data with strict handling controls; it is never used to train models outside your project." },
      { q: "How do you measure success?", a: "We agree on the target metric up front and evaluate against it continuously, from the first sprint through production." },
    ],
  },
];

export function getSolution(slug: string): SolutionLeaf | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}
