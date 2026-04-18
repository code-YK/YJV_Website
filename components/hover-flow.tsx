"use client"

import { useEffect, useRef } from "react"
import { MessageSquare, Bot, UserPlus, Database } from "lucide-react"
import anime from "@/lib/anime"

const flowSteps = [
  {
    id: 1,
    icon: MessageSquare,
    title: "Incoming Message",
    description: '"Hi, I want pricing"',
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    icon: Bot,
    title: "AI Response",
    description: '"Sure! Can I know your business type?"',
    color: "from-primary to-accent",
  },
  {
    id: 3,
    icon: UserPlus,
    title: "Lead Capture",
    description: "Name, Phone → Saved",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: 4,
    icon: Database,
    title: "CRM Action",
    description: "Lead added + Follow-up triggered",
    color: "from-violet-500 to-violet-600",
  },
]

export function HoverFlow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const linesRef = useRef<(SVGPathElement | null)[]>([])

  useEffect(() => {
    // Stagger animation for cards on mount
    anime({
      targets: cardsRef.current.filter(Boolean),
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(200, { start: 300 }),
      duration: 600,
      easing: "easeOutCubic",
    })

    // Animate connecting lines
    linesRef.current.filter(Boolean).forEach((line, index) => {
      if (line) {
        const length = line.getTotalLength()
        line.style.strokeDasharray = `${length}`
        line.style.strokeDashoffset = `${length}`
        
        anime({
          targets: line,
          strokeDashoffset: [length, 0],
          delay: 500 + index * 250,
          duration: 500,
          easing: "easeInOutQuad",
        })
      }
    })
  }, [])

  const stepGlowColors = [
    "rgba(37, 99, 235, 0.25)",   // blue  (Step 1)
    "rgba(124, 58, 237, 0.25)",  // violet (Step 2)
    "rgba(16, 185, 129, 0.25)",  // emerald (Step 3)
    "rgba(139, 92, 246, 0.25)",  // violet (Step 4)
  ]

  const handleMouseEnter = (index: number) => {
    const card = cardsRef.current[index]
    if (card) {
      anime({
        targets: card,
        translateY: -4,
        boxShadow: `0 0 0 2px ${stepGlowColors[index]}, 0 12px 36px ${stepGlowColors[index]}`,
        duration: 350,
        easing: "easeOutCubic",
      })
    }
  }

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index]
    if (card) {
      anime({
        targets: card,
        translateY: 0,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        duration: 350,
        easing: "easeOutCubic",
      })
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto lg:mx-0">
      {/* SVG for connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        {/* Vertical connecting lines between cards */}
        {[0, 1, 2].map((index) => (
          <path
            key={index}
            ref={(el) => { linesRef.current[index] = el }}
            d={`M 50 ${85 + index * 120} Q 50 ${115 + index * 120} 50 ${145 + index * 120}`}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            className="opacity-60"
          />
        ))}
      </svg>

      {/* Flow cards */}
      <div className="relative z-10 space-y-4">
        {flowSteps.map((step, index) => {
          const Icon = step.icon
          return (
            <div
              key={step.id}
              ref={(el) => { cardsRef.current[index] = el }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="relative bg-card rounded-xl border border-border p-4 cursor-pointer opacity-0"
              style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      Step {step.id}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground text-sm">{step.title}</h4>
                  <p className="text-muted-foreground text-sm mt-0.5">{step.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
