'use client'

import { useState } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import styles from './About.module.css'

const chapters = [
  {
    title: 'Compare like with like.',
    body: 'A benchmark needs context. In my readmission project, I keep patients separate across splits and check how well predicted risks match outcomes.',
    project: 'Clinical Readmission Risk Modeling',
    connection: 'Patient-disjoint splits and calibration, so a good score has something behind it.',
    href: '#project-01',
  },
  {
    title: 'Make the information usable.',
    body: 'NewsSnap turns a news classifier into an application where someone can inspect predictions. The training pipeline, API, and interface are all part of the project.',
    project: 'NewsSnap',
    connection: 'A transformer-based news classifier, with a working interface to explore its predictions.',
    href: '#project-02',
  },
  {
    title: 'Check again later.',
    body: 'A model’s inputs can change after training. DriftLab lets me explore what happens to performance and monitoring alerts when they do.',
    project: 'DriftLab',
    connection: 'A simulator for watching model performance change as the input distribution shifts.',
    href: '#project-03',
  },
  {
    title: 'Follow a conversation.',
    body: 'My capstone looks at how discussions about women’s safety change after an incident and what people return to months or years later.',
    project: 'Women’s Safety Discourse Research',
    connection: 'A paper accepted at ASONAM 2026, with an interactive dashboard of the findings.',
    href: '/research/women-safety/',
  },
]

const phases = [
  { label: 'The first response', range: '0–90 days', name: 'Acute', question: 'What does the conversation focus on immediately after an incident?' },
  { label: 'Months later', range: '91–365 days', name: 'Sustained', question: 'As the initial attention passes, how does the balance of the conversation change?' },
  { label: 'Looking back', range: '366+ days', name: 'Retrospective', question: 'When people return to the case later, what do they remember and discuss?' },
]

export default function About() {
  const [phase, setPhase] = useState(0)
  return (
    <section id="about" className="section about-section" aria-labelledby="about-heading">
      <div className="section-container">
        <div className={styles.intro}>
          <div><p className="eyebrow">A little about me</p><h2 id="about-heading">It started with PC parts.</h2></div>
          <div className="about-copy">
            <p>I like building PCs. Collecting parts meant comparing specs, prices, and performance. Somewhere along the way, I got as interested in those comparisons as I was in the build.</p>
            <p>That interest brought me to data science. At RIT, I’ve worked on readmission models, news classification, and research on women’s safety in India. The subject changes, but I still want to understand what the numbers say and what I can build with them.</p>
          </div>
        </div>
        <ol className={styles.chapters} aria-label="From PC building to my projects">
          {chapters.map((chapter, index) => (
            <li className={styles.chapter} key={chapter.title}>
              <span className={styles.marker} aria-hidden="true">0{index + 1}</span>
              <div className={styles.story}><h3>{chapter.title}</h3><p>{chapter.body}</p></div>
              <aside className={styles.connection}><span>In my work</span><a href={chapter.href}>{chapter.project} <FiArrowUpRight aria-hidden="true" /></a><p>{chapter.connection}</p></aside>
            </li>
          ))}
        </ol>
        <div className={styles.time}>
          <div><p className="eyebrow">One question, at different moments</p><h3>How discourse changes over time.</h3><p>These windows are measured from the incident, not a verdict. Choose one to explore the research question.</p></div>
          <div>
            <div className={styles.phaseButtons} role="group" aria-label="Research time window">
              {phases.map((item, index) => <button type="button" key={item.name} aria-pressed={phase === index} onClick={() => setPhase(index)}><span>{item.range}</span>{item.label}</button>)}
            </div>
            <div className={styles.phaseDetail} aria-live="polite"><span>{phases[phase].name} phase</span><p>{phases[phase].question}</p><a href="/research/women-safety/#findings">Explore the findings <FiArrowUpRight aria-hidden="true" /></a></div>
          </div>
        </div>
        <div className={styles.crossroads}>
          <p className="eyebrow">The crossroads</p>
          <h3>I want to keep doing both.</h3>
          <p>I like investigating a question and building something from the answer. As I finish my master’s, I’m looking for work that gives me room to do both.</p>
          <div className={styles.paths}><a href="/research/women-safety/">Follow the research <FiArrowUpRight aria-hidden="true" /></a><a href="#projects">Explore the builds <FiArrowUpRight aria-hidden="true" /></a></div>
        </div>
      </div>
    </section>
  )
}
