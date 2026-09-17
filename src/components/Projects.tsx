'use client'

import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import PcWorkbench from './PcWorkbench'
import ProjectDashboards from './ProjectDashboards'
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
          <p>Source code, evaluation results, and demos for four projects.</p>
          <a className="repo-jump" href="#github-projects">Explore all GitHub projects <FiArrowUpRight /></a>
        </div>
        <ProjectDashboards />
        <PcWorkbench />
        <div className="project-ledger">
          {projects.map((project) => (
            <article key={project.number} id={`project-${project.number}`} className="project-row">
              <span className="project-number">{project.number}</span>
              <div className="project-main">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <strong>{project.outcome}</strong>
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
