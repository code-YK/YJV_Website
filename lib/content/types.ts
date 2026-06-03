export type IconName =
  | "Bot"
  | "Boxes"
  | "BrainCircuit"
  | "Briefcase"
  | "Building2"
  | "Cloud"
  | "Code2"
  | "Compass"
  | "CreditCard"
  | "Database"
  | "Factory"
  | "FileText"
  | "GraduationCap"
  | "Headphones"
  | "Heart"
  | "HeartPulse"
  | "Home"
  | "LayoutGrid"
  | "Layers"
  | "LifeBuoy"
  | "Lightbulb"
  | "LineChart"
  | "MessageSquare"
  | "MonitorSmartphone"
  | "Palette"
  | "PenTool"
  | "Rocket"
  | "Server"
  | "ShieldCheck"
  | "ShoppingBag"
  | "Smartphone"
  | "Sparkles"
  | "Store"
  | "TestTube2"
  | "Workflow"
  | "Wrench"
  | "Zap";

export interface CTA {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Service {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  useCases: string[];
  proofPoint?: string;
  bestFor?: string;
  engagement?: string;
  icon: IconName;
  image?: string;
  imageAlt?: string;
}

export interface IndustryImages {
  hero: string;
  card: string;
  secondary: string;
  alt: string;
}

export interface Industry {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  bestFor: string;
  regulations?: string;
  proofLine: string;
  painPoints: string[];
  outcomes: string[];
  signals?: string[];
  icon: IconName;
  images: IndustryImages;
}

export interface Solution {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  pricing: string;
  timeline: string;
  idealFor: string;
  notFor?: string;
  outcomes: string[];
  features: string[];
  workflow: string[];
  icon: IconName;
}

export interface ProcessStep {
  step: number;
  name: string;
  description: string;
  deliverables: string[];
  icon: IconName;
}

export interface Testimonial {
  quote: string;
  authorRole: string;
  authorCompany: string;
  authorName?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}

export interface Stat {
  value: string;
  /** Numeric target for count-up animation. If omitted, value renders as-is. */
  target?: number;
  /** Suffix appended after the animated number (e.g. "+", "%"). */
  suffix?: string;
  /** Prefix prepended before the animated number. */
  prefix?: string;
  label: string;
  context?: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
  icon: IconName;
}

export type TechCategory = "frontend" | "backend" | "ai" | "infra" | "data";

export interface TechItem {
  name: string;
  category: TechCategory;
  icon: IconName;
}

export interface Role {
  slug: string;
  name: string;
  description: string;
  skills: string[];
  experience: string;
  icon: IconName;
}

export interface EngagementModel {
  name: string;
  tagline: string;
  description: string;
  bestFor: string[];
  commitment: string;
  icon: IconName;
  featured?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface SocialLink {
  platform: "linkedin" | "twitter" | "github";
  href: string;
  label: string;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export interface FooterConfig {
  tagline?: string;
  columns: FooterColumn[];
  social: SocialLink[];
  copyright: string;
}
