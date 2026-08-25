'use client'

import { skillGroups } from '@/lib/data'
import { useReveal } from '@/lib/useReveal'

export default function SkillsConstellation() {
  const ref = useReveal()
  return (
    <section id="skills" className="section skills-section">
      <div className="section-container">
        <div ref={ref} className="reveal">
          <div className="section-intro"><p className="eyebrow">Skills</p><h2>The tools on my bench.</h2><p>Grouped by the work they support, not by logo count.</p></div>
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
