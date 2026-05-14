import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Chatbot } from '@/components/chatbot'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.yjventures.in'),
  title: {
    default: 'YJVentures | AI Communication and Automation Solutions',
    template: '%s | YJVentures',
  },
  description: 'YJVentures builds AI-powered communication, automation, appointment management, customer support, and business workflow solutions.',
  openGraph: {
    type: 'website',
    url: 'https://www.yjventures.in',
    siteName: 'YJVentures',
    title: 'YJVentures | AI Communication and Automation Solutions',
    description: 'YJVentures builds AI-powered communication, automation, appointment management, customer support, and business workflow solutions.',
  },
  generator: 'yk',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: '/icon.svg',
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
          <Chatbot />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}