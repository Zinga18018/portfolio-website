import type { Metadata } from 'next'
import Link from 'next/link'
import ResearchDashboard from '@/components/ResearchDashboard'
import styles from './research.module.css'

export const metadata: Metadata = {
  alternates: { canonical: '/research/women-safety/' },
  openGraph: { url: '/research/women-safety/', title: "Women's Safety Narratives in India | Research", description: 'Research accepted at ASONAM 2026 on women’s safety discourse in India.', type: 'article' },
  title: "Women's Safety Narratives in India | Research",
  description: 'Charts and notes from an ASONAM 2026 accepted paper analyzing 351,501 Reddit and YouTube comments across 16 cases in India.',
}

export default function WomenSafetyDashboard() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <nav className={styles.nav} aria-label="Research navigation">
          <Link href="/">Yogesh Kuchimanchi</Link>
          <div><a href="#findings">Findings</a><a href="#methods">Methods &amp; limitations</a></div>
        </nav>
        <header className={styles.header}>
          <p className={styles.meta}>Research · Accepted at ASONAM 2026</p>
          <h1>A Social and Legal Discourse Analysis of Women&apos;s Safety Narratives in India</h1>
          <p className={styles.authors}>Yogesh Kuchimanchi · Charishma Reddy Yerra<br />Rochester Institute of Technology</p>
          <p>We studied 351,501 retained Reddit and YouTube comments across 16 cases in India, with event years from 2012 to 2024. These charts show how the discussions differed by case and over time.</p>
        </header>
        <ResearchDashboard />
        <footer className={styles.footer}>
          <p>Accepted at ASONAM 2026. Proceedings publication is not claimed here.</p>
          <Link href="/">Return to portfolio</Link>
        </footer>
      </div>
    </main>
  )
}
