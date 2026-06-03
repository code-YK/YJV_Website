const stack = [
  "LangGraph",
  "CrewAI",
  "OpenAI",
  "Anthropic",
  "Make.com",
  "n8n",
  "Python",
  "Pinecone",
];

export function TechMarquee() {
  const items = [...stack, ...stack];
  return (
    <section
      id="tech"
      className="relative py-10 border-y border-white/5 bg-yj-surface-container-lowest overflow-hidden mb-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 md:w-40 bg-gradient-to-r from-yj-surface-container-lowest to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 md:w-40 bg-gradient-to-l from-yj-surface-container-lowest to-transparent"
      />

      <div className="flex whitespace-nowrap animate-yj-marquee items-center gap-16 px-8 w-max">
        {items.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="group flex items-center gap-3 font-[family-name:var(--font-space-mono)] text-yj-outline-variant text-xl uppercase tracking-widest transition-colors duration-300 hover:text-yj-primary"
          >
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-yj-outline-variant transition-all duration-300 group-hover:bg-yj-primary-container group-hover:shadow-[0_0_14px_rgba(0,240,255,0.8)]"
            />
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
