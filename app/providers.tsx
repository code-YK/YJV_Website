"use client";

import "lenis/dist/lenis.css";
import { ParallaxProvider } from "react-scroll-parallax";
import { ThemeProvider } from "@/components/yj/ThemeProvider";
import { SmoothScrollProvider } from "@/components/scroll/SmoothScrollProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <ParallaxProvider>{children}</ParallaxProvider>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
