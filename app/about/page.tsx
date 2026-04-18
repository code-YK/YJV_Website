"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTA } from "@/components/cta"
import { Button } from "@/components/ui/button"
import { Target, Users, Lightbulb, Heart, ArrowRight } from "lucide-react"
import anime from "@/lib/anime"

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "We measure our success by the tangible outcomes we deliver for our clients. Every solution is designed with clear, measurable goals.",
  },
  {
    icon: Users,
    title: "Customer-Centric",
    description: "Our clients are at the heart of everything we do. We listen, adapt, and evolve our solutions to meet their unique needs.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We continuously push the boundaries of what is possible with AI and automation, staying ahead of industry trends.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "We build lasting relationships through transparency, honesty, and a commitment to doing right by our clients.",
  },
]

const stats = [
  { value: "500+", label: "Clients Served" },
  { value: "50M+", label: "Messages Processed" },
  { value: "99.9%", label: "Uptime" },
  { value: "40+", label: "Team Members" },
]

const team = [
  {
    name: "Yash Jain",
    role: "Founder & CEO",
    bio: "Visionary entrepreneur with 10+ years in AI and automation.",
  },
  {
    name: "Priya Sharma",
    role: "CTO",
    bio: "Former tech lead at major SaaS companies, AI/ML expert.",
  },
  {
    name: "Rahul Mehta",
    role: "Head of Product",
    bio: "Product strategist focused on user-centric design.",
  },
  {
    name: "Anita Desai",
    role: "Head of Customer Success",
    bio: "Dedicated to ensuring every client achieves their goals.",
  },
]

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement[]>([])

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

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
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
              Empowering Businesses Through{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Intelligent Automation
              </span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              We are on a mission to help businesses of all sizes harness the power of AI and automation to grow faster and work smarter.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            ref={(el) => { if (el) sectionsRef.current[0] = el }}
            className="grid lg:grid-cols-2 gap-12 items-center opacity-0"
          >
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  YJ Ventures was founded with a simple belief: that powerful automation tools should be accessible to every business, not just enterprise giants with massive budgets.
                </p>
                <p>
                  Starting with WhatsApp automation for local businesses, we quickly realized the transformative potential of combining messaging platforms with AI. Today, we serve hundreds of clients across real estate, healthcare, e-commerce, and education.
                </p>
                <p>
                  Our team of engineers, designers, and customer success specialists work tirelessly to build solutions that are not just technically excellent, but truly impactful for our clients&apos; bottom lines.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-white">YJ</span>
                </div>
                <p className="text-lg font-semibold text-foreground">YJ Ventures</p>
                <p className="text-sm text-muted-foreground">Founded 2020</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl sm:text-5xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            ref={(el) => { if (el) sectionsRef.current[1] = el }}
            className="opacity-0"
          >
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we do.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <div key={value.title} className="bg-card rounded-xl border border-border p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            ref={(el) => { if (el) sectionsRef.current[2] = el }}
            className="opacity-0"
          >
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Meet the Team</h2>
              <p className="text-lg text-muted-foreground">
                The people behind YJ Ventures.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div key={member.name} className="bg-card rounded-xl border border-border p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Join Our Team</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We are always looking for talented individuals to join our mission.
          </p>
          <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent text-white">
            <Link href="/contact">
              View Open Positions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
