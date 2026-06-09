/**
 * Industries hub + leaf pages (/industries, /industries/[slug]): outcome-led
 * hero, the challenges we solve, an overview, key benefits, common use cases,
 * and FAQs. One closing CTA (de-duplicated per the audit). Copy is em-dash-free
 * per brand voice; all numbers retained.
 */
import type { Faq } from "@/lib/content/site/solutions";

export interface IndustryLeaf {
  slug: string;
  num: string;
  name: string;
  /** Hero H1. */
  title: string;
  /** Short tagline used on the hub listing. */
  tagline: string;
  description: string;
  /** Expanded overview paragraph. */
  overview: string;
  /** Long-form detail (2 to 3 paragraphs). */
  longBody: string[];
  /** What's broken today (pain points). */
  challenges: string[];
  benefits: string[];
  useCases: string[];
  faqs: Faq[];
  /** SEO title tag for the leaf page. */
  seoTitle?: string;
  /** SEO meta description for the leaf page. */
  seoDescription?: string;
}

export const INDUSTRIES: IndustryLeaf[] = [
  {
    slug: "real-estate",
    num: "01",
    name: "Real Estate",
    title: "The first agent to reply usually wins the deal. Make that you, every time.",
    tagline: "Close more deals with always-on inquiry handling",
    description:
      "Turn property inquiries into booked viewings with an AI agent that qualifies, schedules, and follows up 24/7, across WhatsApp, portals, and your site.",
    overview:
      "Property buyers and renters move fast and expect instant answers, on the listing, the price, the next viewing. Miss the first reply and the lead is gone. We put an AI agent on every channel that qualifies inquiries, books viewings, and follows up around the clock, so your team works the deals that are actually ready.",
    longBody: [
      "In real estate, the first response often decides the deal. Buyers and renters browse many listings at once and reach out to several agents in parallel; whoever replies first, with the right information, earns the conversation. But inquiries arrive at all hours and across portals, WhatsApp, and your own site, precisely when your agents are out showing properties and can't pick up. That timing mismatch quietly costs you qualified leads every single week.",
      "We close it by putting an always-on agent on every channel. It answers pricing and availability questions instantly, qualifies the lead against your criteria, books viewings directly into your calendar, and follows up until the prospect is ready, in their preferred language. Your agents stop fielding repetitive questions and walk into every conversation already knowing what the buyer wants, what they can afford, and where they are in the journey. The pipeline gets fuller and the deals move faster.",
    ],
    challenges: [
      "Inquiries arrive 24/7 across WhatsApp, portals, and web, faster than any team can answer",
      "Hot leads go cold while agents are out showing properties",
      "Repetitive pricing and availability questions eat into selling time",
    ],
    benefits: [
      "40% increase in lead conversion",
      "Automated viewing scheduling",
      "Instant property matching",
      "Multi-language support",
    ],
    useCases: [
      "Property inquiry handling",
      "Viewing appointment booking",
      "Lead qualification",
      "Follow-up automation",
    ],
    faqs: [
      { q: "Can it book viewings automatically?", a: "Yes. The agent checks availability, books the slot, and confirms with both sides, syncing to your calendar." },
      { q: "Does it handle multiple languages?", a: "Yes, it engages buyers in their preferred language across every channel." },
      { q: "Will leads still reach my agents?", a: "Qualified, ready-to-talk leads are routed straight to the right agent with the full conversation attached." },
    ],
    seoTitle: "AI Automation for Real Estate: Lead Capture and Qualification",
    seoDescription:
      "Real estate AI automation that captures inquiries from every channel, qualifies buyers in seconds, and routes hot leads to agents before they cool.",
  },
  {
    slug: "healthcare",
    num: "02",
    name: "Healthcare",
    title: "Give your front desk its time back, without making patients wait.",
    tagline: "Smarter patient communication, fewer no-shows",
    description:
      "Automate scheduling, reminders, and routine questions over HIPAA-compliant channels, so patients get instant help and your staff get back to care.",
    overview:
      "Patients reach out for the same handful of things, appointments, reminders, refills, basic information, and every one ties up front-desk staff. We automate that routine communication over HIPAA-compliant channels so patients get instant help and your team gets time back for care.",
    longBody: [
      "Healthcare front desks run on a constant stream of routine requests: booking appointments, sending reminders, answering the same questions about hours, preparation, and refills. Each one is small, but together they consume the staff who should be focused on the patients in front of them, and they pile up into hold times that frustrate the very people you're trying to help. No-shows make it worse, leaving expensive gaps in the schedule that a timely reminder could have prevented.",
      "We automate that routine layer over HIPAA-compliant channels so patients get instant, accurate help and your team gets its time back. The assistant schedules and reschedules appointments, sends reminders that measurably cut no-shows, delivers standard health information, and handles refill requests, escalating anything clinical or sensitive to your staff with full context. The result is a front desk that breathes easier, a calendar that stays full, and patients who feel looked after even between visits.",
    ],
    challenges: [
      "High no-show rates from missed or forgotten appointments",
      "Front-desk staff overwhelmed by scheduling and routine calls",
      "Patients wait on hold for answers that could be instant",
    ],
    benefits: [
      "40% reduction in no-shows",
      "HIPAA compliant messaging",
      "Automated appointment reminders",
      "Prescription refill handling",
    ],
    useCases: [
      "Appointment scheduling",
      "Health information delivery",
      "Follow-up care coordination",
      "Patient intake",
    ],
    faqs: [
      { q: "Is it HIPAA compliant?", a: "Yes. Patient communication runs over HIPAA-compliant messaging with appropriate safeguards in place." },
      { q: "Can it reduce no-shows?", a: "Automated reminders and one-tap rescheduling typically cut no-shows substantially." },
      { q: "What can it handle on its own?", a: "Scheduling, reminders, routine health information, and refill requests, escalating anything clinical to your staff." },
    ],
    seoTitle: "AI Automation for Healthcare: Patient Communication and Intake",
    seoDescription:
      "Healthcare AI automation for scheduling, reminders, and patient questions over HIPAA-compliant channels. Cut no-shows by 40%.",
  },
  {
    slug: "ecommerce",
    num: "03",
    name: "E-commerce",
    title: "Hold your response times flat through your busiest season.",
    tagline: "Scale customer support without scaling headcount",
    description:
      "Deploy AI that knows your catalog, tracks orders, and processes returns, handling thousands of conversations at once so peak demand never tanks your CSAT.",
    overview:
      "During peak season, support volume spikes and response times balloon, right when every delayed answer costs a sale. We deploy AI that knows your catalog, tracks orders, and handles returns instantly, scaling to thousands of conversations without scaling headcount.",
    longBody: [
      "For online retailers, support volume is brutally seasonal. The same team that comfortably handles a normal week gets buried during a launch, a sale, or the holidays, exactly when fast answers convert browsers into buyers and slow ones send them to a competitor. Most of that volume is repetitive: where's my order, can I return this, does it come in another size. Answering it manually at scale is expensive, and staffing for the peak is wasteful the rest of the year.",
      "We deploy AI that knows your catalog and connects to your order system, so it can answer product questions, track shipments, process returns, and recommend alternatives, instantly, for thousands of customers at once. It holds response times flat through your busiest periods and escalates only the genuine exceptions to your team. You scale support with demand instead of headcount, protect conversion when it matters most, and keep customers happy without burning out your agents.",
    ],
    challenges: [
      "Support volume spikes far beyond what the team can staff for",
      "Slow responses during peak seasons cost conversions",
      "Repetitive order, returns, and product questions dominate the queue",
    ],
    benefits: [
      "85% faster response times",
      "Order status automation",
      "Product recommendations",
      "Returns processing",
    ],
    useCases: [
      "Product inquiries",
      "Order tracking",
      "Returns and refunds",
      "Personalized recommendations",
    ],
    faqs: [
      { q: "Does it know our product catalog?", a: "Yes. It's grounded in your catalog so it answers product questions and recommends accurately." },
      { q: "Can it process orders and returns?", a: "It tracks orders, initiates returns, and handles refunds within your rules, escalating exceptions to a human." },
      { q: "How does it handle peak load?", a: "It handles thousands of simultaneous conversations, so response times stay flat even at peak." },
    ],
    seoTitle: "AI Automation for E-commerce: Support and Lead Capture",
    seoDescription:
      "E-commerce AI automation that resolves order and product questions instantly and keeps CSAT high as you scale. 85% faster responses.",
  },
  {
    slug: "education",
    num: "04",
    name: "Education",
    title: "Answer the question that decides whether they enroll, the moment they ask it.",
    tagline: "Turn inquiries into enrollments",
    description:
      "Guide prospective students through courses, fees, deadlines, and applications with an assistant that's there whenever they're ready, and hands off to staff when it counts.",
    overview:
      "Prospective students ask the same questions at every stage, courses, fees, deadlines, enrollment steps, and a timely answer often decides whether they enroll. We automate the student journey with personalized guidance, so inquiries become enrollments without overloading your staff.",
    longBody: [
      "In education, enrollment is a series of questions answered at the right moment: about courses, fees, deadlines, and the steps to apply. Prospective students and their parents compare options and lose momentum the instant they hit a delay or a dead end. Admissions and student-services teams field the same questions hundreds of times, and the manual reminders that keep students on track are easy to let slip when volume is high.",
      "We automate the student journey with personalized guidance that's available whenever someone is ready to ask. The assistant answers course and enrollment questions, walks students through the application steps, sends payment and deadline reminders, and supports them once they're enrolled, handing off to staff when a human touch is needed. Inquiries turn into enrollments, students feel supported rather than processed, and your team is freed from repetitive Q&A to focus on the students who need real help.",
    ],
    challenges: [
      "Course and enrollment inquiries arrive faster than staff can answer",
      "Drop-off when students don't get timely guidance",
      "Manual reminders for payments and deadlines slip through the cracks",
    ],
    benefits: [
      "50% faster enrollment",
      "Course recommendations",
      "Payment reminders",
      "Progress tracking",
    ],
    useCases: [
      "Enrollment assistance",
      "Course information",
      "Schedule management",
      "Student support",
    ],
    faqs: [
      { q: "Can it guide students through enrollment?", a: "Yes. It walks students through course selection and the enrollment steps, handing off when a human is needed." },
      { q: "Does it send reminders?", a: "It sends payment, deadline, and schedule reminders automatically." },
      { q: "Can parents interact with it too?", a: "Yes, it supports parent communication alongside student support." },
    ],
    seoTitle: "AI Automation for Education: Admissions and Student Support",
    seoDescription:
      "Education AI automation that handles admissions inquiries and student support across channels, capturing prospects fast and answering 24/7.",
  },
];

export function getIndustry(slug: string): IndustryLeaf | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
