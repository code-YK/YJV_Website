import type { Stat } from "./types";

// TODO(user): verify before launch. These numbers also appear in
// lib/constants.ts heroContent.trustPills, keep them consistent.
export const stats: Stat[] = [
  { value: "50+", target: 50, suffix: "+", label: "Projects shipped" },
  { value: "9 wk", target: 9, suffix: " wk", label: "Median MVP delivery" },
  { value: "70%", target: 70, suffix: "%", label: "Ops cost reduction (avg)" },
  { value: "5★", target: 5, suffix: "★", label: "Client rating" },
];
