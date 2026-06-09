/**
 * Case studies (/case-studies). Three success stories, each Challenge /
 * Solution / Results. Copy mirrored from the reference site.
 */
export interface CaseStudy {
  num: string;
  sector: string;
  name: string;
  /** Headline outcome shown prominently. */
  metric: { value: string; label: string };
  challenge: string;
  solution: string;
  results: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    num: "01",
    sector: "Real Estate",
    name: "PropTech Solutions",
    metric: { value: "3×", label: "more qualified leads" },
    challenge:
      "Struggling to handle 200+ daily property inquiries across WhatsApp, email, and web forms with a small team, losing leads to slow response times.",
    solution:
      "Deployed an AI chatbot across all channels to qualify inquiries, answer pricing and viewing questions, and book appointments automatically, with clean handoff to agents for hot leads.",
    results: [
      "3x more qualified leads",
      "Sub-minute first response",
      "40% increase in conversions",
    ],
  },
  {
    num: "02",
    sector: "Healthcare",
    name: "MedCare Plus",
    metric: { value: "60%", label: "fewer inbound calls" },
    challenge:
      "High no-show rates (35%) and staff overwhelmed with appointment scheduling calls across multiple locations, plus long patient wait times for routine questions.",
    solution:
      "Automated appointment scheduling, reminders, and routine health-information delivery over HIPAA-compliant messaging, freeing front-desk staff for in-person care.",
    results: [
      "No-shows cut to under 12%",
      "60% fewer inbound calls",
      "24/7 patient self-service",
    ],
  },
  {
    num: "03",
    sector: "E-commerce",
    name: "StyleHub Retail",
    metric: { value: "$30k", label: "saved per month" },
    challenge:
      "Spending over $50k/month on customer support with 24-hour response times during peak seasons for order inquiries, returns, and product questions.",
    solution:
      "Rolled out AI support that understands the catalog, tracks orders, processes returns, and recommends products, escalating only complex cases to humans.",
    results: [
      "85% faster responses",
      "$30k/month support savings",
      "Higher CSAT at peak load",
    ],
  },
];
