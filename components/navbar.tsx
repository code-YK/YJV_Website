"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { ContactDemoModal } from "@/components/contact-demo-modal"
import anime from "@/lib/anime"

const navigation = [
  {
    name: "Solutions",
    href: "/solutions",
    dropdown: [
      { name: "Lead Automation", href: "/solutions#lead-automation" },
      { name: "Chat Automation", href: "/solutions#chat-automation" },
      { name: "Workflow Automation", href: "/solutions#workflow-automation" },
      { name: "AI Solutions", href: "/solutions#ai-solutions" },
    ],
  },
  { name: "Platform", href: "/platform" },
  {
    name: "Industries",
    href: "/industries",
    dropdown: [
      { name: "Real Estate", href: "/industries#real-estate" },
      { name: "Healthcare", href: "/industries#healthcare" },
      { name: "E-commerce", href: "/industries#ecommerce" },
      { name: "Education", href: "/industries#education" },
    ],
  },
  { name: "Case Studies", href: "/case-studies" },
  { name: "About", href: "/about" },
  {
    name: "Contact",
    href: "#",
    isModal: true,
    modalTab: "contact" as const,
  },
]

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="h-9 w-9" /> // prevent hydration mismatch

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-9 w-9 flex items-center justify-center rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTab, setModalTab] = useState<"demo" | "contact">("demo")
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (navRef.current) {
      anime({
        targets: navRef.current,
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 600,
        easing: "easeOutCubic",
      })
    }
  }, [])

  const openModal = (tab: "demo" | "contact") => {
    setModalTab(tab)
    setModalOpen(true)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">YJ</span>
              </div>
              <span className="font-semibold text-foreground text-lg">YJ Ventures</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.isModal ? (
                  <button
                    onClick={() => openModal(item.modalTab!)}
                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="h-4 w-4" />}
                  </Link>
                )}

                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2 w-48">
                    <div className="rounded-xl bg-card border border-border shadow-lg py-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Theme toggle */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-3">
            <ThemeToggle />
            <Button
              onClick={() => openModal("demo")}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-primary-foreground"
            >
              Book a Demo
            </Button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-background border-b border-border">
            <div className="space-y-1 px-6 py-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.isModal ? (
                    <button
                      onClick={() => openModal(item.modalTab!)}
                      className="block w-full text-left py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                  {item.dropdown && (
                    <div className="pl-4 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => openModal("contact")}
                >
                  Contact
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground"
                  onClick={() => openModal("demo")}
                >
                  Book a Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <ContactDemoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultTab={modalTab}
      />
    </>
  )
}