"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTA } from "@/components/cta"
import { Button } from "@/components/ui/button"
import { Bot, Database, BarChart3, Workflow, Shield, Zap, Globe, Settings, ArrowRight } from "lucide-react"
import anime from "@/lib/anime"

const platformFeatures = [
  {
    id: "chatbot",
    icon: Bot,
    title: "Chatbot Engine",
    description: "Build and deploy intelligent chatbots with our visual builder. No coding required.",
    details: [
      "Visual conversation flow builder",
      "Natural language understanding",
      "Multi-channel deployment",
      "A/B testing capabilities",
    ],
  },
  {
    id: "crm",
    icon: Database,
    title: "CRM Integration",
    description: "Seamlessly connect with your existing CRM or use our built-in contact management.",
    details: [
      "Native Salesforce, HubSpot integration",
      "Custom CRM connectors",
      "Real-time data sync",
      "Unified customer profiles",
    ],
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Get deep insights into your automation performance with comprehensive analytics.",
    details: [
      "Real-time metrics",
      "Conversion tracking",
      "Custom reports",
      "Export capabilities",
    ],
  },
  {
    id: "workflow",
    icon: Workflow,
    title: "Workflow Automation",
    description: "Create powerful automations that connect your entire business ecosystem.",
    details: [
      "500+ pre-built integrations",
      "Conditional logic",
      "Scheduled triggers",
      "Webhook support",
    ],
  },
]

const additionalFeatures = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption and advanced access controls.",
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Built for scale with 99.99% uptime and sub-second response times.",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description: "Deployed across multiple regions for low latency worldwide.",
  },
  {
    icon: Settings,
    title: "API First",
    description: "Comprehensive REST and GraphQL APIs for custom integrations.",
  },
]

export default function PlatformPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    anime({
      targets: heroRef.current,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 600,
      easing: "easeOutCubic",
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 600,
              easing: "easeOutCubic",
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    featuresRef.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div ref={heroRef} className="text-center max-w-3xl mx-auto opacity-0">
            <div className="inline-flex items-center gap-2 bg-muted rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium text-primary">YJ AI Automation Suite</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              The Complete{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Automation Platform
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Everything you need to build, deploy, and scale intelligent automation across your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent text-white">
                <Link href="/contact#demo">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Talk to Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Platform Capabilities
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful tools designed to work together seamlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {platformFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.id}
                  id={feature.id}
                  ref={(el) => { if (el) featuresRef.current[index] = el }}
                  className="bg-card rounded-2xl border border-border p-8 opacity-0"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-2 text-sm text-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Built for Enterprise
            </h2>
            <p className="text-lg text-muted-foreground">
              Security, performance, and reliability at every layer.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  ref={(el) => { if (el) featuresRef.current[platformFeatures.length + index] = el }}
                  className="text-center p-6 opacity-0"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  )
}
