import { Space_Grotesk, Inter, Space_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { rootMetadata } from "@/lib/metadata";
import { EngineNav } from "@/components/yj/EngineNav";
import { HubtownFooter } from "@/components/hubtown/HubtownFooter";
import { HubtownLoader } from "@/components/hubtown/HubtownLoader";
import { HubtownContactFab } from "@/components/hubtown/HubtownContactFab";
import { RouteProgress } from "@/components/yj/RouteProgress";
import { PageTransition } from "@/components/yj/PageTransition";
import { RouteAnnouncer } from "@/components/yj/RouteAnnouncer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-hub-paper text-hub-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:border focus:border-hub-accent focus:bg-hub-paper focus:px-4 focus:py-2 focus:font-[family-name:var(--font-space-grotesk)] focus:text-xs focus:font-bold focus:uppercase focus:tracking-[0.22em] focus:text-hub-accent focus:shadow-[0_0_24px_rgba(167,139,250,0.45)] focus:outline-none"
        >
          Skip to content
        </a>
        <Providers>
          <HubtownLoader />
          <RouteProgress />
          <RouteAnnouncer />
          <EngineNav />
          <main id="main" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <HubtownFooter />
          <HubtownContactFab />
        </Providers>
      </body>
    </html>
  );
}
