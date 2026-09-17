import { FiArrowDownRight, FiGithub, FiLinkedin } from 'react-icons/fi'
import { socialLinks } from '@/lib/data'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="section-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Yogesh Kuchimanchi · Data Scientist</p>
          <h1>I got into data by building PCs.</h1>
          <p className="hero-lede">
            I’m Yogesh, a data science graduate student at RIT. Collecting parts
            got me interested in the numbers behind a decision. These days,
            that curiosity takes me into machine learning, language, and how things change over time.
          </p>
          <div className="hero-actions">
            <a href="#about" className="btn-primary">How I got here <FiArrowDownRight /></a>
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className="btn-quiet"><FiGithub /> GitHub</a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="btn-quiet"><FiLinkedin /> LinkedIn</a>
          </div>
        </div>
        <aside className="hero-note" aria-label="Current focus">
          <span className="note-pin" />
          <p>What I’m working on</p>
          <h2>From comparisons to questions.</h2>
          <ul>
            <li>Comparing models fairly</li>
            <li>Making sense of language</li>
            <li>Following change over time</li>
          </ul>
          <small>Expected graduation · Dec 2026</small>
        </aside>
      </div>
      <div className="hero-ticker" aria-hidden="true"><span>PC BUILDS</span><i /> <span>COMPARISONS</span><i /> <span>QUESTIONS</span><i /> <span>RESEARCH</span><i /> <span>PROJECTS</span></div>
    </section>
  )
}
