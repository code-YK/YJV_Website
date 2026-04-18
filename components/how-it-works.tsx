"use client"

import { useEffect, useRef } from "react"
import { MessageCircle, Cpu, Zap, TrendingUp } from "lucide-react"
import anime from "@/lib/anime"

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Connect Your Channels",
    description: "Integrate WhatsApp, website chat, and other messaging platforms in minutes.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Configure AI Responses",
    description: "Set up intelligent conversation flows and train your AI to handle queries.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Automate Workflows",
    description: "Connect to your CRM, calendar, and tools to automate lead capture and follow-ups.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Scale & Optimize",
    description: "Monitor performance, refine responses, and scale your automation effortlessly.",
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement[]>([])
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate the line
            anime({
              targets: lineRef.current,
              scaleX: [0, 1],
              duration: 800,
              easing: "easeOutCubic",
            })

            // Animate steps
            anime({
              targets: stepsRef.current,
              opacity: [0, 1],
              translateY: [30, 0],
              delay: anime.stagger(200, { start: 300 }),
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

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Get Started in{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              4 Simple Steps
            </span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            From setup to scale, we make automation simple and effective.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div 
            ref={lineRef}
            className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary to-accent origin-left"
            style={{ transform: "scaleX(0)" }}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  ref={(el) => { if (el) stepsRef.current[index] = el }}
                  className="relative text-center opacity-0"
                >
                  {/* Step number and icon */}
                  <div className="relative mx-auto w-20 h-20 mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-accent/10" />
                    <div className="absolute inset-2 rounded-full bg-card border border-border flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{step.number}</span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-foreground text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
