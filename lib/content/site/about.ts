/**
 * About page content — story, by-the-numbers stats, values, and team. Copy
 * mirrored from the reference site.
 */
export const ABOUT_STORY =
  "YJ Ventures was founded with a simple belief: that powerful automation tools should be accessible to every business, not just enterprises with deep pockets. What started as a small team helping local businesses automate WhatsApp conversations has grown into a full platform serving companies across five continents. Along the way we learned that the hard part is rarely the technology — it's making automation fit the messy reality of how a business actually operates, and earning enough trust to let it run unattended. That lesson still shapes everything we build.";

export const ABOUT_TODAY =
  "Today we help businesses of every size turn conversations into customers — capturing leads, supporting customers, and automating the busywork so teams can focus on the work that matters. We pair AI and automation engineering with a human-in-the-loop mindset, shipping systems that are measured from the first sprint and designed to compound in value over time. Whether you're a single location or a multi-region operation, the goal is the same: more done, with less friction, without losing the human touch your customers expect.";

export interface Stat {
  value: string;
  label: string;
}

export const ABOUT_STATS: Stat[] = [
  { value: "2020", label: "Founded" },
  { value: "500+", label: "Clients served" },
  { value: "50M+", label: "Messages processed" },
  { value: "99.9%", label: "Uptime" },
  { value: "40+", label: "Team members" },
];

export interface Value {
  name: string;
  blurb: string;
}

export const ABOUT_VALUES: Value[] = [
  { name: "Results-Driven", blurb: "We measure our success by the tangible outcomes we deliver for our clients. Every solution is built to move a real metric." },
  { name: "Customer-Centric", blurb: "We start from your problem, not our product — and stay with you long after launch." },
  { name: "Innovation First", blurb: "We bring the latest in AI and automation to every engagement, responsibly applied." },
  { name: "Integrity", blurb: "We do what we say, communicate clearly, and treat your data and your trust with care." },
];

export interface TeamMember {
  initials: string;
  name: string;
  role: string;
  blurb: string;
}

export const ABOUT_TEAM: TeamMember[] = [
  { initials: "JM", name: "Jainam Mota", role: "Co-Founder & CEO", blurb: "Driving the vision and strategy behind YJ Ventures' AI-powered automation solutions." },
  { initials: "YC", name: "Yatrik Chauhan", role: "Co-Founder", blurb: "Leading product and delivery so every rollout lands and keeps working." },
  { initials: "KS", name: "Kunj Shukla", role: "Engineering", blurb: "Building the platform, integrations, and automation that power client workflows." },
  { initials: "KY", name: "Kuldeep Yadav", role: "Engineering", blurb: "Shipping reliable AI systems and the infrastructure they run on." },
];
