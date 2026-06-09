/**
 * Platform content: the YJ AI Automation Suite hub + its leaf capability pages
 * (Chatbot Engine, CRM Integration, Analytics Dashboard), expanded with detail.
 * Workflow Automation lives under /solutions. Copy is em-dash-free per brand
 * voice; all numbers retained.
 */
import type { Step, Faq } from "@/lib/content/site/solutions";

export interface PlatformCapability {
  /** Leaf slug under /platform, or an external solutions href. */
  slug: string;
  href: string;
  name: string;
  blurb: string;
}

export const PLATFORM_CAPABILITIES: PlatformCapability[] = [
  {
    slug: "chatbot",
    href: "/platform/chatbot",
    name: "Chatbot Engine",
    blurb: "Design, train, and deploy intelligent chatbots from a visual builder. No code required.",
  },
  {
    slug: "crm",
    href: "/platform/crm",
    name: "CRM Integration",
    blurb: "Keep contacts, conversations, and outcomes in sync with your CRM, in real time, both directions.",
  },
  {
    slug: "analytics",
    href: "/platform/analytics",
    name: "Analytics Dashboard",
    blurb: "See every automated conversation and workflow as live metrics you can act on.",
  },
  {
    slug: "workflow",
    href: "/solutions/workflow-automation",
    name: "Workflow Automation",
    blurb: "Connect your whole stack and let the repetitive work run itself.",
  },
];

export interface EnterprisePillar {
  name: string;
  blurb: string;
}

export const PLATFORM_ENTERPRISE: EnterprisePillar[] = [
  { name: "Enterprise Security", blurb: "SOC 2 compliant with end-to-end encryption and advanced access controls." },
  { name: "High Performance", blurb: "Built for scale with 99.99% uptime and sub-second response times." },
  { name: "Global Infrastructure", blurb: "Deployed across multiple regions for low latency worldwide." },
  { name: "API First", blurb: "Comprehensive REST and GraphQL APIs for custom integrations." },
];

export interface PlatformLeaf {
  slug: string;
  /** Two-digit index shown in the overview eyebrow. */
  num: string;
  name: string;
  description: string;
  /** Expanded overview paragraph. */
  overview: string;
  /** Long-form detail (2–3 paragraphs). */
  longBody: string[];
  features: string[];
  howItWorks: Step[];
  useCases: string[];
  faqs: Faq[];
}

