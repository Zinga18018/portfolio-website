'use client'

import { useState } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import styles from './About.module.css'

const chapters = [
  {
    title: 'What am I actually comparing?',
    body: 'Choosing parts means making trade-offs. A bigger number on a spec sheet only tells you so much; the workload and the rest of the build matter too. That is a question I now bring to models: did the comparison give each one a fair test?',
    project: 'Clinical Readmission Risk Modeling',
    connection: 'Patient-disjoint splits and calibration, so a good score has something behind it.',
    href: '#project-01',
  },
  {
    title: 'Which information is useful?',
    body: 'Collecting parts also means collecting information: specs, reviews, recommendations. Making sense of all that is part of what drew me to data. With text, the same problem gets much bigger.',
    project: 'NewsSnap',
    connection: 'A transformer-based news classifier, with a working interface to explore its predictions.',
    href: '#project-02',
  },
  {
    title: 'Does the answer change over time?',
    body: 'A PC build is a choice made at a particular moment. Workloads change, and what was enough before may not be enough later. I’m interested in that with models too: what happens when the data they meet changes?',
    project: 'DriftLab',
    connection: 'A simulator for watching model performance change as the input distribution shifts.',
    href: '#project-03',
  },
  {
    title: 'And when the data is about people?',
    body: 'At RIT, my research takes that interest in change into a very different setting: public conversations about women’s safety in India. The question is how those conversations change after an incident, and what remains months or years later.',
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
          <div><p className="eyebrow">A little about me</p><h2 id="about-heading">It started with collecting parts.</h2></div>
          <div className="about-copy">
            <p>I like building PCs. Somewhere between collecting parts and comparing them, I started enjoying the comparisons as much as the build itself. Why this component? What am I getting for the difference in price? Will it make a difference for what I want to do?</p>
            <p>That is how I got interested in data. I’m now studying data science at Rochester Institute of Technology, and those questions have followed me into my projects.</p>
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
          <div><p className="eyebrow">One question, at different moments</p><h3>Time is part of the data.</h3><p>These are the three time windows in our women’s safety research. Choose a window to see the question it helps us ask.</p></div>
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
          <p>Research gives me room to investigate a question properly. Engineering lets me turn what I learn into something someone can use. As I finish my master’s, I’m looking for a data science role where I can keep asking questions and building things.</p>
          <div className={styles.paths}><a href="/research/women-safety/">Follow the research <FiArrowUpRight aria-hidden="true" /></a><a href="#projects">Explore the builds <FiArrowUpRight aria-hidden="true" /></a></div>
        </div>
      </div>
    </section>
  )
}
