import { FiArrowDownRight, FiArrowUpRight, FiGithub, FiLinkedin } from 'react-icons/fi'
import { socialLinks } from '@/lib/data'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="section-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">M.S. Data Science · Rochester, New York</p>
          <h1>From signal to evidence.</h1>
          <p className="hero-lede">
            A recent project compares available Open Targets variant, candidate-gene,
            and molecular evidence for five selected FinnGen type 2 diabetes regions.
            It is an evidence explorer, not a new GWAS or causal proof.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">View selected work <FiArrowDownRight /></a>
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className="btn-quiet"><FiGithub /> GitHub</a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="btn-quiet"><FiLinkedin /> LinkedIn</a>
          </div>
        </div>
        <aside className="hero-note" aria-label="Featured project">
          <p className="hero-note-label">Featured project</p>
          <h2>Cardiometabolic GWAS Evidence Explorer</h2>
          <p className="hero-note-copy">
            An audit of existing FinnGen and Open Targets evidence across five selected
            type 2 diabetes regions, from variants to candidate genes and molecular clues.
          </p>
          <a href="https://zinga18018.github.io/cardiometabolic-gwas-evidence-explorer/" target="_blank" rel="noreferrer">
            Open the evidence explorer <FiArrowUpRight aria-hidden="true" />
          </a>
          <small>Public aggregate data · candidate evidence, not causal proof</small>
        </aside>
      </div>
    </section>
  )
}
