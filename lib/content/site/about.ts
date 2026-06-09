/**
 * About page content: story, by-the-numbers stats, values, and team. Copy is
 * em-dash-free per brand voice; all numbers retained.
 */
export const ABOUT_STORY =
  "YJ Ventures started in 2020 with a narrow, frustrating problem: businesses were losing leads because they replied to WhatsApp messages too slowly. We built automation to answer those conversations fast, and the results were immediate enough that clients asked us to fix the next bottleneck, and the next. Since then we have grown into a team of 40+ people serving more than 500 clients across five continents and nine industries. The lesson that shapes everything we do: the hard part is rarely the technology. It is making automation fit how a business actually runs, and earning enough trust that a company will let it operate unattended.";

export const ABOUT_TODAY =
  "We help businesses streamline operations, improve customer engagement, automate repetitive processes, and scale efficiently through AI, workflow automation, and custom software. We automate aggressively where mistakes are cheap, and we keep a person in the loop where revenue, compliance, or reputation is at stake. Every system is tied to a business metric and measured from the first sprint, so impact is visible and provable rather than assumed.";

export const ABOUT_MISSION =
  "To give businesses automation they can rely on without watching over it. Systems that handle real work in production, free teams from repetitive tasks, and improve how companies serve their customers, with measurable results from the start.";

export const ABOUT_VISION =
  "A future where automation is something businesses depend on quietly and confidently. Where the technology fades into the background and the only thing leaders notice is that their operation runs better, their customers are served faster, and their teams spend time on the work that matters.";

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
  { name: "Accountability over abstraction", blurb: "The people who design your system are the people who answer for it. We do not hide behind layers of process when something needs to be made right." },
  { name: "Trust is earned in production", blurb: "A demo proves nothing. We earn the right to run unattended by performing reliably on real work, day after day." },
  { name: "Judgment where it matters", blurb: "We automate aggressively where mistakes are cheap and recoverable, and keep a person in the loop where revenue, compliance, or reputation is at stake." },
  { name: "Measured, not assumed", blurb: "We tie every system to a business metric and watch it from the first sprint. If it is not working, we say so and fix it." },
];

export interface TeamMember {
  initials: string;
  name: string;
  role: string;
  blurb: string;
}

export const ABOUT_TEAM: TeamMember[] = [
  { initials: "JM", name: "Jainam Mota", role: "Co-Founder & CEO", blurb: "Sets the direction and strategy behind YJ Ventures' AI automation work." },
  { initials: "YC", name: "Yatrik Chauhan", role: "Co-Founder", blurb: "Owns product and delivery, so every rollout lands and keeps working." },
  { initials: "KS", name: "Kunj Shukla", role: "Engineering", blurb: "Builds the platform, integrations, and automation that power client workflows." },
  { initials: "KY", name: "Kuldeep Yadav", role: "Engineering", blurb: "Ships reliable AI systems and the infrastructure they run on." },
];
