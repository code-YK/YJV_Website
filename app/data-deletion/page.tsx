import type { Metadata } from 'next'
import { MessageSquare, ShieldAlert, Clock3, FileCheck2, Trash2 } from 'lucide-react'
import { LegalPageShell } from '@/components/legal-page-shell'
import { DataDeletionRequestForm } from '@/components/data-deletion-request-form'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Data Deletion',
  description: 'Request deletion of personal data associated with YJVentures products through email, chat, or this form.',
  openGraph: {
    title: 'Data Deletion | YJVentures',
    description: 'Request deletion of personal data associated with YJVentures products through email, chat, or this form.',
    url: '/data-deletion',
    type: 'article',
  },
}

const methods = [
  {
    title: 'Email request',
    description: 'Send a deletion request to info@yjventures.in with your name, contact details, and the product involved.',
  },
  {
    title: 'In-app or chat request',
    description: 'If a product includes WhatsApp, chatbot, or dashboard support, submit the request through that channel.',
  },
  {
    title: 'Contact form',
    description: 'Use the form on this page to submit a deletion request directly to YJVentures.',
  },
]

export default function DataDeletionPage() {
  return (
    <LegalPageShell
      eyebrow="Data Deletion"
      title="Data Deletion Request Page"
      description="Use this page to request deletion of personal data collected by YJVentures across its products, workflows, and service channels."
      updatedAt="May 14, 2026"
      sidebarTitle="Request overview"
      sidebarItems={[
        { label: 'Response time', value: 'Within 7 business days after verification, unless a longer period is required by law.' },
        { label: 'Contact email', value: 'info@yjventures.in' },
        { label: 'Verification', value: 'We may ask for enough information to confirm identity and ownership of the request.' },
        { label: 'Retention exceptions', value: 'Some records may be kept for legal, fraud-prevention, security, or audit purposes.' },
      ]}
      sidebarNote="For the fastest response, include the product name, your email, and any identifiers that help us locate the correct record."
    >
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Trash2 className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">1. Your deletion rights</h2>
        </div>
        <p className="text-sm leading-7 text-muted-foreground">
          You may request deletion of personal data associated with YJVentures products, services, websites,
          workflows, or communications. Where deletion is not possible due to legal, fraud-prevention, security,
          or audit obligations, we will limit retention to what is necessary and lawful.
        </p>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">2. Supported request methods</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {methods.map((method) => (
            <div key={method.title} className="rounded-3xl border border-border bg-muted/20 p-5">
              <h3 className="text-lg font-semibold text-foreground">{method.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{method.description}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <a href="mailto:info@yjventures.in?subject=Data%20Deletion%20Request">Email info@yjventures.in</a>
          </Button>
          <Button asChild variant="outline">
            <a href="#deletion-form">Use the form below</a>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-border bg-background/70 p-5">
          <div className="flex items-center gap-3">
            <FileCheck2 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight text-foreground">3. Verification process</h2>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            We may ask for information that helps us verify identity, ownership, or authorization before
            completing a deletion request. This may include the name used on the account, the email address or
            phone number on file, and information about the product or conversation you used.
          </p>
        </div>

        <div className="space-y-4 rounded-3xl border border-border bg-background/70 p-5">
          <div className="flex items-center gap-3">
            <Clock3 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight text-foreground">4. Timeline and retained records</h2>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            Verified deletion requests are generally processed within 7 business days. In some cases, we may
            retain a minimal record of the request, transaction history, security logs, or legal compliance
            data where required by law or necessary to prevent fraud, abuse, or security incidents.
          </p>
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-border bg-muted/30 p-5">
        <div className="flex items-center gap-3">
          <ShieldAlert className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">5. Important notes</h2>
        </div>
        <p className="text-sm leading-7 text-muted-foreground">
          Deletion requests may not remove data immediately from backup systems, but those copies are subject
          to normal retention and deletion cycles. If a product or integration is provided through a third-party
          platform, we may need to coordinate deletion with that provider where technically and legally possible.
        </p>
      </section>

      <div className="rounded-3xl border border-border bg-background/70 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">6. Submit your request</h2>
        </div>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Use the form below to send a deletion request directly to YJVentures. You can also email us at
          info@yjventures.in if you prefer.
        </p>
      </div>

      <DataDeletionRequestForm />
    </LegalPageShell>
  )
}