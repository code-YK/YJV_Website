import type { Metadata } from 'next'
import { Shield, Database, Globe2, MessageSquareText, Users, Trash2, Cookie } from 'lucide-react'
import { LegalPageShell } from '@/components/legal-page-shell'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how YJVentures collects, uses, stores, shares, and protects personal data across its AI and automation products.',
  openGraph: {
    title: 'Privacy Policy | YJVentures',
    description: 'Learn how YJVentures collects, uses, stores, shares, and protects personal data across its AI and automation products.',
    url: '/privacy',
    type: 'article',
  },
}

const collectionItems = [
  'Name and company or organization details when you submit a lead, inquiry, support request, or booking.',
  'Phone number and email address when you use WhatsApp, web forms, appointment flows, or account sign-up.',
  'Messages, chats, call notes, appointment details, workflow inputs, and other content you share with our systems.',
  'Device, browser, IP address, language, session, and usage metadata collected automatically for security and performance.',
  'Usage analytics, event logs, interaction patterns, and error reports that help us improve service reliability.',
]

const useItems = [
  'Deliver the product, communication service, automation workflow, or support experience you request.',
  'Send notifications, reminders, confirmations, and follow-up messages related to your interactions.',
  'Respond to support requests, troubleshoot issues, and manage operational communications.',
  'Power AI features, routing logic, workflow triggers, personalization, and product improvement efforts.',
  'Monitor security, detect abuse or fraud, and maintain service integrity across our platforms.',
]

const thirdPartyItems = [
  'Meta and WhatsApp Business infrastructure where messaging is delivered through WhatsApp.',
  'Cloud hosting, storage, monitoring, or infrastructure providers used to run our applications and databases.',
  'Analytics, logging, and performance tools that help us understand service behavior.',
  'Payment processors or billing systems if a product includes paid features, subscriptions, or transactions.',
]

const rightsItems = [
  'Request access to personal data we hold about you.',
  'Request correction, update, or deletion of your personal data, subject to legal exceptions.',
  'Withdraw consent where processing is based on consent and the law allows withdrawal.',
  'Object to or restrict certain types of processing where applicable under local law.',
]

