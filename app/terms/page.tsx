import type { Metadata } from 'next'
import { FileText, ShieldCheck, TriangleAlert, Scale, LockKeyhole, BadgeInfo } from 'lucide-react'
import { LegalPageShell } from '@/components/legal-page-shell'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms governing access to YJVentures websites, AI tools, automation services, and future software products.',
  openGraph: {
    title: 'Terms of Service | YJVentures',
    description: 'Read the terms governing access to YJVentures websites, AI tools, automation services, and future software products.',
    url: '/terms',
    type: 'article',
  },
}

const responsibilityItems = [
  'Provide accurate information and keep account or contact details up to date.',
  'Use our services only for lawful, authorized, and appropriate business or personal purposes.',
  'Maintain the confidentiality of credentials, verification links, and access methods.',
  'Review outputs, automations, and generated messages before relying on them externally.',
]

const prohibitedItems = [
  'Attempting to bypass access controls, security features, rate limits, or usage restrictions.',
  'Using the service to send spam, unlawful content, abusive messages, or harmful instructions.',
  'Uploading malware, scraping without authorization, or interfering with service availability.',
  'Misrepresenting your identity or using the platform in a way that violates applicable law.',
]

export default function TermsPage() {
  return (
    <LegalPageShell
      eyebrow="Terms of Service"
      title="Terms of Service"
      description="These terms govern access to and use of YJVentures websites, AI systems, automation products, and related services."
      updatedAt="May 14, 2026"
      sidebarTitle="At a glance"
      sidebarItems={[
        { label: 'Company', value: 'YJVentures' },
        { label: 'Contact', value: 'info@yjventures.in' },
        { label: 'Platforms', value: 'WhatsApp, web apps, chatbots, SaaS dashboards, and automation systems.' },
        { label: 'Jurisdiction', value: 'Governing law to be specified for the applicable product or contract.' },
      ]}
      sidebarNote="If you do not agree to these terms, do not access or use the services. For contract-specific terms, the signed agreement prevails where it conflicts with this page."
    >
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">1. Acceptance of terms</h2>
        </div>
        <p className="text-sm leading-7 text-muted-foreground">
          By accessing or using any YJVentures product or service, you agree to these Terms of Service and
          to any additional policies or product-specific terms referenced here. If you use a service on behalf
          of a company or organization, you represent that you have authority to bind that entity.
        </p>
      </section>

      <section className="space-y-4 rounded-3xl border border-border bg-background/70 p-5">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">2. Description of services</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          YJVentures develops and operates AI-powered communication, appointment management, customer support,
          automation, and business workflow solutions that may run through WhatsApp, web applications, chatbots,
          SaaS dashboards, APIs, integrations, and internal operational tooling. Service features may change,
          expand, or be retired over time.
        </p>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">3. User responsibilities</h2>
        </div>
        <ul className="grid gap-3 text-sm leading-7 text-muted-foreground lg:grid-cols-2">
          {responsibilityItems.map((item) => (
            <li key={item} className="rounded-2xl border border-border bg-muted/20 p-4">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <TriangleAlert className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">4. Prohibited activities</h2>
        </div>
        <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
          {prohibitedItems.map((item) => (
            <li key={item} className="rounded-2xl border border-border bg-muted/20 p-4">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-border bg-muted/30 p-5">
          <div className="flex items-center gap-3">
            <BadgeInfo className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight text-foreground">5. AI output disclaimer</h2>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            Some services generate or assist with automated responses. AI-generated content may be incomplete,
            inaccurate, or inappropriate for your specific use case. You are responsible for reviewing outputs
            before sending or relying on them. YJVentures does not guarantee that automated content will always
            be correct, lawful, or suitable for every situation.
          </p>
        </div>

        <div className="space-y-4 rounded-3xl border border-border bg-muted/30 p-5">
          <div className="flex items-center gap-3">
            <LockKeyhole className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight text-foreground">6. Third-party dependency disclaimer</h2>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            Some products depend on third-party platforms, messaging providers, cloud services, payment systems,
            and API integrations. We are not responsible for outages, delays, limitations, policy changes, or
            failures caused by those providers, though we will use reasonable efforts to maintain service continuity.
          </p>
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-border bg-background/70 p-5">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">7. Intellectual property</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          All software, designs, text, graphics, workflows, documentation, trademarks, logos, and other
          content made available by YJVentures are owned by YJVentures or its licensors and are protected by
          applicable intellectual property laws. Except as expressly permitted in writing, you may not copy,
          modify, distribute, reverse engineer, or create derivative works from our services or content.
        </p>
      </section>

      <section className="space-y-4 rounded-3xl border border-border bg-muted/30 p-5">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">8. Suspension, warranty, liability, and indemnity</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          We may suspend or terminate access if we believe you violated these terms, created risk, or used the
          services in a way that threatens users, systems, or third parties. Services are provided on an
          "as is" and "as available" basis without warranties of any kind, whether express or implied.
        </p>
        <p className="text-sm leading-7 text-muted-foreground">
          To the maximum extent permitted by law, YJVentures will not be liable for indirect, incidental,
          consequential, special, exemplary, or punitive damages, or for lost profits, revenue, data, or
          business opportunities. You agree to indemnify and hold harmless YJVentures from claims arising out
          of your use of the services, your content, or your violation of these terms.
        </p>
      </section>

      <section className="space-y-4 rounded-3xl border border-border bg-background/70 p-5">
        <div className="flex items-center gap-3">
          <Scale className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">9. Privacy, governing law, and changes</h2>
        </div>
        <p className="text-sm leading-7 text-muted-foreground">
          Your use of the services is also governed by our Privacy Policy. We may update these terms from time
          to time to reflect product changes, legal obligations, or operational needs. The updated version will
          be posted on this page with a revised effective date when appropriate.
        </p>
        <p className="text-sm leading-7 text-muted-foreground">
          Governing law: to be specified in a product agreement, order form, or applicable local notice. If no
          separate agreement applies, the governing law will be identified in a future revision of this page.
        </p>
      </section>

      <section className="space-y-4 rounded-3xl border border-border bg-muted/30 p-5">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">10. Contact information</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          Questions about these Terms of Service can be sent to info@yjventures.in.
        </p>
      </section>
    </LegalPageShell>
  )
}