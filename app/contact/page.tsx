import type { Metadata } from "next";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHero } from "@/components/contact/ContactHero";
import { SectionHead, Prose } from "@/components/site/primitives";
import { Steps } from "@/components/site/sections";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Contact: One Business-Day Reply, No Sales Script",
  "Tell us the process slowing your team down. We reply within one business day with an honest read on automation, scope, and timeline. NDA on request.",
  "/contact",
);

const CONSULTATION_STEPS = [
  {
    title: "Discovery Call",
    body: "A focused 30-minute conversation about the problem, not a pitch. You get an honest read on whether automation is the right fit.",
  },
  {
    title: "Process Assessment",
    body: "We map the workflow you want to fix: the volume, the channels, the tools you already run, and the points where things break. You get a clear view of where time and money leak.",
  },
  {
    title: "Solution Design",
    body: "We propose the specific automation, where AI does the work, and where a human stays in the loop on anything tied to revenue, compliance, or reputation. You get a concrete plan to evaluate before committing.",
  },
  {
    title: "Implementation Roadmap",
    body: "A staged build with success metrics defined from sprint one. You get a timeline and scope, usually live in 1 to 2 weeks.",
  },
];

const CONTACT_INTRO = [
  "What happens after you reach out: a real person from our team reads your message and replies within one business day. No auto-responder loop, no junior rep working from a script. If a call makes sense, we'll book a focused 30-minute walkthrough that connects your situation to what an automation rollout would actually look like, including a sandboxed version against your stack where it helps.",
  "We work best when the conversation starts with the problem, not the product. Tell us what's slowing your team down (the inquiries you can't answer fast enough, the manual process that keeps breaking, the support queue that buries you at peak) and roughly what a good outcome looks like. From there we can tell you honestly whether automation is the right fit, what it would take, and what to expect, before anyone signs anything.",
  "It helps to come with a rough sense of scale: how many conversations, leads, or tickets you handle, which channels they come through, and what tools you already run. None of it needs to be precise; it just lets us give you a more useful answer on the first call instead of a generic one.",
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
          <SectionHead
            eyebrow="How a project starts"
            title="From first call to a working system."
          />
          <Steps steps={CONSULTATION_STEPS} />
        </div>

        <div className="mt-20 border-t border-hub-rule pt-16">
          <SectionHead eyebrow="What to expect" title="A real reply, not a script." />
          <Prose paragraphs={CONTACT_INTRO} />
        </div>
      </div>
    </main>
  );
}
