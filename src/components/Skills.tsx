'use client'

import { useReveal } from '@/lib/useReveal'
import { skillGroups } from '@/lib/data'

export default function Skills() {
  const ref = useReveal()

  return (
    <section id="skills" className="py-24">
      <div className="section-container">
        <div ref={ref} className="reveal">
          <p className="section-label">Skills</p>
          <h2 className="section-title">Technical stack</h2>
          <p className="text-zinc-400 mb-10 max-w-xl">
            Tools and technologies I use to build, train, deploy, and monitor ML systems.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
            {skillGroups.map((g, i) => (
              <div key={i} className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <h3 className="text-white font-semibold">{g.name}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.skills.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
