'use client'

import { degrees } from '@/lib/data'
import { useReveal } from '@/lib/useReveal'

export default function Education() {
  const ref = useReveal()
  return (
    <section id="education" className="section education-section">
      <div className="section-container">
        <div ref={ref} className="reveal">
          <div className="section-intro"><p className="eyebrow">Education</p><h2>Education.</h2></div>
          <div className="degree-grid">
            {degrees.map((degree, index) => (
              <article key={degree.degree}><span>{String(index + 1).padStart(2, '0')}</span><time>{degree.year}</time><h3>{degree.degree}</h3><p>{degree.school}</p>{degree.courses && <small>{degree.courses}</small>}</article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
