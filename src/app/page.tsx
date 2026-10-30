import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Projects from '@/components/Projects'
import SkillsConstellation from '@/components/SkillsConstellation'
import Contact from '@/components/Contact'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { url: '/', title: 'Yogesh Kuchimanchi | Data Science & Machine Learning', description: 'NLP research, reproducible model evaluation, and Python/SQL projects with traceable evidence.', type: 'website' },
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <GitHubProjects />
        <Experience />
        <Education />
        <SkillsConstellation />
        <Contact />
      </main>
      <footer className="site-footer">
        <p>Yogesh Kuchimanchi · Rochester, New York</p>
        <a href="#top">Back to top</a>
      </footer>
    </>
  )
}
import type { Metadata } from 'next'
import GitHubProjects from '@/components/GitHubProjects'
