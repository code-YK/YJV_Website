"use client"

import { useEffect, useRef, useState } from "react"
import { Send, Bot, User } from "lucide-react"
import anime from "@/lib/anime"

const demoMessages = [
  { type: "user", text: "Hi, I need help with lead generation" },
  { type: "bot", text: "Hello! I'd be happy to help. What industry are you in?" },
  { type: "user", text: "Real estate - we have 50+ agents" },
  { type: "bot", text: "Perfect! For real estate teams, I recommend our Lead Capture + WhatsApp automation combo. It can handle property inquiries, schedule viewings, and qualify leads 24/7. Want to see a demo?" },
]

export function DemoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            
            // Animate section
            anime({
              targets: sectionRef.current?.querySelector(".demo-content"),
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 600,
              easing: "easeOutCubic",
            })

            // Reveal messages one by one
            demoMessages.forEach((_, index) => {
              setTimeout(() => {
                setVisibleMessages((prev) => prev + 1)
              }, 800 + index * 1000)
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
  }, [hasAnimated])

  return (
    <section ref={sectionRef} className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="demo-content grid lg:grid-cols-2 gap-12 items-center opacity-0">
          {/* Left - Text */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              See Our{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI in Action
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 text-pretty">
              Watch how our intelligent chatbot handles real conversations, captures leads, and guides customers through your sales funnel.
            </p>
            <ul className="space-y-3">
              {[
                "Natural language understanding",
                "Context-aware responses",
                "Seamless CRM integration",
                "24/7 availability",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-foreground">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Chat UI Mock */}
          <div className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-primary to-accent px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-white text-sm">YJ AI Assistant</p>
                <p className="text-white/70 text-xs">Always online</p>
              </div>
            </div>

            {/* Chat messages */}
            <div className="p-4 h-80 overflow-y-auto space-y-4">
              {demoMessages.slice(0, visibleMessages).map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-primary to-accent text-white rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              {visibleMessages < demoMessages.length && hasAnimated && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat input */}
            <div className="border-t border-border p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-muted rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled
                />
                <button className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
