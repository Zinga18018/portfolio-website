import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yogesh Kuchimanchi - Data Scientist & AI Developer',
  description: 'Portfolio of Yogesh Kuchimanchi - Data Scientist specializing in Machine Learning and AI development',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#000000',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <div id="root" className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
} 