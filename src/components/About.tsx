'use client'

import { useReveal } from '@/lib/useReveal'

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" className="py-24">
      <div className="section-container">
        <div ref={ref} className="reveal">
          <p className="section-label">About</p>
          <h2 className="section-title">Background</h2>

          <div className="grid md:grid-cols-3 gap-10 mt-8">
            <div className="md:col-span-2 space-y-5 text-zinc-400 leading-relaxed">
              <p>
                I'm a graduate data science student at RIT focused on applied NLP,
                retrieval-augmented generation, and multi-agent AI systems. Every
                project in this portfolio runs real transformer inference in
                production -- FastAPI backends, Docker containers, Hugging Face Spaces.
              </p>
              <p>
                As a Research Assistant at RIT, I refactored data pipelines with
                Pandas and NumPy, reducing processing time by 75%. I have a strong
                foundation in Python, statistical analysis, and cloud infrastructure
                across AWS and GCP.
              </p>
              <p>
                I'm driven by building things that work end-to-end: from training
                a model to deploying an API to shipping a dashboard that people
                can actually use.
              </p>
            </div>

            <div className="space-y-4">
              <div className="card text-center">
                <p className="text-3xl font-bold text-white">75%</p>
                <p className="text-sm text-zinc-500 mt-1">Pipeline speedup</p>
              </div>
              <div className="card text-center">
                <p className="text-3xl font-bold text-white">3+</p>
                <p className="text-sm text-zinc-500 mt-1">Cloud platforms</p>
              </div>
              <div className="card text-center">
                <p className="text-3xl font-bold text-white">10</p>
                <p className="text-sm text-zinc-500 mt-1">HF Spaces deployed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
