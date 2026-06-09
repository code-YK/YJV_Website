import { CTASection } from "@/components/layout/CTASection";

export function FinalCTA() {
  return (
    <CTASection
      eyebrow="Start here"
      title="Tell us the process that's costing you the most."
      subtitle="We'll tell you honestly whether automation fixes it, what it would take, and a rough timeline. One business day, no sales script."
      primary={{ label: "See what we'd automate first", href: "/contact" }}
      secondary={{ label: "Talk to an engineer", href: "/contact" }}
    />
  );
}
