'use client'

import { skillGroups } from '@/lib/data'
import { useReveal } from '@/lib/useReveal'

export default function SkillsConstellation() {
  const ref = useReveal()
  return (
    <section id="skills" className="section skills-section">
      <div className="section-container">
        <div ref={ref} className="reveal">
          <div className="section-intro"><p className="eyebrow">Skills</p><h2>Tools I use.</h2><p>Languages, modeling libraries, databases, and tools used in my projects.</p></div>
          <div className="skill-bench">
            {skillGroups.map((group, index) => (
              <article key={group.name}><span>{String(index + 1).padStart(2, '0')}</span><h3>{group.name}</h3><p>{group.skills.join(' · ')}</p></article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
