import { DalaHero } from "@/components/dom/DalaHero";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <main>
      <DalaHero />

      {/*
        Post-hero content sits ABOVE the hero's fixed particle canvas (z-1) on a
        solid background, so it cleanly rises over the morph field as you scroll
        instead of the canvas abruptly popping out. The top gradient dissolves
        the particle field into the section background for a soft seam.
      */}
      <div className="relative z-10 bg-hub-paper">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 h-40 bg-gradient-to-b from-transparent to-hub-paper"
        />
        <Testimonials />
        <FinalCTA />
      </div>
    </main>
  );
}
