import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { TrustSection } from "@/components/trust-section"
import { Services } from "@/components/services"
import { UseCases } from "@/components/use-cases"
import { HowItWorks } from "@/components/how-it-works"
import { DemoSection } from "@/components/demo-section"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TrustSection />
      <Services />
      <UseCases />
      <HowItWorks />
      <DemoSection />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
