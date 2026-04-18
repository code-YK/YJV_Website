"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTA } from "@/components/cta"
import { Button } from "@/components/ui/button"
import { Building2, Heart, ShoppingBag, GraduationCap, ArrowRight, Check } from "lucide-react"
import anime from "@/lib/anime"

const industries = [
  {
    id: "real-estate",
    icon: Building2,
    title: "Real Estate",
    subtitle: "Close more deals with intelligent automation",
    description: "Transform property inquiries into qualified leads with AI-powered chatbots that handle viewings, pricing questions, and follow-ups 24/7.",
    benefits: [
      "40% increase in lead conversion",
      "Automated viewing scheduling",
      "Instant property matching",
      "Multi-language support",
      "CRM sync with major platforms",
      "Virtual tour integration",
    ],
    useCases: [
      "Property inquiry handling",
      "Viewing appointment booking",
      "Lead qualification",
      "Market updates delivery",
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "healthcare",
    icon: Heart,
    title: "Healthcare",
    subtitle: "Enhance patient care with smart communication",
    description: "Streamline patient communication, reduce no-shows, and automate routine tasks while maintaining HIPAA compliance.",
    benefits: [
      "40% reduction in no-shows",
      "HIPAA compliant messaging",
      "Automated appointment reminders",
      "Prescription refill requests",
      "Insurance verification",
      "Multi-provider support",
    ],
    useCases: [
      "Appointment scheduling",
      "Health information delivery",
      "Follow-up care coordination",
      "Patient feedback collection",
    ],
    color: "from-rose-500 to-rose-600",
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    title: "E-commerce",
    subtitle: "Scale customer support without scaling costs",
    description: "Handle thousands of customer inquiries simultaneously with AI that understands your products and can process orders.",
    benefits: [
      "85% faster response times",
      "Order status automation",
      "Product recommendations",
      "Returns processing",
      "Inventory notifications",
      "Multi-platform support",
    ],
    useCases: [
      "Product inquiries",
      "Order tracking",
      "Returns and refunds",
      "Personalized recommendations",
    ],
    color: "from-amber-500 to-amber-600",
  },
  {
    id: "education",
    icon: GraduationCap,
    title: "Education",
    subtitle: "Engage students and streamline enrollment",
    description: "From course inquiries to enrollment support, automate the student journey while providing personalized guidance.",
    benefits: [
      "50% faster enrollment",
      "Course recommendations",
      "Payment reminders",
      "Progress tracking",
      "Parent communication",
      "Multi-campus support",
    ],
    useCases: [
      "Enrollment assistance",
      "Course information",
      "Schedule management",
      "Student support",
    ],
    color: "from-emerald-500 to-emerald-600",
  },
]

export default function IndustriesPage() {
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
              Automation for{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Every Industry
              </span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Tailored solutions that address the unique challenges and opportunities in your sector.
            </p>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-24">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            const isEven = index % 2 === 0
            
            return (
              <div
                key={industry.id}
                id={industry.id}
                ref={(el) => { if (el) cardsRef.current[index] = el }}
                className={`grid lg:grid-cols-2 gap-12 items-start opacity-0`}
              >
                <div className={isEven ? "" : "lg:order-2"}>
                  <div className={`inline-flex w-14 h-14 rounded-xl bg-gradient-to-br ${industry.color} items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">{industry.title}</h2>
                  <p className="text-lg text-primary font-medium mb-4">{industry.subtitle}</p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{industry.description}</p>
                  
                  <h3 className="font-semibold text-foreground mb-3">Key Benefits</h3>
                  <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                    {industry.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="bg-gradient-to-r from-primary to-accent text-white">
                    <Link href="/contact#demo">
                      Schedule a Demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className={`bg-card rounded-2xl border border-border p-8 ${isEven ? "lg:order-2" : ""}`}>
                  <h3 className="font-semibold text-foreground mb-4">Common Use Cases</h3>
                  <div className="space-y-4">
                    {industry.useCases.map((useCase, i) => (
                      <div key={useCase} className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${industry.color} flex items-center justify-center flex-shrink-0`}>
                          <span className="text-white font-semibold text-sm">{i + 1}</span>
                        </div>
                        <span className="text-foreground">{useCase}</span>
                      </div>
                    ))}
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
