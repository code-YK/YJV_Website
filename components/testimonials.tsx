"use client"

import { useEffect, useRef } from "react"
import { Star } from "lucide-react"
import anime from "@/lib/anime"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, PropTech Solutions",
    content: "YJ Ventures transformed our lead generation process. We went from handling 50 inquiries daily to over 500, with the same team size. The ROI has been incredible.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Operations Director, MedCare Plus",
    content: "The WhatsApp automation has reduced our patient no-show rate by 40%. Appointment reminders and follow-ups now happen automatically, freeing up our staff.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, EduLearn Academy",
    content: "From enrollment inquiries to course recommendations, the AI handles it all. Our student satisfaction scores have never been higher.",
    rating: 5,
  },
]

export function Testimonials() {
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
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            See what our clients say about working with YJ Ventures.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              ref={(el) => { if (el) cardsRef.current[index] = el }}
              className="bg-card rounded-xl border border-border p-6 opacity-0"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-medium text-sm">
                  {testimonial.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
