"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Bot } from "lucide-react"

interface Message {
  from: "user" | "bot"
  text: string
}

const GREETING = "👋 Hi! I'm the YJ Ventures assistant. Ask me about **pricing**, **demo**, **services**, or **contact** info!"

const RESPONSES: Record<string, string> = {
  pricing:
    "💰 For pricing details, please contact us at info@yjventures.in or call +91 6352998995. We'll tailor a plan to your needs!",
  demo:
    "🎯 We'd love to show you a demo! Click the **Book a Demo** button in the navbar, or reach out at info@yjventures.in to schedule a 30-min walkthrough.",
  services:
    "🚀 We offer:\n• WhatsApp & Chat Automation\n• AI-powered Lead Generation\n• Workflow Automation\n• Custom AI/ML Solutions\n\nVisit our Solutions page to learn more!",
  contact:
    "📞 Phone: +91 6352998995\n✉️ Email: info@yjventures.in\n📍 Address: 4-D, Vardan Tower, Navrangpura, Ahmedabad",
  hello: "Hello! 👋 How can I help you today? Ask me about pricing, demo, services, or contact info.",
  hi: "Hi there! 👋 How can I help you today? Ask me about pricing, demo, services, or contact info.",
  hey: "Hey! 👋 How can I help you today? Ask me about pricing, demo, services, or contact info.",
  thanks: "You're welcome! 😊 Let me know if there's anything else I can help with.",
  "thank you": "You're welcome! 😊 Let me know if there's anything else I can help with.",
}

function getResponse(input: string): string {
  const lower = input.toLowerCase().trim()
  for (const [keyword, response] of Object.entries(RESPONSES)) {
    if (lower.includes(keyword)) return response
  }
  return "🤔 I'm not sure about that. Try asking about **pricing**, **demo**, **services**, or **contact**. Or email us at info@yjventures.in for personalized help!"
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: GREETING },
  ])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    const text = input.trim()
    if (!text) return

    const userMsg: Message = { from: "user", text }
    const botMsg: Message = { from: "bot", text: getResponse(text) }

    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          id="chatbot-trigger"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[90] h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30 flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer"
          aria-label="Open chatbot"
        >
          <Bot className="h-6 w-6" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          id="chatbot-window"
          className="fixed bottom-6 right-6 z-[90] w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-background shadow-2xl flex flex-col overflow-hidden"
          style={{ height: "480px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-primary to-accent px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">YJ Assistant</p>
                <p className="text-xs text-white/70">Always online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="h-7 w-7 rounded-lg bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Close chatbot"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${
                    msg.from === "user"
                      ? "bg-gradient-to-r from-primary to-accent text-white rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2">
              <input
                id="chatbot-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about pricing, demo, services..."
                className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                id="chatbot-send"
                onClick={handleSend}
                disabled={!input.trim()}
                className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
