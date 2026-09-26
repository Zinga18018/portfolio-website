import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://yogeshkuchimanchi.com'),
  title: 'Yogesh Kuchimanchi | Data Scientist',
  description:
    'Data science portfolio of Yogesh Kuchimanchi: statistical genetics, clinical risk modeling, model evaluation, NLP, and public-data research.',
  keywords: ['statistical genetics', 'GWAS', 'machine learning', 'data science', 'NLP', 'model evaluation', 'portfolio'],
  authors: [{ name: 'Yogesh Kuchimanchi' }],
  openGraph: {
    title: 'Yogesh Kuchimanchi | Data Scientist',
    description: 'Statistical genetics, machine learning, and public-data research with traceable results.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Yogesh Kuchimanchi | Data Scientist',
    description: 'Statistical genetics, machine learning, and public-data research with traceable results.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} scroll-smooth`}>
      <body>{children}</body>
    </html>
  )
}
