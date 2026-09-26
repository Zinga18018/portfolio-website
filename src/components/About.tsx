import { FiArrowUpRight } from 'react-icons/fi'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className="section about-section" aria-labelledby="about-heading">
      <div className="section-container">
        <div className={styles.intro}>
          <div><p className="eyebrow">About me</p><h2 id="about-heading">Computers came first.</h2></div>
          <div className="about-copy">
            <p>My father brought home the first computer I ever saw. That early curiosity eventually took me from computer applications to data science and, now, an M.S. at RIT.</p>
            <p>Research changed what I look for in a project. I want to know whether the comparison is fair, where a label came from, and whether a conclusion says more than the data allows. I am bringing that habit into statistical genetics while continuing my work in machine learning and public-data research.</p>
          </div>
        </div>
        <div className={styles.facts}>
          <article><span>Now</span><h3>M.S. Data Science at RIT</h3><p>Expected graduation: December 2026.</p></article>
          <article><span>Current study</span><h3>Genetic evidence for type 2 diabetes</h3><p>Learning how a GWAS region is narrowed to plausible variants and candidate genes.</p></article>
          <article><span>Recent research</span><h3>Public discourse and women’s safety</h3><p>Paper accepted at ASONAM 2026, with the findings presented in a separate research dashboard.</p></article>
        </div>
        <a className={styles.researchLink} href="/research/women-safety/">Open the research dashboard <FiArrowUpRight aria-hidden="true" /></a>
      </div>
    </section>
  )
}
