import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-website-pied-tau-72.vercel.app'),
  title: 'Yogesh Kuchimanchi | Data Scientist',
  description:
    'Data science portfolio of Yogesh Kuchimanchi: leakage-safe clinical risk modeling, transformer news classification, and model drift monitoring.',
  keywords: ['machine learning', 'data science', 'NLP', 'model monitoring', 'PyTorch', 'portfolio'],
  authors: [{ name: 'Yogesh Kuchimanchi' }],
  openGraph: {
    title: 'Yogesh Kuchimanchi | Data Scientist',
    description: 'Inspectable ML systems, honest evaluation, and working demos.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Yogesh Kuchimanchi | Data Scientist',
    description: 'Inspectable ML systems, honest evaluation, and working demos.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} scroll-smooth`}>
      <body>{children}</body>
    </html>
  )
}
