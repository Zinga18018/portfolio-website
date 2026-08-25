import { FiArrowDownRight, FiGithub, FiLinkedin } from 'react-icons/fi'
import { socialLinks } from '@/lib/data'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="section-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Yogesh Kuchimanchi · Data Scientist</p>
          <h1>I build ML systems you can inspect, test, and trust.</h1>
          <p className="hero-lede">
            M.S. Data Science candidate at RIT, working across clinical risk, NLP,
            evaluation, and model monitoring. I care about what happens after a model trains.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">Build the PC <FiArrowDownRight /></a>
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className="btn-quiet"><FiGithub /> GitHub</a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="btn-quiet"><FiLinkedin /> LinkedIn</a>
          </div>
        </div>
        <aside className="hero-note" aria-label="Current focus">
          <span className="note-pin" />
          <p>Current focus</p>
          <h2>Reliable tabular ML</h2>
          <ul>
            <li>Leakage-safe splits</li>
            <li>Calibration before confidence</li>
            <li>Drift after deployment</li>
          </ul>
          <small>Expected graduation · Dec 2026</small>
        </aside>
      </div>
      <div className="hero-ticker" aria-hidden="true"><span>DATA</span><i /> <span>FEATURES</span><i /> <span>MODELS</span><i /> <span>EVALUATION</span><i /> <span>MONITORING</span></div>
    </section>
  )
}
