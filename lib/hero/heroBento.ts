import type { IconName } from "@/lib/content/types";

/**
 * Content for the Integration Ledger bento, per the YJ Ventures creative brief.
 *
 * NOTE: the metric figures (500+ clients, 50M+ messages, 99.9% uptime, 24/7)
 * are marketing copy approved by the client for this hero. They are not derived
 * from a verified data source — update here if the real numbers change.
 */

export interface BentoCapability {
  icon: IconName;
  title: string;
  subtitle: string;
}

export interface BentoMetric {
  value: string;
  label: string;
}

export const bentoSectionLabel = "Everything you need to scale.";

export const bentoCapabilities: BentoCapability[] = [
  { icon: "MessageSquare", title: "WhatsApp Automation", subtitle: "Conversational flows that close" },
  { icon: "Bot", title: "AI Chatbots", subtitle: "24/7 context-aware support" },
  { icon: "LineChart", title: "Lead Generation", subtitle: "Qualify and route at scale" },
  { icon: "Workflow", title: "Workflow Automation", subtitle: "Eliminate manual handoffs" },
  { icon: "Database", title: "CRM Integration", subtitle: "Sync every system of record" },
  { icon: "BrainCircuit", title: "AI/ML Solutions", subtitle: "Custom models, productionised" },
];

export const bentoMetrics: BentoMetric[] = [
  { value: "500+", label: "Clients" },
  { value: "50M+", label: "Messages" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
];
