"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Building2, Heart, ShoppingBag, GraduationCap, ArrowRight } from "lucide-react"
import anime from "@/lib/anime"

const useCases = [
  {
    icon: Building2,
    title: "Real Estate",
    description: "Automate property inquiries, schedule viewings, and nurture leads with intelligent follow-ups.",
    href: "/industries#real-estate",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Heart,
    title: "Healthcare",
    description: "Streamline patient communication, appointment booking, and health information delivery.",
    href: "/industries#healthcare",
    color: "from-rose-500 to-rose-600",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce",
    description: "Handle order inquiries, product recommendations, and customer support at scale.",
    href: "/industries#ecommerce",
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Engage students, automate enrollment processes, and deliver personalized learning support.",
    href: "/industries#education",
    color: "from-emerald-500 to-emerald-600",
  },
]

export function UseCases() {
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
              delay: anime.stagger(150),
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
    <section ref={sectionRef} className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Built for{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Every Industry
            </span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Tailored automation solutions that address unique challenges across different sectors.
          </p>
        </div>

        {/* Use cases grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon
            return (
              <Link
                key={useCase.title}
                href={useCase.href}
                className="group"
              >
                <div
                  ref={(el) => { if (el) cardsRef.current[index] = el }}
                  className="h-full bg-card rounded-xl border border-border p-6 opacity-0 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${useCase.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">{useCase.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{useCase.description}</p>
                  <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
