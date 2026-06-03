import type { FaqItem } from "./types";

export const faq: FaqItem[] = [
  {
    question: "How is this different from Upwork or Toptal?",
    answer:
      "Senior-only roster, vetted by our own engineers rather than a generalist screener. Every developer comes pre-trained on AI and agent tooling, and if the fit isn't right we replace them within 7 days, no awkward back-and-forth.",
    category: "Hiring",
  },
  {
    question: "Do I own the IP?",
    answer:
      "Yes. Full code, models, infra, and runbooks are delivered with day-one IP ownership. We don't rent you a stack you can't take with you, and we don't reuse client work in other engagements.",
    category: "Engagement",
  },
  {
    question: "Can I hire them permanently later?",
    answer:
      "Yes. After 3 months of engagement you can convert the engineer to a permanent hire with a defined buyout, no recruiter fees, no separate placement contract.",
    category: "Hiring",
  },
  {
    question: "What time zones do you cover?",
    answer:
      "IST core hours by default, with at least 4 hours of live overlap available on US Eastern, UK, EU, and APAC schedules. We staff the role around your standup, not ours.",
    category: "Engagement",
  },
];
