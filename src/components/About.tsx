export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="section-container">
        <p className="text-sm font-mono text-accent mb-2">About</p>
        <h2 className="text-3xl font-bold text-white mb-8">Background</h2>
        <div className="max-w-2xl space-y-4 text-zinc-400 leading-relaxed">
          <p>
            Graduate data science student at RIT with a focus on applied NLP, retrieval-augmented
            generation, and multi-agent AI systems. Every project in this portfolio runs real
            transformer inference in production -- FastAPI backends, Docker containers, Hugging Face
            Spaces.
          </p>
          <p>
            Previously a Research Assistant where I refactored data pipelines with Pandas and NumPy,
            reducing processing time by 75%. Strong foundation in Python, statistical analysis, and
            cloud infrastructure (AWS, GCP).
          </p>
        </div>
      </div>
    </section>
  )
}
