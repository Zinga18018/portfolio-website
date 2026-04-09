'use client'

import { useReveal } from '@/lib/useReveal'
import { jobs } from '@/lib/data'

export default function Experience() {
  const ref = useReveal()

  return (
    <section id="experience" className="py-24">
      <div className="section-container">
        <div ref={ref} className="reveal">
          <p className="section-label">Experience</p>
          <h2 className="section-title">Work history</h2>

          <div className="mt-10 max-w-3xl">
            <div className="relative pl-8 border-l-2 border-zinc-800 space-y-10">
              {jobs.map((job, i) => (
                <div key={i} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[calc(2rem+5px)] top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-[#09090b]" />

                  <div className="card">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                      <h3 className="text-white font-semibold text-lg">{job.title}</h3>
                      <span className="text-xs font-mono text-zinc-500 whitespace-nowrap">
                        {job.dates}
                      </span>
                    </div>
                    <p className="text-sm text-accent mb-3">{job.org}</p>
                    <ul className="space-y-2">
                      {job.bullets.map((b, j) => (
                        <li key={j} className="text-sm text-zinc-400 flex gap-2">
                          <span className="text-accent mt-1 shrink-0">--</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
