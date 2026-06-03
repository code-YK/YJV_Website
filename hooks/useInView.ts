"use client";

import { useInView as useFramerInView } from "framer-motion";
import { useRef } from "react";

export function useInView<T extends Element = HTMLDivElement>(options?: {
  once?: boolean;
  margin?: string;
  amount?: "some" | "all" | number;
}) {
  const ref = useRef<T>(null);
  const inView = useFramerInView(ref, {
    once: options?.once ?? true,
    margin: options?.margin as `${number}${"px" | "%"}` | undefined,
    amount: options?.amount ?? 0.3,
  });
  return [ref, inView] as const;
}
