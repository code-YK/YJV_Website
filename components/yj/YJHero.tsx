import { AntigravityBackground } from "./AntigravityBackground";

export function YJHero() {
  return (
    <section className="relative isolate overflow-hidden mb-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <AntigravityBackground
          count={300}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color="#00f0ff"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0.05}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-yj-surface/40 via-yj-surface/10 to-yj-surface"
        aria-hidden
      />
      <div className="pointer-events-none absolute -top-32 left-1/4 -z-10 h-80 w-80 rounded-full bg-yj-primary-container/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-20 right-0 -z-10 h-72 w-72 rounded-full bg-yj-secondary-container/20 blur-[120px]" />

      <div className="relative px-5 md:px-20 max-w-[1440px] mx-auto py-20 md:py-28 min-h-[614px] flex flex-col justify-center items-start">
        <div className="z-10 relative max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-yj-surface-container/70 border border-yj-primary/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-yj-primary-container animate-pulse-glow" />
            <span className="font-[family-name:var(--font-space-mono)] text-sm text-yj-primary tracking-widest uppercase">
              System Online
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-space-grotesk)] font-bold tracking-[-0.02em] leading-[1.05] text-yj-primary mb-6 text-[40px] md:text-[72px]">
            Orchestrating the Future of{" "}
            <br className="hidden md:block" />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-yj-primary-container via-[#7df4ff] to-yj-secondary-container">
              Autonomous Business.
              <span
                aria-hidden
                className="absolute -inset-x-2 -bottom-2 h-px bg-gradient-to-r from-transparent via-yj-primary-container/50 to-transparent"
              />
            </span>
          </h1>

          <p className="font-[family-name:var(--font-inter)] text-lg leading-relaxed text-yj-on-surface-variant mb-10 max-w-xl">
            Scale with lean, high-revenue automated systems powered by LangGraph
            and CrewAI. We build the &ldquo;Ghost in the Machine&rdquo; for elite
            enterprises.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#cta"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full yj-neon-button font-[family-name:var(--font-space-grotesk)] text-xs font-bold tracking-[0.15em] text-yj-primary uppercase"
            >
              Start Your Automation Journey
              <span
                aria-hidden
                className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-1"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                arrow_forward
              </span>
            </a>
            <a
              href="#docs"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full yj-ghost-button font-[family-name:var(--font-space-grotesk)] text-xs font-bold tracking-[0.15em] text-yj-on-surface uppercase backdrop-blur-md"
            >
              View Documentation
              <span
                aria-hidden
                className="material-symbols-outlined text-base transition-transform duration-300 group-hover:rotate-[-12deg]"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                description
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
