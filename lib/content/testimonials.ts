import type { Testimonial } from "./types";

// Anonymised by client request. Named quotes can be added by setting
// authorName on any entry, Testimonials.tsx prefers it over authorRole.
export const testimonials: Testimonial[] = [
  {
    quote:
      "They automated 70% of our onboarding ops in six weeks. Our CS team finally has time for the conversations that actually move retention.",
    authorRole: "Head of Operations",
    authorCompany: "Series B SaaS · North America",
    rating: 5,
  },
  {
    quote:
      "Our AI copilot now resolves 40% of inbound support before a human ever sees it, and CSAT went up, not down. That's the bar.",
    authorRole: "Head of Customer Experience",
    authorCompany: "DTC Commerce · UK",
    rating: 5,
  },
  {
    quote:
      "MVP shipped in nine weeks. Seed round closed two weeks after launch. The architecture they left us is still the one running in production today.",
    authorRole: "Founder & CEO",
    authorCompany: "FinTech Startup · India",
    rating: 5,
  },
  {
    quote:
      "Best technical partner we've worked with, period. They write code we trust enough to run unattended in production. The agents don't drift.",
    authorRole: "CTO",
    authorCompany: "Healthcare Platform · EU",
    rating: 5,
  },
];
