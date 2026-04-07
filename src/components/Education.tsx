const degrees = [
  {
    degree: 'M.S. Data Science',
    school: 'Rochester Institute of Technology, NY',
    year: '2024 -- 2026',
    courses: 'Machine Learning, Deep Learning, Cloud Computing, Big Data Analytics',
  },
  {
    degree: 'PGP Data Science',
    school: 'Vellore Institute of Technology, India',
    year: '2023 -- 2024',
  },
  {
    degree: 'B.C.A. Computer Applications',
    school: 'New Shores International College, India',
    year: '2020 -- 2023',
  },
]

export default function Education() {
  return (
    <section id="education" className="py-24">
      <div className="section-container">
        <p className="text-sm font-mono text-accent mb-2">Education</p>
        <h2 className="text-3xl font-bold text-white mb-10">Degrees</h2>
        <div className="grid gap-4 max-w-2xl">
          {degrees.map((d, i) => (
            <div key={i} className="card">
              <h3 className="text-white font-semibold">{d.degree}</h3>
              <p className="text-sm text-zinc-400 mt-1">{d.school}</p>
              <p className="text-xs font-mono text-zinc-500 mt-1">{d.year}</p>
              {d.courses && (
                <p className="text-xs text-zinc-500 mt-2">{d.courses}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
