"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MaterialIconProps = {
  name: string;
  className?: string;
  fill?: 0 | 1;
};

function MaterialIcon({ name, className, fill = 0 }: MaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className ?? ""}`}
      style={{ fontVariationSettings: `'FILL' ${fill}` }}
      aria-hidden
    >
      {name}
    </span>
  );
}

function BentoCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      style={{
        backgroundImage:
          "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(0,240,255,0.08), transparent 40%)",
      }}
      className={cn(
        "yj-bento-card rounded-lg p-8 flex flex-col justify-between group relative overflow-hidden",
        "transition-transform duration-300 will-change-transform hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ServicesBento() {
  return (
    <section
      id="solutions"
      className="px-5 md:px-20 max-w-[1440px] mx-auto mb-32"
    >
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-yj-surface-container border border-yj-primary/20">
          <span className="font-[family-name:var(--font-space-mono)] text-xs text-yj-primary tracking-widest uppercase">
            // Solutions
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-space-grotesk)] font-semibold leading-tight text-yj-primary mb-4 text-[32px] md:text-5xl">
          Architectural Solutions
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-base leading-relaxed text-yj-on-surface-variant max-w-2xl">
          Modular, high-performance systems designed to replace repetitive
          manual labor with cognitive automation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[300px]">
        <BentoCard className="col-span-1 md:col-span-8">
          <div className="flex justify-between items-start">
            <MaterialIcon
              name="schema"
              className="text-4xl text-yj-primary-container group-hover:text-yj-primary transition-colors duration-300 group-hover:[filter:drop-shadow(0_0_12px_rgba(0,240,255,0.6))]"
            />
            <span className="font-[family-name:var(--font-space-mono)] text-sm text-yj-secondary-container bg-yj-secondary-container/10 px-3 py-1 rounded-full uppercase">
              Core Engine
            </span>
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-[32px] font-medium leading-tight text-yj-primary mb-2">
              Agentic AI Orchestration
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-base leading-relaxed text-yj-on-surface-variant">
              Deploy multi-agent systems that communicate, reason, and execute
              complex, multi-step tasks autonomously. We build digital
              workforces.
            </p>
          </div>
        </BentoCard>

        <BentoCard className="col-span-1 md:col-span-4">
          <div className="flex justify-between items-start">
            <MaterialIcon
              name="account_tree"
              className="text-4xl text-yj-secondary group-hover:text-yj-primary transition-colors duration-300 group-hover:[filter:drop-shadow(0_0_12px_rgba(222,183,255,0.6))]"
            />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-yj-primary mb-2">
              No-Code Workflows
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-yj-on-surface-variant">
              Seamlessly integrate disparate SaaS tools into unified, silent
              pipelines.
            </p>
          </div>
        </BentoCard>

        <BentoCard className="col-span-1 md:col-span-4">
          <div className="flex justify-between items-start">
            <MaterialIcon
              name="forum"
              className="text-4xl text-yj-primary group-hover:text-yj-secondary transition-colors duration-300 group-hover:[filter:drop-shadow(0_0_12px_rgba(0,240,255,0.6))]"
            />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-yj-primary mb-2">
              Custom AI Chatbots
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-yj-on-surface-variant">
              Intelligent conversational interfaces grounded in your proprietary
              enterprise data.
            </p>
          </div>
        </BentoCard>

        <BentoCard className="col-span-1 md:col-span-8">
          <div className="absolute inset-0 yj-bento-noise opacity-50" aria-hidden />
          <div className="flex justify-between items-start relative z-10">
            <MaterialIcon
              name="database"
              className="text-4xl text-yj-primary-container group-hover:text-yj-primary transition-colors duration-300 group-hover:[filter:drop-shadow(0_0_12px_rgba(0,240,255,0.6))]"
            />
            <span className="font-[family-name:var(--font-space-mono)] text-sm text-yj-primary-container bg-yj-primary-container/10 px-3 py-1 rounded-full uppercase">
              Data Layer
            </span>
          </div>
          <div className="relative z-10">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-[32px] font-medium leading-tight text-yj-primary mb-2">
              Retrieval-Augmented Generation
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-base leading-relaxed text-yj-on-surface-variant">
              Connect LLMs to vector databases to ensure outputs are factual,
              up-to-date, and strictly aligned with corporate knowledge bases.
            </p>
          </div>
        </BentoCard>
      </div>
    </section>
  );
}
