import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'YJ Ventures | AI Automation & WhatsApp Solutions',
  description: 'Automate conversations, accelerate growth. Capture leads, engage customers, and automate workflows with intelligent WhatsApp and AI-powered systems.',
  generator: 'yk',
  icons: {
    icon: [
      { url: '/Salford_Icon.ico', media: '(prefers-color-scheme: light)' },
      { url: '/Salford_Icon.ico', media: '(prefers-color-scheme: dark)' },
      { url: '/Salford_Icon.ico', type: 'image/svg+xml' },
    ],
    apple: '/Salford_Icon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}