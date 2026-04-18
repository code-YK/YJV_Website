"use client"

import { useEffect, useRef } from "react"
import anime from "@/lib/anime"

const companies = [
  "TechCorp",
  "GlobalBiz",
  "StartupHub",
  "InnovateCo",
  "GrowthLabs",
  "ScaleUp",
]

export function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: ".trust-logo",
              opacity: [0, 0.5],
              translateY: [20, 0],
              delay: anime.stagger(100),
              duration: 500,
              easing: "easeOutCubic",
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8">
          Trusted by forward-thinking companies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {companies.map((company) => (
            <div
              key={company}
              className="trust-logo text-xl font-semibold text-foreground opacity-0"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
