'use client'

import { useReveal } from '@/lib/useReveal'

export default function About() {
  const ref = useReveal()
  return (
    <section id="about" className="section about-section">
      <div className="section-container">
        <div ref={ref} className="reveal about-grid">
          <div><p className="eyebrow">About</p><h2>Research discipline, builder mindset.</h2></div>
          <div className="about-copy">
            <p>I’m a graduate data science student at Rochester Institute of Technology. My work sits between analysis and engineering: clean the data, build a defensible evaluation, ship an interface, and state the limitations plainly.</p>
            <p>I have worked with clinical tabular data, transformer-based NLP, statistical testing, and model monitoring. The common thread is reproducibility—not a long list of buzzwords.</p>
          </div>
          <dl className="proof-strip">
            <div><dt>351,501</dt><dd>research records analyzed</dd></div>
            <div><dt>3,000</dt><dd>held-out NLP examples</dd></div>
            <div><dt>ASONAM 2026</dt><dd>accepted paper</dd></div>
          </dl>
        </div>
      </div>
    </section>
  )
}
