import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yogesh Kuchimanchi - Data Scientist & ML Innovator',
  description: 'Portfolio of Yogesh Kuchimanchi, a Data Scientist with expertise in ML pipelines, automation, and practical AI solutions. M.S. Data Science at RIT.',
  keywords: 'Data Scientist, Machine Learning, Python, R, SQL, Streamlit, AI, MLOps, AWS, Pandas, XGBoost, Portfolio',
  authors: [{ name: 'Yogesh Kuchimanchi' }],
  metadataBase: new URL('https://yogesh-kuchimanchi.vercel.app'),
  openGraph: {
    title: 'Yogesh Kuchimanchi - Data Scientist & ML Innovator',
    description: 'Portfolio showcasing practical data science solutions, ML projects, and automation tools',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yogesh Kuchimanchi - Data Scientist & ML Innovator',
    description: 'Portfolio showcasing practical data science solutions, ML projects, and automation tools',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
} 