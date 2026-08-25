import type { Metadata } from 'next'
import { Azeret_Mono, IBM_Plex_Sans, League_Gothic } from 'next/font/google'
import './globals.css'

const display = League_Gothic({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
const mono = Azeret_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })
const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-website-pied-tau-72.vercel.app'),
  title: 'Yogesh Kuchimanchi | Data Science & ML Systems',
  description:
    'Data science portfolio of Yogesh Kuchimanchi: healthcare modeling, NLP research, retrieval systems, evaluation, and interactive project dashboards.',
  keywords: ['machine learning', 'data science', 'healthcare analytics', 'NLP', 'RAG', 'model evaluation'],
  authors: [{ name: 'Yogesh Kuchimanchi' }],
  openGraph: {
    title: 'Yogesh Kuchimanchi | Data Science & ML Systems',
    description: 'Healthcare ML, NLP research, retrieval systems, and model evaluation.',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og.png', width: 1731, height: 909, alt: 'Yogesh Kuchimanchi data science portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yogesh Kuchimanchi | Data Science & ML Systems',
    description: 'Healthcare ML, NLP research, retrieval systems, and model evaluation.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  )
}
