"use client";

import dynamic from "next/dynamic";
import type { AntigravityProps } from "./Antigravity";

const Antigravity = dynamic(() => import("./Antigravity"), {
  ssr: false,
  loading: () => null,
});

export function AntigravityBackground(props: AntigravityProps) {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Antigravity {...props} />
    </div>
  );
}
