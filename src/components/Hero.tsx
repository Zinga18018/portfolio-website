import { FiGithub, FiLinkedin, FiArrowDown } from 'react-icons/fi'
import { socialLinks } from '@/lib/data'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 hero-gradient">
      <div className="section-container">
        <div className="max-w-3xl">
          <p className="text-sm font-mono text-accent mb-5 tracking-wide">
            M.S. Data Science @ Rochester Institute of Technology
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
            Hi, I'm Yogesh
            <br />
            <span className="gradient-text">Kuchimanchi</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-10 max-w-2xl">
            I build production ML systems that run real transformer inference.
            From RAG pipelines and multi-agent orchestration to drift detection
            dashboards -- every project ships with a live demo.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a href="#projects" className="btn-primary">
              View projects
              <FiArrowDown size={16} />
            </a>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener"
              className="btn-outline"
            >
              <FiGithub size={16} />
              GitHub
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener"
              className="btn-outline"
            >
              <FiLinkedin size={16} />
              LinkedIn
            </a>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm">
            <div>
              <span className="text-2xl font-bold text-white">15+</span>
              <p className="text-zinc-500 mt-1">ML projects</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-white">11</span>
              <p className="text-zinc-500 mt-1">Live demos</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-white">50+</span>
              <p className="text-zinc-500 mt-1">Technologies</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
