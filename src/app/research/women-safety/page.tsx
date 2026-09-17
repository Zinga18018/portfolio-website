import type { Metadata } from 'next'
import Link from 'next/link'
import ResearchDashboard from '@/components/ResearchDashboard'

export const metadata: Metadata = {
  alternates: { canonical: '/research/women-safety/' },
  openGraph: { url: '/research/women-safety/', title: "Women's Safety Narratives in India | Research Dashboard", description: 'Research accepted at ASONAM 2026 on women’s safety discourse in India.', type: 'article' },
  title: "Women's Safety Narratives in India | Research Dashboard",
  description: 'An evidence-labeled dashboard for an ASONAM 2026 accepted paper analyzing 351,501 Reddit and YouTube comments across 16 cases in India.',
}

const metrics = [
  { value: '351,501', label: 'retained public comments' },
  { value: '16', label: 'cases across India' },
  { value: '2012–2024', label: 'event-year span' },
  { value: '92.8%', label: 'paper-facing annotator agreement' },
]

export default function WomenSafetyDashboard() {
  return (
    <main className="paper-dashboard">
      <nav className="paper-nav">
        <Link href="/" className="paper-mark">YK / Research</Link>
        <div><a href="#findings">Findings</a><a href="#methods">Methods</a></div>
      </nav>
      <header className="paper-hero">
        <div className="paper-status">Accepted paper · ASONAM 2026</div>
        <p className="paper-kicker">Social computing · NLP · India</p>
        <h1>A Social and Legal Discourse Analysis of Women&apos;s Safety Narratives in India</h1>
        <p className="paper-authors">Yogesh Kuchimanchi · Charishma Reddy Yerra · Rochester Institute of Technology</p>
        <p className="paper-summary">A longitudinal analysis of how Reddit and YouTube discussions assign responsibility, support victims, and preserve public memory across major women&apos;s-safety cases.</p>
      </header>
      <section className="paper-metrics" aria-label="Research snapshot">
        {metrics.map((metric) => <article key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></article>)}
      </section>
      <ResearchDashboard />
      <footer className="paper-footer"><div><strong>Read the results carefully.</strong><p>Accepted at ASONAM 2026. Proceedings publication is not claimed here.</p></div><Link href="/">Return to Yogesh&apos;s portfolio</Link></footer>
    </main>
  )
}
