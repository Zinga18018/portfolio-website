import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Yogesh Kuchimanchi | ML Engineer & Data Scientist',
  description:
    'Portfolio of Yogesh Kuchimanchi. MS Data Science at RIT. Building production ML systems with real transformer inference, RAG pipelines, and multi-agent AI.',
  keywords: ['machine learning', 'data science', 'NLP', 'RAG', 'PyTorch', 'portfolio'],
  authors: [{ name: 'Yogesh Kuchimanchi' }],
  openGraph: {
    title: 'Yogesh Kuchimanchi | ML Engineer & Data Scientist',
    description: 'Production ML systems with live demos. MS Data Science at RIT.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yogesh Kuchimanchi | ML Engineer & Data Scientist',
    description: 'Production ML systems with live demos. MS Data Science at RIT.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} scroll-smooth dark`}>
      <body className="font-sans bg-[#09090b] text-zinc-300 antialiased">{children}</body>
    </html>
  )
}
