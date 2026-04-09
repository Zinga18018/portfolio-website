'use client'

import { useState } from 'react'
import { FiGithub, FiExternalLink, FiX, FiMaximize2 } from 'react-icons/fi'
import { useReveal } from '@/lib/useReveal'
import { projects } from '@/lib/data'
import type { Project } from '@/lib/data'

const categories = [
  { key: 'all', label: 'All' },
  { key: 'ai', label: 'AI & LLM' },
  { key: 'ml', label: 'ML & DL' },
  { key: 'mlops', label: 'MLOps' },
  { key: 'data', label: 'Data' },
] as const

const categoryColors: Record<string, string> = {
  ai: 'bg-accent/15 text-accent',
  ml: 'bg-purple-500/15 text-purple-400',
  mlops: 'bg-amber-500/15 text-amber-400',
  data: 'bg-sky-500/15 text-sky-400',
}

function ProjectCard({
  project,
  large,
  onPreview,
}: {
  project: Project
  large?: boolean
  onPreview?: (p: Project) => void
}) {
  return (
    <article className={`card group flex flex-col ${large ? 'md:p-8' : ''}`}>
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
            categoryColors[project.category]
          }`}
        >
          {project.category}
        </span>
        {project.demo && (
          <span className="flex items-center gap-1 text-[10px] text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent live-dot" />
            Live
          </span>
        )}
      </div>

      <h3
        className={`text-white font-semibold group-hover:text-accent transition-colors ${
          large ? 'text-xl mb-3' : 'text-lg mb-2'
        }`}
      >
        {project.title}
      </h3>

      <p className="text-sm text-zinc-400 leading-relaxed mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.stack.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-4 text-sm mt-auto">
        <a
          href={project.github}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
        >
          <FiGithub size={14} />
          Source
        </a>
        {project.demo && (
          <>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-accent hover:text-white transition-colors"
            >
              <FiExternalLink size={14} />
              Live demo
            </a>
            <button
              onClick={() => onPreview?.(project)}
              className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-accent transition-colors ml-auto"
            >
              <FiMaximize2 size={13} />
              <span className="hidden sm:inline">Preview</span>
            </button>
          </>
        )}
      </div>
    </article>
  )
}

function PreviewPane({ project, onClose }: { project: Project; onClose: () => void }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Glass pane */}
      <div className="relative w-full max-w-5xl h-[80vh] bg-zinc-900/80 border border-zinc-700/60 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl shadow-accent/5 animate-fade-up">
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/80 bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-accent text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent live-dot" />
              Live
            </span>
            <h3 className="text-white font-medium text-sm">{project.title}</h3>
            <span className="text-zinc-500 text-xs font-mono hidden sm:block">
              {project.demo}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener"
              className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <FiExternalLink size={12} />
              Open
            </a>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        {/* Iframe */}
        <div className="relative w-full h-[calc(100%-48px)]">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                <p className="text-zinc-500 text-sm">Loading {project.title}...</p>
              </div>
            </div>
          )}
          <iframe
            src={project.demo}
            title={`${project.title} preview`}
            className="w-full h-full border-0"
            onLoad={() => setLoaded(true)}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const ref = useReveal()
  const [filter, setFilter] = useState<string>('all')
  const [preview, setPreview] = useState<Project | null>(null)

  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  const filtered = filter === 'all' ? rest : rest.filter((p) => p.category === filter)

  return (
    <>
      <section id="projects" className="py-24">
        <div className="section-container">
          <div ref={ref} className="reveal">
            <p className="section-label">Projects</p>
            <h2 className="section-title">Featured work</h2>
            <p className="text-zinc-400 mb-10 max-w-xl">
              Production systems with live demos. Click <strong className="text-zinc-300">Preview</strong> to
              interact with any project right here.
            </p>

            {/* Featured projects -- large cards */}
            <div className="grid md:grid-cols-2 gap-5 mb-16">
              {featured.map((p, i) => (
                <ProjectCard key={i} project={p} large onPreview={setPreview} />
              ))}
            </div>

            {/* More projects header + filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h3 className="text-xl font-semibold text-white">More projects</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setFilter(c.key)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      filter === c.key
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of remaining projects */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p, i) => (
                <ProjectCard key={i} project={p} onPreview={setPreview} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Preview overlay */}
      {preview && <PreviewPane project={preview} onClose={() => setPreview(null)} />}
    </>
  )
}
