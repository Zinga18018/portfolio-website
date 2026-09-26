import { FiArrowDownRight, FiArrowUpRight, FiGithub, FiLinkedin } from 'react-icons/fi'
import { socialLinks } from '@/lib/data'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="section-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">M.S. Data Science · Rochester, New York</p>
          <h1>Hi, I’m Yogesh.</h1>
          <p className="hero-lede">
            I’m a graduate student at RIT working on statistical genetics,
            clinical prediction, model evaluation, and public-discourse research.
            I like projects where I can trace a result back to the data and explain
            what it shows without hiding its limits.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">View selected work <FiArrowDownRight /></a>
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className="btn-quiet"><FiGithub /> GitHub</a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="btn-quiet"><FiLinkedin /> LinkedIn</a>
          </div>
        </div>
        <aside className="hero-note" aria-label="Current focus">
          <p className="hero-note-label">Current project</p>
          <h2>Type 2 diabetes genetic evidence</h2>
          <p className="hero-note-copy">
            I organised public Open Targets records for five FinnGen regions so I
            could learn how researchers narrow a GWAS signal to plausible variants and genes.
          </p>
          <a href="https://zinga18018.github.io/cardiometabolic-gwas-evidence-explorer/" target="_blank" rel="noreferrer">
            Open the evidence explorer <FiArrowUpRight aria-hidden="true" />
          </a>
          <small>Public aggregate data · no participant records</small>
        </aside>
      </div>
    </section>
  )
}