export const PLATFORM_LEAVES: PlatformLeaf[] = [
  {
    slug: "chatbot",
    num: "01",
    name: "Chatbot Engine",
    description: "Design flows in a visual builder, train them on your own content, and deploy to every channel from one build.",
    overview:
      "A chatbot is only useful if it's accurate and easy to change, and most fail on one or both. The Chatbot Engine gives you a visual builder to design conversation flows, train them on your own content, and deploy across channels, with natural-language understanding handling the messy reality of how people actually type.",
    longBody: [
      "Most chatbots fail one of two ways. They need engineering for every tweak, so they slowly go stale, or they're built on rigid decision trees that fall apart the moment a customer phrases something unexpectedly. The Chatbot Engine avoids both: a visual builder anyone on your team can use, backed by natural-language understanding that copes with how people really type.",
      "You design the conversation flow by dragging and dropping, train the bot on your own documents and FAQs so its answers stay grounded in your truth, and publish it to web, WhatsApp, and messaging from a single build. Because it's visual, your team can iterate on flows and wording without waiting on developers, and A/B test variations to see what actually converts. It stays grounded in your approved knowledge, so it helps customers instead of inventing answers, and hands off to a human the moment a case needs one.",
    ],
    features: [
      "Visual conversation flow builder",
      "Natural language understanding",
      "Multi-channel deployment",
      "A/B testing capabilities",
    ],
    howItWorks: [
      { title: "Design the flow", body: "Drag and drop your conversation logic in the visual builder. No code required." },
      { title: "Train on your content", body: "Point it at your docs, FAQs, and product info so it answers from your knowledge." },
      { title: "Deploy everywhere", body: "Publish the same bot to web, WhatsApp, and messaging in one click." },
    ],
    useCases: ["Lead capture & qualification", "Support deflection", "Booking & scheduling", "Product guidance"],
    faqs: [
      { q: "Do I need to write code?", a: "No. The visual builder covers most flows, and we help wire up any advanced logic." },
      { q: "Which channels can I deploy to?", a: "Web, WhatsApp, and major messaging platforms, all from a single build." },
      { q: "Can I test different versions?", a: "Yes. A/B test flows and messages to see what converts best." },
    ],
  },
  {
    slug: "crm",
    num: "02",
    name: "CRM Integration",
    description: "Keep contacts, conversations, and outcomes in sync between YJ Ventures and your CRM, in real time, both directions, with no duplicates.",
    overview:
      "Your automation is only as good as the data behind it. CRM Integration keeps contacts, conversations, and outcomes in sync between YJ Ventures and your CRM, in real time and in both directions, so every team works from one accurate picture of each customer.",
    longBody: [
      "Automation that doesn't sync with your CRM creates a second source of truth, and a second place for things to go wrong. Reps end up reconciling records by hand, marketing works from stale lists, and the customer experience suffers because no one has the full picture. CRM Integration removes that friction by keeping contacts, conversations, and outcomes consistent between YJ Ventures and your CRM, automatically and in real time.",
      "We connect through native Salesforce and HubSpot integrations or a custom connector for your system, map your fields so every contact, deal, and activity lands where it belongs, and sync changes in both directions the moment they happen. Matching rules keep profiles unified and free of duplicates, so sales, support, and marketing all work from the same accurate record. No manual data entry, no stale records, no rep opening a call blind.",
    ],
    features: [
      "Native Salesforce and HubSpot integration",
      "Custom CRM connectors",
      "Real-time data sync",
      "Unified customer profiles",
    ],
    howItWorks: [
      { title: "Connect your CRM", body: "Native connectors for Salesforce and HubSpot, or a custom connector for yours." },
      { title: "Map your fields", body: "We map contacts, deals, and activities so every record lands where it belongs." },
      { title: "Sync in real time", body: "Updates flow both ways instantly, with unified profiles across your tools." },
    ],
    useCases: ["Unified customer profiles", "Automatic lead sync", "Activity logging", "Pipeline updates"],
    faqs: [
      { q: "Which CRMs do you support?", a: "Salesforce and HubSpot natively, plus custom connectors for other systems." },
      { q: "Is the sync real-time?", a: "Yes. Changes propagate in both directions in real time." },
      { q: "How do you handle duplicate records?", a: "Matching rules keep profiles unified and deduplicated automatically." },
    ],
  },
  {
    slug: "analytics",
    num: "03",
    name: "Analytics Dashboard",
    description: "Turn every automated conversation and workflow into live metrics, so you can see what's working, what's leaking, and exactly where to tune.",
    overview:
      "You can't improve what you can't see. The Analytics Dashboard turns every automated conversation and workflow into clear metrics (response times, conversion, resolution, volume) so you know what's working, what's leaking, and exactly where to tune.",
    longBody: [
      "Automation without measurement is a leap of faith. You can't tell whether your assistant is resolving issues or quietly frustrating customers, whether response times are improving, or where conversations are dropping off, so you can't improve any of it. The Analytics Dashboard turns every automated interaction and workflow into clear, real-time metrics, making the performance of your automation something you can actually see and manage.",
      "It tracks the numbers that matter (response times, conversion, resolution rate, volume, and your own custom events) and surfaces them on live dashboards as conversations happen, alongside the cost of every workflow. When you need to share results or dig deeper, you build custom reports and export them in a click. Because we build evaluation in from the start, you always know not just that automation is running, but whether it's working, and exactly where to tune.",
    ],
    features: [
      "Real-time metrics",
      "Conversion tracking",
      "Custom reports",
      "Export capabilities",
    ],
    howItWorks: [
      { title: "Capture everything", body: "Every interaction and outcome is tracked automatically. No manual logging." },
      { title: "See it live", body: "Real-time dashboards surface the metrics that actually matter to your team." },
      { title: "Report & export", body: "Build custom reports and export them for stakeholders in a click." },
    ],
    useCases: ["Conversion tracking", "Response-time monitoring", "Volume & trend analysis", "Custom reporting"],
    faqs: [
      { q: "What metrics does it track?", a: "Response times, conversion, resolution rate, volume, and your own custom events." },
      { q: "Can I export the data?", a: "Yes. Custom reports and exports are built in." },
      { q: "Is the data real-time?", a: "Yes, dashboards update in real time as conversations happen." },
    ],
  },
];

export function getPlatformLeaf(slug: string): PlatformLeaf | undefined {
  return PLATFORM_LEAVES.find((l) => l.slug === slug);
}
