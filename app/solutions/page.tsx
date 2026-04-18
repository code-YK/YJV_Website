"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTA } from "@/components/cta"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare, Workflow, Brain, ArrowRight, Check } from "lucide-react"
import anime from "@/lib/anime"

const solutions = [
  {
    id: "lead-automation",
    icon: Users,
    title: "Lead Automation",
    subtitle: "Capture & qualify leads automatically",
    description: "Transform your lead generation with AI-powered automation that captures, qualifies, and nurtures leads 24/7.",
    features: [
      "Intelligent lead capture forms",
      "Automatic lead scoring and qualification",
      "Personalized follow-up sequences",
      "CRM integration and sync",
      "Real-time lead notifications",
      "Performance analytics dashboard",
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "chat-automation",
    icon: MessageSquare,
    title: "Chat Automation",
    subtitle: "Intelligent conversational AI",
    description: "Deploy smart chatbots across WhatsApp, web, and messaging platforms to handle customer inquiries instantly.",
    features: [
      "Multi-platform deployment",
      "Natural language processing",
      "Context-aware conversations",
      "Handoff to human agents",
      "Multi-language support",
      "Conversation analytics",
    ],
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: "workflow-automation",
    icon: Workflow,
    title: "Workflow Automation",
    subtitle: "Streamline business processes",
    description: "Connect your tools and automate repetitive tasks to save time and reduce errors across your organization.",
    features: [
      "Visual workflow builder",
      "500+ app integrations",
      "Conditional logic and branching",
      "Scheduled automations",
      "Error handling and retries",
      "Audit logs and reporting",
    ],
    color: "from-violet-500 to-violet-600",
  },
  {
    id: "ai-solutions",
    icon: Brain,
    title: "AI Solutions",
    subtitle: "Custom AI & ML development",
    description: "Leverage the power of artificial intelligence with custom solutions tailored to your specific business needs.",
    features: [
      "Custom AI model development",
      "Predictive analytics",
      "Document processing",
      "Image and video analysis",
      "Recommendation systems",
      "AI strategy consulting",
    ],
    color: "from-amber-500 to-amber-600",
  },
]

export default function SolutionsPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

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
            const index = cardsRef.current.indexOf(entry.target as HTMLDivElement)
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 600,
              delay: index * 100,
              easing: "easeOutCubic",
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Powerful{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Solutions
              </span>{" "}
              for Modern Business
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Comprehensive automation tools designed to streamline operations, engage customers, and accelerate growth.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-24">
          {solutions.map((solution, index) => {
            const Icon = solution.icon
            const isEven = index % 2 === 0
            
            return (
              <div
                key={solution.id}
                id={solution.id}
                ref={(el) => { if (el) cardsRef.current[index] = el }}
                className={`grid lg:grid-cols-2 gap-12 items-center opacity-0 ${isEven ? "" : "lg:flex-row-reverse"}`}
              >
                <div className={isEven ? "" : "lg:order-2"}>
                  <div className={`inline-flex w-14 h-14 rounded-xl bg-gradient-to-br ${solution.color} items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">{solution.title}</h2>
                  <p className="text-lg text-primary font-medium mb-4">{solution.subtitle}</p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{solution.description}</p>
                  
                  <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="bg-gradient-to-r from-primary to-accent text-white">
                    <Link href="/contact#demo">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className={`bg-card rounded-2xl border border-border p-8 ${isEven ? "lg:order-2" : ""}`}>
                  <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center">
                    <Icon className={`w-24 h-24 text-muted-foreground/30`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  )
}
