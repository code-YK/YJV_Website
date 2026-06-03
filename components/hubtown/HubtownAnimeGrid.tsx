"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { animate, stagger, createTimeline } from "animejs";

const COLORS = ["#3b82f6", "#7c3aed", "#a855f7", "#6366f1"];
const BASE_CELL = 22;
const MAX_CELLS = 2400;
const RIPPLE_RADIUS = 4;

interface Props {
  wordmark?: string;
}

export function HubtownAnimeGrid({ wordmark = "YJ" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let teardown: (() => void) | null = null;
    let aborted = false;

    const setup = async () => {
      if (document.fonts && document.fonts.ready) {
        try {
          await document.fonts.ready;
        } catch {}
      }
      if (aborted) return;

      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      let cellSize = BASE_CELL;
      let cols = Math.ceil(rect.width / cellSize);
      let rows = Math.ceil(rect.height / cellSize);
      while (cols * rows > MAX_CELLS) {
        cellSize += 2;
        cols = Math.ceil(rect.width / cellSize);
        rows = Math.ceil(rect.height / cellSize);
      }

      container.innerHTML = "";
      container.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
      container.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;

      const cells: HTMLDivElement[] = [];
      for (let i = 0; i < cols * rows; i++) {
        const cell = document.createElement("div");
        cell.style.cssText =
          "border:1px solid rgba(255,255,255,0.04);background-color:transparent;will-change:background-color;";
        container.appendChild(cell);
        cells.push(cell);
      }

      const mask = computeWordmarkMask(
        cols,
        rows,
        cellSize,
        rect.width,
        rect.height,
        wordmark,
      );
      const maskedCells = cells.filter((_, i) => mask[i]);

      if (reduced) {
        cells.forEach((c) => {
          c.style.backgroundColor = COLORS[0] + "33";
        });
        return;
      }

      const tl = createTimeline({ loop: true, defaults: { ease: "inOutSine" } });

      tl.add(cells, {
        backgroundColor: [
          { to: COLORS[0], duration: 900 },
          { to: "rgba(0,0,0,0)", duration: 900 },
        ],
        delay: stagger(40, { grid: [cols, rows], from: "center" }),
      });

      tl.add(
        cells,
        {
          backgroundColor: [
            { to: COLORS[1], duration: 900 },
            { to: "rgba(0,0,0,0)", duration: 900 },
          ],
          delay: stagger(30, { grid: [cols, rows], from: [0, 0] }),
        },
        "-=400",
      );

      tl.add(
        cells,
        {
          backgroundColor: [
            { to: COLORS[2], duration: 700 },
            { to: "rgba(0,0,0,0)", duration: 700 },
          ],
          delay: stagger(15, { grid: [cols, rows], from: "random" }),
          ease: "outQuad",
        },
        "-=400",
      );

      if (maskedCells.length > 0) {
        tl.add(
          maskedCells,
          {
            backgroundColor: [
              { to: COLORS[3], duration: 600 },
              { to: COLORS[3], duration: 700 },
              { to: "rgba(0,0,0,0)", duration: 800 },
            ],
            delay: stagger(6),
          },
          "-=200",
        );
      }

      let rafId = 0;
      let lastX = 0;
      let lastY = 0;

      const flush = () => {
        rafId = 0;
        const r = container.getBoundingClientRect();
        const x = lastX - r.left;
        const y = lastY - r.top;
        if (x < 0 || y < 0 || x > r.width || y > r.height) return;
        const cx = Math.floor(x / cellSize);
        const cy = Math.floor(y / cellSize);
        for (let dy = -RIPPLE_RADIUS; dy <= RIPPLE_RADIUS; dy++) {
          for (let dx = -RIPPLE_RADIUS; dx <= RIPPLE_RADIUS; dx++) {
            const nx = cx + dx;
            const ny = cy + dy;
            if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
            const dist = Math.hypot(dx, dy);
            if (dist > RIPPLE_RADIUS) continue;
            const idx = ny * cols + nx;
            const amp = 1 - dist / RIPPLE_RADIUS;
            animate(cells[idx], {
              backgroundColor: [
                { to: `rgba(255,255,255,${amp.toFixed(2)})`, duration: 90 },
                { to: "rgba(0,0,0,0)", duration: 600 },
              ],
              ease: "outExpo",
            });
          }
        }
      };

      const onMove = (e: PointerEvent) => {
        lastX = e.clientX;
        lastY = e.clientY;
        if (rafId) return;
        rafId = requestAnimationFrame(flush);
      };

      window.addEventListener("pointermove", onMove, { passive: true });

      teardown = () => {
        tl.pause();
        window.removeEventListener("pointermove", onMove);
        if (rafId) cancelAnimationFrame(rafId);
      };
    };

    setup();

    const ro = new ResizeObserver(() => {
      teardown?.();
      teardown = null;
      setup();
    });
    ro.observe(container);

    return () => {
      aborted = true;
      ro.disconnect();
      teardown?.();
    };
  }, [reduced, wordmark]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 grid"
    />
  );
}

function computeWordmarkMask(
  cols: number,
  rows: number,
  cellSize: number,
  width: number,
  height: number,
  text: string,
): boolean[] {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const mask = new Array(cols * rows).fill(false);
  if (!ctx) return mask;

  const fontSize = Math.min(width / Math.max(text.length * 0.55, 2), height * 0.7);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `900 ${fontSize}px "Space Grotesk", system-ui, sans-serif`;
  ctx.fillText(text, width / 2, height / 2);

  const data = ctx.getImageData(0, 0, width, height).data;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const px = Math.min(width - 1, Math.floor(col * cellSize + cellSize / 2));
      const py = Math.min(height - 1, Math.floor(row * cellSize + cellSize / 2));
      const idx = (py * width + px) * 4;
      mask[row * cols + col] = data[idx + 3] > 128;
    }
  }
  return mask;
}
