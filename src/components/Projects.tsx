'use client'

import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import { projects } from '@/lib/data'
import { useReveal } from '@/lib/useReveal'

export default function Projects() {
  const ref = useReveal()
  return (
    <section id="projects" className="section projects-section">
      <div className="section-container">
        <div ref={ref} className="reveal section-intro">
          <p className="eyebrow">Featured projects</p>
          <h2>Selected projects.</h2>
          <p>Six selected projects: a recorded desktop-tool demo and five data or research projects with documented results and limits.</p>
          <a className="repo-jump" href="#github-projects">Browse the repository archive <FiArrowUpRight /></a>
        </div>
        <div className="project-ledger">
          {projects.map((project) => (
            <article key={project.number} id={`project-${project.number}`} className="project-row">
              <span className="project-number">{project.number}</span>
              <div className="project-main">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <strong>{project.outcome}</strong>
                {project.videoSrc && (
                  <figure className="project-video">
                    <video controls playsInline preload="metadata" poster={project.videoPoster} aria-label={`${project.title} edited trailer`}>
                      <source src={project.videoSrc} type="video/mp4" />
                      Your browser does not support embedded video.
                    </video>
                    <figcaption>Edited trailer from one recorded Notepad run. The continuous demo is linked alongside.</figcaption>
                  </figure>
                )}
                <div className="tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
              <div className="project-links">
                <a href={project.demo} target="_blank" rel="noreferrer">{project.demoLabel ?? 'Live demo'} <FiArrowUpRight /></a>
                {project.github && <a href={project.github} target="_blank" rel="noreferrer"><FiGithub /> Source</a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
