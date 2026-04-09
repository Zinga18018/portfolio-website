'use client'

import { useReveal } from '@/lib/useReveal'
import { degrees } from '@/lib/data'

export default function Education() {
  const ref = useReveal()

  return (
    <section id="education" className="py-24">
      <div className="section-container">
        <div ref={ref} className="reveal">
          <p className="section-label">Education</p>
          <h2 className="section-title">Degrees</h2>

          <div className="grid gap-4 max-w-3xl mt-8">
            {degrees.map((d, i) => (
              <div key={i} className="card flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-bold text-sm">
                    {d.year.slice(0, 4)}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{d.degree}</h3>
                  <p className="text-sm text-zinc-400 mt-1">{d.school}</p>
                  {d.courses && (
                    <p className="text-xs text-zinc-500 mt-2">
                      <span className="text-zinc-600">Key courses:</span> {d.courses}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
