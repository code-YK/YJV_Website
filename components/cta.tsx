"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactDemoModal } from "@/components/contact-demo-modal"
import anime from "@/lib/anime"

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: sectionRef.current?.querySelector(".cta-content"),
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 600,
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
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-primary to-accent">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="cta-content text-center opacity-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto text-pretty">
            Join hundreds of companies already using YJ Ventures to automate their workflows and accelerate growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setModalOpen(true)}
              className="bg-white text-primary hover:bg-white/90 px-8 shadow-lg cursor-pointer"
            >
              Book a Free Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setModalOpen(true)}
              className="border-white text-white bg-transparent hover:bg-white/10 px-8 cursor-pointer"
            >
              Talk to Sales
            </Button>
          </div>
        </div>
      </div>

      <ContactDemoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultTab="demo"
      />
    </section>
  )
}