import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { LeafHero, CtaBand } from "@/components/site/sections";
import { Section, SectionHead, Card, Prose } from "@/components/site/primitives";
import {
  PLATFORM_CAPABILITIES,
  PLATFORM_ENTERPRISE,
} from "@/lib/content/site/platform";

const PLATFORM_INTRO = [
  "The YJ AI Automation Suite is a single platform for everything it takes to put automation to work: building it, connecting it to your systems, deploying it where your customers are, and measuring whether it's actually paying off. Most teams end up stitching that together from half a dozen disconnected tools, and the seams are exactly where things break. We bring it under one roof so the pieces are designed to work together from day one.",
  "The four capabilities (the Chatbot Engine, CRM Integration, the Analytics Dashboard, and Workflow Automation) share the same data, the same deployment, and the same reporting. A lead captured by a chatbot flows straight into your CRM, triggers a workflow, and shows up in your analytics without anyone wiring it together by hand. And because it's built for the enterprise, every layer ships with the security, performance, and reliability serious teams require: SOC 2 compliance, end-to-end encryption, sub-second response times, global infrastructure, and an API-first design for anything you need to extend.",
];

export const metadata: Metadata = pageMetadata(
  "The Platform Behind Every Automation We Ship",
  "One platform powering YJ Ventures automation: a chatbot engine, bidirectional CRM integration, and an analytics dashboard built for AI-driven operations.",
  "/platform",
);

export default function PlatformPage() {
  return (
    <main>
      <LeafHero
        eyebrow="YJ AI Automation Suite"
        title="The building blocks behind every automation we ship."
        description="A chatbot engine that understands your business, CRM integration that keeps data in sync, and analytics that show exactly what your automation is doing and what it costs."
        primary={{ label: "Book a Demo", href: "/contact" }}
        secondary={{ label: "Talk to an engineer", href: "/contact" }}
      />

      <Section>
        <SectionHead eyebrow="Overview" title="One platform, not six tools." />
        <Prose paragraphs={PLATFORM_INTRO} />
      </Section>

      <Section>
        <SectionHead
          eyebrow="Capabilities"
          title="One suite. Four capabilities. Endless workflows."
          intro="Built to work together, sharing the same data, deployment, and reporting."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PLATFORM_CAPABILITIES.map((c) => (
            <Link key={c.slug} href={c.href} className="block">
              <Card title={c.name} className="h-full">
                <p className="mt-2 text-sm text-white/60">{c.blurb}</p>
                <span className="mt-4 inline-block text-sm font-medium text-hub-accent">
                  Learn more →
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Enterprise"
          title="Built for Enterprise"
          intro="Security, performance, and reliability at every layer."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORM_ENTERPRISE.map((e) => (
            <Card key={e.name} title={e.name}>
              <p className="mt-2 text-sm text-white/60">{e.blurb}</p>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
