import type { Metadata } from "next";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHero } from "@/components/contact/ContactHero";
import { SectionHead, Prose } from "@/components/site/primitives";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Contact YJ Ventures",
  "Tell us what you're trying to ship. One business-day response, NDA on request, no sales scripts.",
  "/contact",
);

const CONTACT_INTRO = [
  "What happens after you reach out: a real person from our team reads your message and replies within one business day — no auto-responder loop, no junior rep working from a script. If a call makes sense, we'll book a focused 30-minute walkthrough that connects your situation to what an automation rollout would actually look like, including a sandboxed version against your stack where it helps.",
  "We work best when the conversation starts with the problem, not the product. Tell us what's slowing your team down — the inquiries you can't answer fast enough, the manual process that keeps breaking, the support queue that buries you at peak — and roughly what a good outcome looks like. From there we can tell you honestly whether automation is the right fit, what it would take, and what to expect, before anyone signs anything.",
  "It helps to come with a rough sense of scale — how many conversations, leads, or tickets you handle, which channels they come through, and what tools you already run. None of it needs to be precise; it just lets us give you a more useful answer on the first call instead of a generic one.",
  "Prefer email or phone? You'll find both in the details opposite. NDAs are available on request, and everything you share is handled in line with our privacy policy.",
];

export default function ContactPage() {
  return (
    <main className="relative w-full bg-hub-paper pt-32 pb-24 md:pt-40">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12">
        <ContactHero />

        <div className="mt-20 grid grid-cols-1 gap-16 border-t border-hub-rule pt-16 lg:grid-cols-2 lg:gap-24">
          <ContactInfo />
          <ContactForm />
        </div>

        <div className="mt-20 border-t border-hub-rule pt-16">
          <SectionHead eyebrow="What to expect" title="A real reply, not a script." />
          <Prose paragraphs={CONTACT_INTRO} />
        </div>
      </div>
    </main>
  );
}
