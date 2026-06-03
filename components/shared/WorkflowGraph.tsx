"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { easings } from "@/lib/motion-tokens";
import type { IconName } from "@/lib/content/types";
import { cn } from "@/lib/utils";

const easeOut = easings.smooth;

export type WorkflowNode =
  | {
      kind: "rich";
      label: string;
      sublabel?: string;
      icon?: IconName;
      deliverables?: string[];
    }
  | { kind: "compact"; label: string; icon?: IconName };

export interface WorkflowGraphProps {
  nodes: WorkflowNode[];
  ariaLabel?: string;
  className?: string;
  id?: string;
}

interface PortPos {
  inX: number;
  inY: number;
  outX: number;
  outY: number;
}

export function WorkflowGraph({
  nodes,
  ariaLabel,
  className,
  id,
}: WorkflowGraphProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [positions, setPositions] = useState<PortPos[]>([]);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let raf = 0;

    const measure = () => {
      raf = 0;
      const c = containerRef.current;
      if (!c) return;
      const cRect = c.getBoundingClientRect();
      const next: PortPos[] = [];
      for (const node of nodeRefs.current) {
        if (!node) continue;
        const inEl = node.querySelector<HTMLElement>('[data-port="in"]');
        const outEl = node.querySelector<HTMLElement>('[data-port="out"]');
        if (!inEl || !outEl) continue;
        const inRect = inEl.getBoundingClientRect();
        const outRect = outEl.getBoundingClientRect();
        next.push({
          inX: inRect.left + inRect.width / 2 - cRect.left,
          inY: inRect.top + inRect.height / 2 - cRect.top,
          outX: outRect.left + outRect.width / 2 - cRect.left,
          outY: outRect.top + outRect.height / 2 - cRect.top,
        });
      }
      setPositions(next);
      setContainerSize({ w: c.scrollWidth, h: c.scrollHeight });
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(measure);
    };

    schedule();
    const ro = new ResizeObserver(schedule);
    ro.observe(container);
    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [nodes.length]);

  const pathFor = (p1: PortPos, p2: PortPos): string => {
    const x1 = p1.outX;
    const y1 = p1.outY;
    const x2 = p2.inX;
    const y2 = p2.inY;
    const sameRow = Math.abs(y1 - y2) < 4;

    if (sameRow) {
      const k = Math.max(40, (x2 - x1) * 0.4);
      return `M ${x1} ${y1} C ${x1 + k} ${y1}, ${x2 - k} ${y2}, ${x2} ${y2}`;
    }

    // Snake to next row: bend right, sweep across, bend down-right.
    const pad = 24;
    const rightEdge = Math.max(containerSize.w - pad, x1 + 80);
    const leftEdge = Math.min(pad, x2 - 80);
    const midY = (y1 + y2) / 2;
    const k = 60;
    return [
      `M ${x1} ${y1}`,
      `C ${x1 + k} ${y1}, ${rightEdge} ${y1}, ${rightEdge} ${midY}`,
      `L ${leftEdge} ${midY}`,
      `C ${leftEdge} ${y2}, ${x2 - k} ${y2}, ${x2} ${y2}`,
    ].join(" ");
  };

  const pathsReady =
    positions.length === nodes.length && nodes.length > 1 && containerSize.w > 0;

  return (
    <div
      data-theme="dark"
      id={id}
      role="region"
      aria-label={ariaLabel}
      className={cn(
        "bg-grid relative isolate overflow-hidden rounded-xl border border-hub-rule p-6 md:p-10",
        "shadow-[inset_0_0_120px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      <div ref={containerRef} className="relative">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          width="100%"
          height={containerSize.h || "100%"}
          viewBox={`0 0 ${Math.max(containerSize.w, 1)} ${Math.max(
            containerSize.h,
            1,
          )}`}
          preserveAspectRatio="none"
        >
          {pathsReady &&
            positions.slice(0, -1).map((p, i) => {
              const next = positions[i + 1];
              const d = pathFor(p, next);
              const connectorDelay = 0.35 + i * 0.5;
              return (
                <motion.path
                  key={`edge-${i}`}
                  d={d}
                  fill="none"
                  stroke="var(--hub-accent)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  initial={reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.4 }}
                  whileInView={
                    reduced ? undefined : { pathLength: 1, opacity: 1 }
                  }
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{
                    duration: 0.45,
                    delay: connectorDelay,
                    ease: easeOut,
                  }}
                />
              );
            })}
        </svg>

        <ol className="relative z-10 flex flex-wrap gap-x-12 gap-y-16">
          {nodes.map((node, i) => {
            const delay = i === 0 ? 0 : 0.35 + (i - 1) * 0.5 + 0.4;
            const isRich = node.kind === "rich";
            return (
              <motion.li
                key={i}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                initial={
                  reduced ? false : { opacity: 0, y: 12, scale: 0.94 }
                }
                whileInView={
                  reduced ? undefined : { opacity: 1, y: 0, scale: 1 }
                }
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.45, delay, ease: easeOut }}
                className={cn(
                  "tilt-card group relative flex flex-col gap-3 rounded-lg border border-hub-rule bg-hub-paper-alt p-4 text-hub-ink",
                  "shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(167,139,250,0.04)]",
                  "transition-colors duration-300 hover:border-hub-accent/60 hover:shadow-[0_18px_36px_-12px_rgba(167,139,250,0.5)]",
                  isRich
                    ? "w-64 min-h-[200px] p-5"
                    : "w-48 min-w-44 min-h-[92px]",
                )}
              >
                <span
                  data-port="in"
                  aria-hidden
                  className="absolute -left-[5px] top-1/2 size-2.5 -translate-y-1/2 rounded-full border border-hub-accent bg-hub-paper"
                />
                <header className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-space-mono)] text-xs uppercase tracking-[0.22em] text-hub-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {node.icon && (
                    <Icon
                      name={node.icon}
                      className="h-4 w-4 text-hub-ink-muted transition-colors duration-300 group-hover:text-hub-accent"
                    />
                  )}
                </header>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-base font-semibold leading-snug text-hub-ink">
                  {node.label}
                </h3>
                {isRich && node.sublabel && (
                  <p className="text-xs leading-relaxed text-hub-ink-muted">
                    {node.sublabel}
                  </p>
                )}
                {isRich && node.deliverables && node.deliverables.length > 0 && (
                  <ul className="mt-auto space-y-1 pt-2">
                    {node.deliverables.map((d) => (
                      <li
                        key={d}
                        className="border-t border-hub-rule pt-1.5 font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.18em] text-hub-ink-muted"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
                <span
                  data-port="out"
                  aria-hidden
                  className="absolute -right-[5px] top-1/2 size-2.5 -translate-y-1/2 rounded-full border border-hub-accent bg-hub-paper"
                />
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
