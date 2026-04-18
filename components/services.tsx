"use client"

import { useEffect, useRef } from "react"
import { MessageSquare, Bot, Workflow, Code, Sparkles, Globe } from "lucide-react"
import anime from "@/lib/anime"

const services = [
  {
    icon: MessageSquare,
    title: "WhatsApp Automation",
    description: "Automate customer conversations with intelligent WhatsApp chatbots that handle inquiries 24/7.",
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    description: "Deploy smart conversational agents that understand context and deliver personalized responses.",
  },
  {
    icon: Sparkles,
    title: "Lead Generation",
    description: "Capture and qualify leads automatically with AI-powered forms and conversation flows.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Streamline business processes with automated workflows that connect your tools and teams.",
  },
  {
    icon: Globe,
    title: "Website Development",
    description: "Build modern, high-converting websites that integrate seamlessly with your automation stack.",
  },
  {
    icon: Code,
    title: "AI/ML Solutions",
    description: "Custom AI and machine learning solutions tailored to your specific business challenges.",
  },
]

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cardsRef.current,
              opacity: [0, 1],
              translateY: [40, 0],
              delay: anime.stagger(100),
              duration: 600,
              easing: "easeOutCubic",
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseEnter = (index: number) => {
    const card = cardsRef.current[index]
    if (card) {
      anime({
        targets: card,
        scale: 1.03,
        translateY: -5,
        duration: 300,
        easing: "easeOutCubic",
      })
    }
  }

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index]
    if (card) {
      anime({
        targets: card,
        scale: 1,
        translateY: 0,
        duration: 300,
        easing: "easeOutCubic",
      })
    }
  }

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Scale Your Business
            </span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Comprehensive automation solutions designed to streamline operations and accelerate growth.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                ref={(el) => { if (el) cardsRef.current[index] = el }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                className="group bg-card rounded-xl border border-border p-6 opacity-0 cursor-pointer transition-shadow hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
