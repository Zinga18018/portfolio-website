import Image from 'next/image'
import ChapterReveal from '@/components/ChapterReveal'
import LabEnvironment from '@/components/lab/LabEnvironment'
import PcWorkbench from '@/components/PcWorkbench'
import ProjectArchive from '@/components/ProjectArchive'
import { experience, featuredProjects, skillLines } from '@/lib/portfolio-data'

export default function Home() {
  return (
    <>
      <LabEnvironment />
      <a className="skip-link" href="#fieldwork">Skip to selected work</a>
      <main className="v3-main" id="top">
        <header className="v3-header shell">
          <a className="v3-wordmark" href="#top">YOGESH KUCHIMANCHI</a>
          <nav aria-label="Primary navigation">
            <a href="#fieldwork">Work</a>
            <a href="#systems">Systems</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="v3-resume" href="/Yogesh_Kuchimanchi_Resume.pdf" target="_blank">Résumé ↗</a>
        </header>

        <section className="v3-hero shell" aria-labelledby="hero-title">
          <div className="chapter-rail"><span>CH 00</span><span>INITIALIZATION</span></div>
          <div className="hero-stage">
            <p className="system-label">DATA SCIENCE · ML SYSTEMS · RESEARCH</p>
            <h1 id="hero-title">YOGESH<br />KUCHIMANCHI</h1>
            <p className="hero-summary">
              M.S. Data Science candidate at Rochester Institute of Technology. Healthcare modeling,
              NLP research, retrieval systems, and model evaluation. Graduating December 2026.
            </p>
            <div className="hero-links">
              <a href="#fieldwork">Open project log ↓</a>
              <a href="https://github.com/Zinga18018" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/yogeshkuchimanchi/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
          <div className="hero-readout" aria-label="Profile status">
            <span><b>BASE</b> Rochester, New York</span>
            <span><b>FOCUS</b> Healthcare ML · NLP · Analytics</span>
            <span><b>STATUS</b> December 2026 graduate</span>
          </div>
        </section>

        <div id="fieldwork">
          {featuredProjects.map((project, index) => (
            <section className="project-chapter" id={project.id} key={project.id} aria-labelledby={`${project.id}-title`}>
              <ChapterReveal className="chapter-shell shell">
                <div className="chapter-index">
                  <span>{project.chapter}</span>
                  <small>{String(index + 1).padStart(2, '0')} / 03</small>
                </div>
                <header className="chapter-heading">
                  <p className="system-label">{project.eyebrow}</p>
                  <h2 id={`${project.id}-title`}>{project.title}</h2>
                  {project.status ? <strong className="acceptance-flag">{project.status}</strong> : null}
                  <p>{project.summary}</p>
                </header>

                <div className="project-evidence">
                  <a className="evidence-image" href={project.route} aria-label={`Open ${project.title} dashboard`}>
                    <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 860px) 100vw, 66vw" />
                    <span>OPEN DASHBOARD ↗</span>
                  </a>
                  <aside className="evidence-ledger">
                    {project.metrics.map((metric) => (
                      <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>
                    ))}
                    <p>{project.note}</p>
                  </aside>
                </div>

                <div className="chapter-actions">
                  <a href={project.route}>View dashboard →</a>
                  <a href={project.repo} target="_blank" rel="noreferrer">Source repository ↗</a>
                  <a href={project.proof} target="_blank" rel="noreferrer">Verified metrics ↗</a>
                </div>
              </ChapterReveal>
            </section>
          ))}
        </div>

        <section className="systems-chapter" id="systems" aria-labelledby="systems-title">
          <ChapterReveal className="chapter-shell shell">
            <div className="chapter-index"><span>CH 04</span><small>SYSTEMS LAB</small></div>
            <header className="chapter-heading compact-heading">
              <p className="system-label">PC BUILDING · ML SYSTEMS · 43 REPOSITORIES</p>
              <h2 id="systems-title">Systems Lab</h2>
              <p>PC building taught me to check compatibility, measure bottlenecks, test one change at a time, and leave a system maintainable.</p>
            </header>
            <div className="skill-ledger">
              {skillLines.map(([label, items]) => <div key={label}><span>{label}</span><p>{items}</p></div>)}
            </div>
            <PcWorkbench />
          </ChapterReveal>
          <div className="shell archive-shell"><ProjectArchive /></div>
        </section>

        <section className="contact-chapter" id="contact" aria-labelledby="contact-title">
          <ChapterReveal className="chapter-shell shell">
            <div className="chapter-index"><span>CH 05</span><small>EXPERIENCE / CONTACT</small></div>
            <header className="chapter-heading compact-heading">
              <p className="system-label">RIT · ROCHESTER, NEW YORK</p>
              <h2 id="contact-title">Experience &amp; contact</h2>
              <p>I am looking for data science, machine learning, and analytics roles starting after December 2026.</p>
            </header>
            <div className="experience-grid">
              <div className="timeline">
                {experience.map((item) => (
                  <article key={item.role}>
                    <time>{item.date}</time>
                    <h3>{item.role}</h3>
                    <strong>{item.org}</strong>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
              <aside className="education-file">
                <span>EDUCATION FILE</span>
                <b>RIT</b>
                <h3>M.S. Data Science</h3>
                <p>Rochester Institute of Technology</p>
                <dl><div><dt>EXPECTED</dt><dd>December 2026</dd></div><div><dt>BASE</dt><dd>Rochester, NY</dd></div></dl>
                <a href="/Yogesh_Kuchimanchi_Resume.pdf" target="_blank">Read résumé ↗</a>
              </aside>
            </div>
            <div className="contact-band">
              <p>Healthcare data and applied machine learning are my main interests.</p>
              <div>
                <a href="mailto:kuchimanchiyogesh@gmail.com">Email Yogesh ↗</a>
                <a href="https://www.linkedin.com/in/yogeshkuchimanchi/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a href="https://github.com/Zinga18018" target="_blank" rel="noreferrer">GitHub ↗</a>
              </div>
            </div>
          </ChapterReveal>
        </section>

        <footer className="site-footer shell">
          <span>YK // VERCEL DATA LAB</span><span>LAST VERIFIED · 2026-08-24</span><a href="#top">BACK TO TOP ↑</a>
        </footer>
      </main>
    </>
  )
}
