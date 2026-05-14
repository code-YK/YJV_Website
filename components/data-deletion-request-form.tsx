"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function DataDeletionRequestForm() {
  const [state, setState] = useState<FormState>('idle')
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    product: '',
    requestDetails: '',
  })

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setState('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/data-deletion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(payload?.error ?? 'Unable to submit the request. Please try again.')
      }

      setState('success')
      setMessage(
        payload?.message ??
          'Your deletion request has been received. We will review and respond within 7 business days.',
      )
      setFormData({
        fullName: '',
        email: '',
        product: '',
        requestDetails: '',
      })
    } catch (error) {
      setState('error')
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again later.')
    }
  }

  return (
    <section id="deletion-form" className="rounded-3xl border border-border bg-muted/30 p-6 shadow-sm sm:p-8">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Submit a deletion request</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Use this form if you want to request deletion of personal data associated with a product,
          chatbot, website, or workflow operated by YJVentures.
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit} aria-label="Data deletion request form">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium text-foreground">Full name</label>
            <Input
              id="fullName"
              name="fullName"
              autoComplete="name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email address</label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="product" className="text-sm font-medium text-foreground">Product, site, or service name</label>
          <Input
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            placeholder="Example: WhatsApp assistant, web dashboard, or automation workflow"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="requestDetails" className="text-sm font-medium text-foreground">Request details</label>
          <Textarea
            id="requestDetails"
            name="requestDetails"
            value={formData.requestDetails}
            onChange={handleChange}
            placeholder="Tell us which data you want deleted and any identifiers that help us verify your account."
            rows={6}
            required
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" disabled={state === 'submitting'} className="sm:min-w-44">
            {state === 'submitting' ? 'Submitting request...' : 'Submit deletion request'}
          </Button>
          <Button type="button" variant="outline" asChild>
            <a href="mailto:info@yjventures.in?subject=Data%20Deletion%20Request">Email instead</a>
          </Button>
        </div>

        {message ? (
          <p
            className={state === 'error' ? 'text-sm text-destructive' : 'text-sm text-emerald-700 dark:text-emerald-400'}
            role="status"
            aria-live="polite"
          >
            {message}
          </p>
        ) : null}
      </form>
    </section>
  )
}