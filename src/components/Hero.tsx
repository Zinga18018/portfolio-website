import { FiArrowDownRight, FiArrowUpRight, FiGithub, FiLinkedin } from 'react-icons/fi'
import { socialLinks } from '@/lib/data'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="section-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">RIT M.S. Data Science · Expected December 2026 · Rochester, NY</p>
          <h1>Data science. Tested ML.</h1>
          <p className="hero-lede">
            I&apos;m Yogesh, an M.S. Data Science student at RIT. I build Python tools
            for model evaluation, NLP, and public-data research. Here you can explore
            the code, results, and decisions behind my work.
          </p>
          <p>Seeking early-career Data Scientist &amp; ML Engineer roles.</p>
          <div className="hero-actions"><a href="/career-summary.html" className="btn-quiet">Career summary</a>
            <a href="#projects" className="btn-primary">View selected work <FiArrowDownRight /></a>
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className="btn-quiet"><FiGithub /> GitHub</a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="btn-quiet"><FiLinkedin /> LinkedIn</a>
          </div>
        </div>
        <aside className="hero-note" aria-label="Featured research">
          <p className="hero-note-label">Featured research</p>
          <h2>Women’s-Safety Discourse Research</h2>
          <p className="hero-note-copy">
            Co-authored research accepted at ASONAM 2026, analyzing 351,501 comments
            across 16 cases with Python pipelines and statistical comparisons.
          </p>
          <a href="/research/women-safety/" target="_blank" rel="noreferrer">
            Explore the research <FiArrowUpRight aria-hidden="true" />
          </a>
          <small>Submitted-paper findings and later model audits are separated.</small>
        </aside>
      </div>
    </section>
  )
}
