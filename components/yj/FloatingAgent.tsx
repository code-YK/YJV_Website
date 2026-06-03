"use client";

export function FloatingAgent() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        type="button"
        aria-label="Open AI agent"
        className="w-16 h-16 rounded-full yj-neon-button flex items-center justify-center group relative cursor-pointer"
      >
        <span
          className="absolute inset-0 rounded-full bg-yj-primary-container/20 animate-ping opacity-75"
          aria-hidden
        />
        <span
          className="material-symbols-outlined text-yj-primary text-3xl group-hover:scale-110 transition-transform relative z-10"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          smart_toy
        </span>
      </button>
    </div>
  );
}
