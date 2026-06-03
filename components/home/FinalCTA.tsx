import { CTASection } from "@/components/layout/CTASection";

export function FinalCTA() {
  return (
    <CTASection
      eyebrow="Let's build"
      title="Ready to transform your business?"
      subtitle="Join hundreds of companies automating their workflows with YJ Ventures."
      primary={{ label: "Book a Free Demo", href: "/contact" }}
      secondary={{ label: "Talk to Sales", href: "/contact" }}
    />
  );
}
