'use client'

import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import PcWorkbench from './PcWorkbench'
import { projects } from '@/lib/data'
import { useReveal } from '@/lib/useReveal'

export default function Projects() {
  const ref = useReveal()
  return (
    <section id="projects" className="section projects-section">
      <div className="section-container">
        <div ref={ref} className="reveal section-intro">
          <p className="eyebrow">Selected projects</p>
          <h2>Three systems. Three different failure modes.</h2>
          <p>Build the machine first, then open the working demos. Every result shown below comes from a saved project artifact or test run.</p>
        </div>
        <PcWorkbench />
        <div className="project-ledger">
          {projects.map((project) => (
            <article key={project.number} className="project-row">
              <span className="project-number">{project.number}</span>
              <div className="project-main">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <strong>{project.outcome}</strong>
                <div className="tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
              <div className="project-links">
                <a href={project.demo} target="_blank" rel="noreferrer">Live demo <FiArrowUpRight /></a>
                <a href={project.github} target="_blank" rel="noreferrer"><FiGithub /> Source</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
