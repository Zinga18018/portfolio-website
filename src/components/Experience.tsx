'use client'

import { jobs } from '@/lib/data'
import { useReveal } from '@/lib/useReveal'

export default function Experience() {
  const ref = useReveal()
  return (
    <section id="experience" className="section experience-section">
      <div className="section-container">
        <div ref={ref} className="reveal experience-grid">
          <div className="section-intro"><p className="eyebrow">Experience</p><h2>Where I’ve worked.</h2></div>
          <div className="timeline">
            {jobs.map((job, index) => (
              <article key={`${job.title}-${job.dates}`}>
                <span className="timeline-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="timeline-body">
                  <div><h3>{job.title}</h3><p>{job.org}</p></div><time>{job.dates}</time>
                  <ul>{job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
