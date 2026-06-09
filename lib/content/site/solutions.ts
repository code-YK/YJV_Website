/**
 * Solutions leaf pages (/solutions/[slug]). Outcome-led hero, an "unlocks"
 * overview, a how-it-works sequence, outcome metrics, a capabilities checklist,
 * and FAQs. One closing CTA (the reference's doubled CTA is de-duplicated per
 * the audit). Copy is em-dash-free per brand voice; all numbers retained.
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
  /** Long-form detail (2 to 3 paragraphs). */
  longBody: string[];
  howItWorks: Step[];
  outcomes: Stat[];
  capabilities: string[];
  faqs: Faq[];
  seoTitle?: string;
  seoDescription?: string;
}

export const SOLUTIONS: SolutionLeaf[] = [
  {
    slug: "lead-automation",
    num: "01",
    name: "Lead Automation",
    title: "Lead Automation That Turns Faster Follow-Up Into More Closed Deals",
    description:
      "Capture, qualify, and route every lead automatically, so your team spends its time on the conversations most likely to close.",
    seoTitle: "Lead Automation for Faster Follow-Up & More Deals",
    seoDescription:
      "Capture, qualify, and route leads automatically. Get 3x more qualified leads to sales, sub-60-second first response, and 40% higher conversion.",
    overview:
      "Most businesses do not have a lead generation problem. They have a lead response problem. Leads arrive at every hour and through every channel, and by the time someone follows up, the prospect has gone cold or replied to a competitor. Lead Automation handles the first critical minutes of every lead, so your team spends its time on conversations that are ready to close.",
    longBody: [
      "The pattern is familiar. The first lead of the day gets a fast, polished response. The forty-third gets nothing until tomorrow. Hot leads sit in an inbox while your team works through whatever is in front of them, and follow-up depends on who is available and how busy they are. This inconsistency is expensive in a quiet way: you rarely see the deal you lost because no one replied in time. You only see a pipeline that should be fuller than it is.",
      "We build a system that captures from every channel (web forms, landing pages, paid ads, WhatsApp, website chat) into one flow, qualifies and scores each lead against the criteria that matter to your business, and routes high-intent buyers to the right rep with a sub-minute first response. Leads that are not ready yet enter automated nurture sequences instead of being forgotten. Everything writes back to your CRM with full context, so your team opens a record and sees the whole story. Where revenue or reputation is on the line, a person reviews and approves at the moments that matter.",
    ],
    howItWorks: [
      { title: "Capture from every channel", body: "Web forms, landing pages, paid ads, WhatsApp, and website chat flow into one pipeline. Nothing depends on someone checking five inboxes." },
      { title: "Qualify and score", body: "Each lead is scored against your real buying criteria (budget, intent, fit, source), so reps know who to call first and who to nurture." },
      { title: "Route, nurture, and sync", body: "Hot leads reach a rep in under a minute, the rest enter nurture sequences, and everything writes back to your CRM with full context." },
    ],
    outcomes: [
      { value: "3x", label: "More qualified leads reaching sales" },
      { value: "<60s", label: "Average first response time" },
      { value: "40%", label: "Higher lead-to-deal conversion" },
    ],
    capabilities: [
      "Lead capture across channels",
      "Lead qualification and scoring",
      "CRM integrations (Salesforce, HubSpot, and more)",
      "Automated follow-up sequences",
      "Appointment scheduling",
      "Sales pipeline automation",
    ],
    faqs: [
      { q: "Do I need a CRM to use this?", a: "No. We sync bidirectionally with Salesforce, HubSpot, and most major CRMs if you have one. If you do not, we include built-in contact management so your leads are organized from day one." },
      { q: "How long until it is running?", a: "Most teams are live in 1 to 2 weeks. We measure results from the first sprint, so you see impact early." },
      { q: "Will automation handle sensitive leads correctly?", a: "Where revenue, compliance, or reputation is at stake, we place human-in-the-loop checkpoints so a person reviews and approves the important moments." },
    ],
  },
  {
    slug: "chat-automation",
    num: "02",
    name: "Chat Automation",
    title: "Chat Automation That Answers Customers Instantly, in Their Channel",
    description:
      "Deploy AI assistants on your website, WhatsApp, and messaging that answer routine questions in seconds and hand off cleanly to a person when needed.",
    seoTitle: "AI Chat Automation for Website & WhatsApp Support",
    seoDescription:
      "Deploy AI assistants on website, WhatsApp, and messaging. Get 24/7 coverage, 70% of queries auto-resolved, and under 5-second responses, grounded in your content.",
    overview:
      "Customers no longer wait. A reply that arrives an hour later often arrives to an empty chair, and slow replies erode trust. Meanwhile your team is buried in the same routine questions asked over and over. Chat Automation puts a capable AI assistant on your website, WhatsApp, and messaging channels that answers the moment customers ask.",
    longBody: [
      "The damage from slow replies runs deeper than a single missed sale. A prospect who waits and hears nothing assumes that is how your business operates after they pay, too. At the same time, a large share of incoming messages are the same routine questions: pricing, availability, hours, order status. Talented people spend their day on repetitive tickets instead of the conversations only a human can handle.",
      "Our assistants answer only from your own content, so they reflect your business accurately and never invent answers. They resolve routine questions instantly, around the clock, from one configuration deployed across every channel. When a conversation needs a person, the assistant escalates with a clean handoff and the full thread attached, so the customer never repeats themselves. Multi-language support is built in, and human checkpoints stay in place wherever reputation or compliance is at stake.",
    ],
    howItWorks: [
      { title: "Ground it in your content", body: "Your documentation, FAQs, policies, and product details become the only source the assistant answers from." },
      { title: "Resolve instantly, everywhere", body: "One configuration deploys across website, WhatsApp, and messaging, answering routine questions in seconds, in your customer's language." },
      { title: "Escalate cleanly", body: "When a conversation needs a person, the assistant hands over the full thread so your agent picks up with complete context." },
    ],
    outcomes: [
      { value: "24/7", label: "Always-on customer coverage" },
      { value: "70%", label: "Of queries auto-resolved" },
      { value: "<5s", label: "Average response time" },
    ],
    capabilities: [
      "Website chatbots",
      "WhatsApp automation",
      "Customer support automation",
      "FAQ automation",
      "Lead qualification bots",
      "Appointment booking",
    ],
    faqs: [
      { q: "Will the assistant make things up?", a: "No. It answers only from your own content: your documentation, policies, and approved information. It does not pull from the open internet, so responses stay accurate to your business." },
      { q: "What happens when a customer needs a real person?", a: "The assistant escalates with a clean handoff and passes the full conversation thread to your team, so the customer does not repeat themselves." },
      { q: "Can one assistant cover website and WhatsApp together?", a: "Yes. We configure your assistant once and deploy it across website, WhatsApp, and messaging, with multi-language support." },
    ],
  },
  {
    slug: "workflow-automation",
    num: "03",
    name: "Workflow Automation",
    title: "Workflow Automation That Holds Up in Production",
    description:
      "Connect your tools and automate the manual steps between them, with retries, alerts, and audit trails so nothing fails silently.",
    seoTitle: "Workflow Automation Services for Business Operations",
    seoDescription:
      "Automate manual handoffs across 500+ tools with retries, alerts, audit trails, and human checkpoints. Cut 90% of busywork. Built to run reliably in production.",
    overview:
      "Most operational drag does not come from any single tool. It comes from the gaps between them: exporting a report and pasting it into a spreadsheet, re-keying an invoice, chasing three people for an approval. Each handoff looks small. Together they consume entire roles. Workflow Automation removes that work and runs it reliably in production.",
    longBody: [
      "The deeper problem is trust. Many teams have tried automation before and been burned: a step fails quietly at 2am, no one notices, and a customer order slips through. After that happens once, people go back to doing the work by hand, and you pay for the tool and the manual labor both. The cost is real even though it never shows up as a line item. It is paid in overtime, delayed approvals, and skilled people doing copy-and-paste.",
      "We start by mapping how the work actually moves through your business, including the exceptions your team handles on instinct, because that is where manual work hides. We connect your existing tools through 500+ integrations and webhooks, then run every workflow with the controls that make automation dependable: retries on failed steps, alerts to the right person, audit trails on every run, and human checkpoints wherever revenue, compliance, or reputation is at stake. The logic lives in a visual builder your operations team can read and adjust.",
    ],
    howItWorks: [
      { title: "Model the real process", body: "We document the full workflow including the edge cases that off-the-shelf tools ignore, because that is where the manual work lives." },
      { title: "Connect your stack", body: "500+ integrations and webhooks link your CRM, accounting, support, and internal systems without replacing anything." },
      { title: "Run it so you can trust it", body: "Retries, alerts, audit trails, and human checkpoints mean nothing fails silently and people keep the judgment." },
    ],
    outcomes: [
      { value: "500+", label: "App integrations available" },
      { value: "90%", label: "Less time on manual tasks" },
      { value: "0", label: "Silently dropped tasks" },
    ],
    capabilities: [
      "Business process automation",
      "Internal operations",
      "HR and employee workflows",
      "Finance workflows",
      "CRM workflows",
      "Reporting automation",
    ],
    faqs: [
      { q: "Will this work with the tools we already use?", a: "In almost all cases, yes. We connect through 500+ integrations plus webhooks, so your existing systems keep working as they are. We automate the handoffs between them rather than asking you to switch platforms." },
      { q: "What happens when a step fails?", a: "It does not fail silently. The step retries automatically, and if it still cannot complete or needs judgment, the workflow alerts the right person, with a full audit trail of what happened." },
      { q: "Can our team change the logic later?", a: "Yes. Workflows are built in a visual builder, so your operations team can read and adjust the logic as your processes change." },
    ],
  },
  {
    slug: "ai-solutions",
    num: "04",
    name: "AI Solutions",
    title: "Custom AI That Reaches Production and Stays There",
    description:
      "Custom AI built around your data and the metric you need to move, evaluated from day one and shipped into your stack with monitoring.",
    seoTitle: "Custom AI Solutions & ML Development",
    seoDescription:
      "Custom AI and ML built around your data and the metric you need to move. Evaluated from day one, shipped into your stack with monitoring. Live in weeks, not quarters.",
    overview:
      "AI disappoints two ways. Off-the-shelf tools work until your process gets specific. Custom AI often dies in a notebook: it scores well, the demo impresses, and then it never gets wired into the systems people use. We build for the opposite outcome: AI that runs inside your business, measured against a number you care about.",
    longBody: [
      "Every engagement starts from the problem and the metric, not the technology. Before any model, we agree on the business outcome and the exact metric that defines success: response time, accuracy, cost per case, conversion, hours saved. If we cannot tie the work to a number that matters to you, we do not start it. Then we assess the data you actually have, and we are honest about what is and is not worth building.",
      "We are eval-first, measuring performance against real conditions from the very first sprint rather than at the end, so you see how the system actually performs early and we tune toward the metric throughout. We ship into your stack with monitoring, so performance stays visible after launch and does not quietly drift. Your data is used only for your project and is never used to train models outside your engagement.",
    ],
    howItWorks: [
      { title: "Start from the problem and metric", body: "We agree on the business outcome and the exact number that defines success before any model is built." },
      { title: "Assess the data and build", body: "We check what your data can support, then build and evaluate against real conditions, not tidy benchmarks." },
      { title: "Ship into your stack with monitoring", body: "The system runs where your team works, with monitoring that keeps performance visible and honest over time." },
    ],
    outcomes: [
      { value: "Custom", label: "Models built for your data" },
      { value: "Eval-first", label: "Measured from sprint one" },
      { value: "In-stack", label: "Deployed where you work" },
    ],
    capabilities: [
      "Custom AI agents",
      "Internal assistants and copilots",
      "Knowledge systems",
      "Document intelligence",
      "AI-powered search",
      "Custom AI applications",
    ],
    faqs: [
      { q: "How do you handle our data?", a: "Your data is used only for your project. It is never used to train models outside of your engagement, and the system is built and deployed inside your own stack." },
      { q: "How do we know the AI works before we rely on it?", a: "We are eval-first. We define the success metric up front and measure against real conditions from the first sprint, so you see honest performance numbers early." },
      { q: "What if our data is not perfect?", a: "That is normal and part of the work. Early on we assess what your data can support today and what would strengthen it, and we are direct about what is worth building now." },
    ],
  },
];

export function getSolution(slug: string): SolutionLeaf | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}