export default function PrivacyPage() {
  return (
    <LegalPageShell
      eyebrow="Privacy Policy"
      title="Privacy Policy"
      description="This policy explains how YJVentures handles personal information across its AI-powered communication, automation, support, and business workflow products and services."
      updatedAt="May 14, 2026"
      sidebarTitle="Quick facts"
      sidebarItems={[
        { label: 'Company', value: 'YJVentures' },
        { label: 'Website', value: 'https://www.yjventures.in' },
        { label: 'Contact', value: 'info@yjventures.in' },
        { label: 'Scope', value: 'Applies to current and future YJVentures products, brands, and service channels.' },
      ]}
      sidebarNote="For privacy or deletion requests, contact us at info@yjventures.in. We support future products and brands under the YJVentures umbrella."
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">1. Introduction</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          YJVentures provides AI-powered communication, automation, appointment management, customer support,
          and business workflow solutions through WhatsApp, web applications, chatbots, SaaS dashboards,
          automation systems, and related digital channels. This Privacy Policy explains how we collect,
          use, disclose, store, and protect personal data when you interact with our products, websites,
          services, and support teams.
        </p>
        <p className="text-sm leading-7 text-muted-foreground">
          This policy is intentionally broad so it can apply to multiple products, brands, and industries
          that YJVentures may launch in the future. Where a specific product has a separate privacy notice,
          that notice may supplement this policy.
        </p>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <Database className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">2. Information we collect</h2>
        </div>
        <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
          {collectionItems.map((item) => (
            <li key={item} className="flex gap-3 rounded-2xl border border-border bg-background/70 p-4">
              <span className="mt-2 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <MessageSquareText className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">3. How we use personal data</h2>
        </div>
        <ul className="grid gap-3 text-sm leading-7 text-muted-foreground lg:grid-cols-2">
          {useItems.map((item) => (
            <li key={item} className="rounded-2xl border border-border bg-background/70 p-4">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <Globe2 className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">4. Third-party integrations</h2>
        </div>
        <p className="text-sm leading-7 text-muted-foreground">
          Some products rely on third-party services to function. Data may be shared with or processed by
          those providers only as needed to operate the service, maintain security, or fulfill a request.
        </p>
        <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
          {thirdPartyItems.map((item) => (
            <li key={item} className="rounded-2xl border border-border bg-background/70 p-4">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-border bg-muted/30 p-5">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight text-foreground">5. Data retention and security</h2>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            We keep personal data only for as long as necessary to provide services, comply with legal
            obligations, resolve disputes, enforce agreements, and maintain records for legitimate business
            purposes. Retention periods may vary by product, region, and legal requirement.
          </p>
          <p className="text-sm leading-7 text-muted-foreground">
            We use commercially reasonable administrative, technical, and organizational safeguards designed
            to protect personal data against unauthorized access, loss, misuse, alteration, or disclosure.
            No online system can be guaranteed to be completely secure.
          </p>
        </div>

        <div className="space-y-4 rounded-3xl border border-border bg-muted/30 p-5">
          <div className="flex items-center gap-3">
            <Cookie className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight text-foreground">6. Cookies and tracking</h2>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            We may use cookies, pixels, local storage, and similar technologies to remember preferences,
            measure performance, improve user experience, and understand how visitors interact with our
            websites and product interfaces. Where required, we will request consent before placing non-essential
            cookies or similar tracking tools.
          </p>
          <p className="text-sm leading-7 text-muted-foreground">
            You can usually control cookies through your browser settings, though some features may not work
            properly if cookies are disabled.
          </p>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">7. Your rights and deletion options</h2>
        </div>
        <p className="text-sm leading-7 text-muted-foreground">
          Depending on your location and the applicable law, you may have rights to access, correct, delete,
          or limit the use of your personal data. You may also request that we stop certain communications,
          subject to legal or operational requirements.
        </p>
        <ul className="grid gap-3 text-sm leading-7 text-muted-foreground lg:grid-cols-2">
          {rightsItems.map((item) => (
            <li key={item} className="rounded-2xl border border-border bg-background/70 p-4">
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm leading-7 text-muted-foreground">
          To request deletion, email info@yjventures.in or use our dedicated data deletion page. We may
          verify identity before acting on a request and may retain information where the law allows or requires it.
        </p>
      </section>

      <section className="space-y-4 rounded-3xl border border-border bg-background/70 p-5">
        <div className="flex items-center gap-3">
          <Trash2 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight text-foreground">8. Children, international processing, and AI limits</h2>
        </div>
        <p className="text-sm leading-7 text-muted-foreground">
          Our services are not intended for children under the age required by applicable law, and we do not
          knowingly collect personal data from children without appropriate authorization. If you believe a
          child has provided us personal data, contact us and we will take reasonable steps to review the request.
        </p>
        <p className="text-sm leading-7 text-muted-foreground">
          Because YJVentures may use cloud infrastructure and third-party processors, your data may be processed
          outside your country of residence. Where required, we use lawful transfer mechanisms and contractual
          protections appropriate to the service.
        </p>
        <p className="text-sm leading-7 text-muted-foreground">
          Some products use AI-generated responses. AI output may be incomplete, inaccurate, or outdated and
          should not be treated as legal, financial, medical, or other professional advice unless a separate
          written agreement says otherwise.
        </p>
      </section>

      <section className="space-y-4 rounded-3xl border border-border bg-muted/30 p-5">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">9. Contact and policy updates</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          If you have questions about this Privacy Policy or our data practices, contact YJVentures at
          info@yjventures.in. We may update this policy from time to time to reflect product changes, legal
          requirements, or operational updates. The revised version will be posted on this page with a new
          effective date when appropriate.
        </p>
      </section>
    </LegalPageShell>
  )
}