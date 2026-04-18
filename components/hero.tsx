"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HoverFlow } from "@/components/hover-flow"
import { ContactDemoModal } from "@/components/contact-demo-modal"
import anime from "@/lib/anime"

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalTab, setModalTab] = useState<"demo" | "contact">("demo")

  useEffect(() => {
    const timeline = anime.timeline({
      easing: "easeOutCubic",
    })

    timeline
      .add({
        targets: badgeRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
      })
      .add({
        targets: headlineRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
      }, "-=300")
      .add({
        targets: subtextRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
      }, "-=300")
      .add({
        targets: buttonsRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
      }, "-=300")
  }, [])

  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-accent/5 to-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 bg-muted rounded-full px-4 py-2 mb-6 opacity-0"
            >
              <span className="text-lg">🚀</span>
              <span className="text-sm font-medium text-muted-foreground">
                AI Automation for WhatsApp & Business Workflows
              </span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight opacity-0 text-balance"
            >
              Automate Conversations.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Accelerate Growth.
              </span>
            </h1>

            {/* Subtext */}
            <p
              ref={subtextRef}
              className="mt-6 text-lg text-muted-foreground leading-relaxed opacity-0 text-pretty"
            >
              Capture leads, engage customers, and automate workflows with intelligent WhatsApp and AI-powered systems.
            </p>

            {/* CTA Buttons */}
            <div
              ref={buttonsRef}
              className="mt-8 flex flex-wrap gap-4 opacity-0"
            >
              <Button
                size="lg"
                onClick={() => { setModalTab("demo"); setModalOpen(true) }}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all text-primary-foreground px-8 shadow-lg shadow-primary/20"
              >
                Book a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="group"
              >
                <Link href="#how-it-works">
                  <Play className="mr-2 h-4 w-4 transition-colors" />
                  See How It Works
                </Link>
              </Button>
            </div>
          </div>

          {/* Right side - HoverFlow Component */}
          <div className="lg:pl-8">
            <HoverFlow />
          </div>
        </div>
      </div>

      {/* Contact / Demo Modal */}
      <ContactDemoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultTab={modalTab}
      />
    </section>
  )
}