export function YJFinalCTA() {
  return (
    <section
      id="cta"
      className="px-5 md:px-20 max-w-[1440px] mx-auto mb-20"
    >
      <div className="yj-glass-panel yj-glow-border rounded-xl p-10 md:p-16 text-center relative overflow-hidden flex flex-col items-center justify-center">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-yj-primary-container/10 to-yj-secondary-container/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[80%] rounded-full bg-yj-primary-container/10 blur-3xl"
          aria-hidden
        />

        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-yj-surface-container border border-yj-primary/20 relative z-10">
          <span className="h-2 w-2 rounded-full bg-yj-primary-container animate-pulse-glow" />
          <span className="font-[family-name:var(--font-space-mono)] text-xs text-yj-primary tracking-widest uppercase">
            Discovery Open
          </span>
        </div>

        <h2 className="relative z-10 font-[family-name:var(--font-space-grotesk)] font-semibold text-yj-primary mb-6 text-[32px] md:text-5xl">
          Ready to Automate{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yj-primary-container to-yj-secondary-container">
            Excellence?
          </span>
        </h2>
        <p className="relative z-10 font-[family-name:var(--font-inter)] text-lg leading-relaxed text-yj-on-surface-variant mb-10 max-w-2xl">
          Stop scaling headcount. Start scaling systems. Book a discovery call
          to map out your autonomous architecture.
        </p>
        <a
          href="#book"
          className="group relative z-10 inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full yj-neon-button font-[family-name:var(--font-space-grotesk)] text-base font-bold tracking-[0.15em] text-yj-primary uppercase"
        >
          BOOK DISCOVERY CALL
          <span
            aria-hidden
            className="material-symbols-outlined text-lg transition-transform duration-300 group-hover:translate-x-1"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            arrow_forward
          </span>
        </a>
      </div>
    </section>
  );
}
