import type { ReactNode } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'

type SidebarItem = {
  label: string
  value: string
}

type LegalPageShellProps = {
  eyebrow: string
  title: string
  description: string
  updatedAt: string
  sidebarTitle: string
  sidebarItems: SidebarItem[]
  sidebarNote: string
  children: ReactNode
}

export function LegalPageShell({
  eyebrow,
  title,
  description,
  updatedAt,
  sidebarTitle,
  sidebarItems,
  sidebarNote,
  children,
}: LegalPageShellProps) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden pt-32 pb-12 lg:pt-36 lg:pb-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_32%),radial-gradient(circle_at_top_right,rgba(29,78,216,0.1),transparent_28%),linear-gradient(to_bottom,rgba(248,250,252,0.95),rgba(255,255,255,0))]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.24em] text-primary uppercase">{eyebrow}</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">{description}</p>
            <div className="mt-6 inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm">
              Last updated: <span className="ml-2 font-medium text-foreground">{updatedAt}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
          <article className="space-y-8 rounded-3xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur sm:p-8 lg:p-10">
            {children}
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {sidebarTitle}
              </h2>
              <dl className="mt-5 space-y-4">
                {sidebarItems.map((item) => (
                  <div key={item.label} className="border-b border-border/70 pb-3 last:border-b-0 last:pb-0">
                    <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-foreground">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-primary to-accent p-6 text-primary-foreground shadow-lg">
              <h2 className="text-lg font-semibold">Need help?</h2>
              <p className="mt-2 text-sm leading-6 text-primary-foreground/85">{sidebarNote}</p>
              <div className="mt-5 flex flex-col gap-3">
                <Button asChild className="bg-background text-foreground hover:bg-background/90">
                  <Link href="mailto:info@yjventures.in">Email info@yjventures.in</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/20 bg-transparent text-primary-foreground hover:bg-white/10">
                  <Link href="/contact">Contact us</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  )
}