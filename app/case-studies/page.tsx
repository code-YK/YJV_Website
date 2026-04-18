"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTA } from "@/components/cta"
import { Button } from "@/components/ui/button"
import { Building2, Heart, ShoppingBag, ArrowRight, TrendingUp } from "lucide-react"
import anime from "@/lib/anime"

const caseStudies = [
  {
    id: "proptech-solutions",
    company: "PropTech Solutions",
    industry: "Real Estate",
    icon: Building2,
    color: "from-blue-500 to-blue-600",
    problem: "PropTech Solutions was struggling to handle the volume of property inquiries. Their team of 5 agents was overwhelmed with 200+ daily inquiries across WhatsApp, email, and web forms, leading to slow response times and lost leads.",
    solution: "We implemented an AI-powered WhatsApp chatbot integrated with their CRM. The bot handles initial inquiries, qualifies leads based on budget and preferences, schedules viewings automatically, and sends property recommendations.",
    results: [
      { metric: "500+", label: "Daily inquiries handled" },
      { metric: "85%", label: "Faster response time" },
      { metric: "40%", label: "Increase in conversions" },
      { metric: "60%", label: "Reduction in workload" },
    ],
    quote: "YJ Ventures transformed our lead generation process. We now handle 10x the inquiries with the same team.",
    author: "Sarah Johnson",
    role: "CEO, PropTech Solutions",
  },
  {
    id: "medcare-plus",
    company: "MedCare Plus",
    industry: "Healthcare",
    icon: Heart,
    color: "from-rose-500 to-rose-600",
    problem: "MedCare Plus, a multi-location healthcare provider, faced high no-show rates (35%) and staff overwhelmed with appointment scheduling calls. Patients complained about long wait times for simple inquiries.",
    solution: "We deployed a HIPAA-compliant WhatsApp automation system for appointment scheduling, reminders, and follow-ups. The system integrates with their EMR and sends personalized health tips based on patient conditions.",
    results: [
      { metric: "40%", label: "Reduction in no-shows" },
      { metric: "3min", label: "Avg. response time" },
      { metric: "92%", label: "Patient satisfaction" },
      { metric: "50%", label: "Less admin work" },
    ],
    quote: "The automation freed up our staff to focus on patient care while actually improving communication quality.",
    author: "Dr. Michael Chen",
    role: "Operations Director, MedCare Plus",
  },
  {
    id: "stylehub-retail",
    company: "StyleHub Retail",
    industry: "E-commerce",
    icon: ShoppingBag,
    color: "from-amber-500 to-amber-600",
    problem: "StyleHub, an online fashion retailer, was spending over $50k/month on customer support to handle order inquiries, returns, and product questions. Response times averaged 24 hours during peak seasons.",
    solution: "We built an AI chatbot that handles order tracking, returns processing, and product recommendations. The bot connects to their inventory system for real-time stock information and integrates with their loyalty program.",
    results: [
      { metric: "70%", label: "Support costs reduced" },
      { metric: "95%", label: "Queries auto-resolved" },
      { metric: "2min", label: "Avg. response time" },
      { metric: "25%", label: "Increase in AOV" },
    ],
    quote: "We cut support costs by 70% while actually improving customer satisfaction. The ROI was evident within the first month.",
    author: "Emily Rodriguez",
    role: "Head of Operations, StyleHub",
  },
]

export default function CaseStudiesPage() {
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
              Customer{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Success Stories
              </span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              See how leading companies are transforming their operations with YJ Ventures automation solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
          {caseStudies.map((study, index) => {
            const Icon = study.icon
            
            return (
              <div
                key={study.id}
                ref={(el) => { if (el) cardsRef.current[index] = el }}
                className="bg-card rounded-2xl border border-border overflow-hidden opacity-0"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${study.color} p-6 sm:p-8`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{study.company}</h2>
                      <p className="text-white/80">{study.industry}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  {/* Problem & Solution */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center text-xs font-bold">!</span>
                        The Challenge
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{study.problem}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">✓</span>
                        The Solution
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-muted/50 rounded-xl p-6 mb-8">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Results
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {study.results.map((result) => (
                        <div key={result.label}>
                          <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {result.metric}
                          </p>
                          <p className="text-sm text-muted-foreground">{result.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="border-l-4 border-primary pl-6">
                    <p className="text-foreground italic mb-3">&quot;{study.quote}&quot;</p>
                    <footer className="text-sm">
                      <span className="font-medium text-foreground">{study.author}</span>
                      <span className="text-muted-foreground"> - {study.role}</span>
                    </footer>
                  </blockquote>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join hundreds of companies transforming their operations with YJ Ventures.
          </p>
          <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent text-white">
            <Link href="/contact#demo">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
