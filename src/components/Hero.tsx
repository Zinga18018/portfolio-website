export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="section-container">
        <div className="max-w-2xl">
          <p className="text-sm font-mono text-accent mb-4">
            M.S. Data Science @ Rochester Institute of Technology
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Yogesh<br />
            <span className="gradient-text">Kuchimanchi</span>
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-xl">
            ML engineer building production systems with real transformer inference.
            From RAG pipelines to multi-agent orchestration, every project ships with
            a live demo.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#projects"
              className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/80 transition-colors">
              View projects
            </a>
            <a href="https://github.com/Zinga18018" target="_blank" rel="noopener"
              className="px-6 py-3 border border-zinc-700 text-zinc-300 rounded-lg font-medium hover:border-zinc-500 transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yogesh-kuchimanchi" target="_blank" rel="noopener"
              className="px-6 py-3 border border-zinc-700 text-zinc-300 rounded-lg font-medium hover:border-zinc-500 transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
