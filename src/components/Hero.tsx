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
        <aside className="hero-note" aria-label="Newest project demo">
          <p className="hero-note-label">Newest build</p>
          <h2>Prompt Rewriter</h2>
          <p className="hero-note-copy">
            A Windows-first desktop MVP that turns rough selected text into a structured AI prompt.
            The recorded Notepad demo uses local Ollama.
          </p>
          <a href="#project-01">
            Watch the demo <FiArrowUpRight aria-hidden="true" />
          </a>
          <small>Tested MVP · cross-app reliability unverified</small>
        </aside>
      </div>
    </section>
  )
}
