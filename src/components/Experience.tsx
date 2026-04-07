const jobs = [
  {
    title: 'GCCIS Technical Assistant',
    org: 'Rochester Institute of Technology',
    dates: 'Aug 2025 -- Present',
    desc: 'Supporting lab systems across 200+ machines. Created documentation that reduced repeat service requests by 25%.',
  },
  {
    title: 'Research Assistant',
    org: 'Rochester Institute of Technology',
    dates: 'Dec 2024 -- Apr 2025',
    desc: 'Refactored Python data pipelines with Pandas and NumPy, cutting processing time by 75%. Validated datasets with SQL for faculty research.',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="section-container">
        <p className="text-sm font-mono text-accent mb-2">Experience</p>
        <h2 className="text-3xl font-bold text-white mb-10">Work history</h2>
        <div className="space-y-8 max-w-2xl">
          {jobs.map((job, i) => (
            <div key={i} className="card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                <h3 className="text-white font-semibold">{job.title}</h3>
                <span className="text-xs font-mono text-zinc-500">{job.dates}</span>
              </div>
              <p className="text-sm text-accent mb-2">{job.org}</p>
              <p className="text-sm text-zinc-400">{job.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
