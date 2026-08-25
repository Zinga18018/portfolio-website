import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../dashboard.module.css'

export const metadata: Metadata = {
  title: 'Clinical Readmission Risk Audit | Yogesh Kuchimanchi',
  description: 'Held-out metrics, calibration, and evaluation design for a patient-disjoint 30-day readmission model.',
}

const metrics = [
  { label: 'ROC-AUC', value: '0.6612', width: 66.12 },
  { label: 'PR-AUC', value: '0.1747', width: 17.47 },
]

const confusion = [
  ['TRUE NEGATIVE', '8,281'],
  ['FALSE POSITIVE', '1,592'],
  ['FALSE NEGATIVE', '637'],
  ['TRUE POSITIVE', '312'],
] as const

export default function ReadmissionRiskAuditPage() {
  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <Link className={styles.brand} href="/">YK // VERCEL DATA LAB</Link>
        <nav aria-label="Readmission dashboard navigation"><a href="#evidence">Evidence</a><a href="#evaluation">Evaluation</a></nav>
        <Link className={styles.back} href="/#readmission">Back to portfolio ↗</Link>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>HEALTHCARE ML · PROJECT 02</p>
          <h1>Clinical Readmission Risk Audit</h1>
          <p className={styles.lede}>Held-out evaluation for 30-day readmission risk using a patient-disjoint split, probability calibration, and a documented decision threshold.</p>
          <div className={styles.actions}>
            <a href="https://github.com/Zinga18018/readmission-risk-audit" target="_blank" rel="noreferrer">Source repository ↗</a>
            <a href="https://github.com/Zinga18018/readmission-risk-audit/blob/main/outputs/metrics.json" target="_blank" rel="noreferrer">Metric file ↗</a>
          </div>
        </div>
        <aside className={styles.heroCard}><span>HELD-OUT TEST</span><strong>10,822</strong><b>ENCOUNTERS</b><p>CatBoost tuned ensemble with temperature-scaled probabilities.</p></aside>
      </section>

      <section className={styles.metricStrip} aria-label="Held-out metric summary">
        <article><strong>0.6612</strong><span>ROC-AUC</span></article>
        <article><strong>0.1747</strong><span>PR-AUC</span></article>
        <article><strong>0.0773</strong><span>Brier score</span></article>
        <article><strong>0.0088</strong><span>ECE · 10 bins</span></article>
      </section>

      <section className={styles.section} id="evidence">
        <div className={styles.sectionHeading}><div><p className={styles.kicker}>REPOSITORY EVIDENCE</p><h2>Held-out results</h2></div><p>The dashboard reproduces values saved in the project evidence. No counters are animated and no live patient data is shown.</p></div>
        <div className={styles.evidenceGrid}>
          <div className={styles.capture}><Image src="/project-visuals/readmission-audit.png" alt="Verified readmission model audit image showing held-out metrics and confusion matrix" fill sizes="(max-width: 900px) 100vw, 68vw" priority /></div>
          <article className={styles.panel}>
            <div className={styles.panelHead}><div><span>DISCRIMINATION</span><h3>Ranking performance</h3></div><b>HELD-OUT</b></div>
            <div className={styles.metricBars}>{metrics.map((metric) => <div className={styles.barRow} key={metric.label}><span>{metric.label}</span><div className={styles.barTrack}><i style={{ width: `${metric.width}%` }} /></div><b>{metric.value}</b></div>)}</div>
            <p className={styles.barNote}>The two bars share a 0–1 axis. Calibration measures are kept separate because lower values are preferable for Brier score and ECE.</p>
          </article>
        </div>

        <div className={styles.twoColumn}>
          <article className={styles.panel}>
            <div className={styles.panelHead}><div><span>CONFUSION MATRIX</span><h3>Threshold 0.112</h3></div><b>10,822 TOTAL</b></div>
            <div className={styles.matrix}>{confusion.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
          </article>
          <article className={styles.panel}>
            <div className={styles.panelHead}><div><span>CALIBRATION</span><h3>Probability quality</h3></div><b>TEMPERATURE-SCALED</b></div>
            <div className={styles.calibrationReadout}>
              <div><span>BRIER SCORE</span><strong>0.0773</strong><small>Lower is better</small></div>
              <div><span>ECE · 10 BINS</span><strong>0.0088</strong><small>Held-out calibration error</small></div>
            </div>
            <p className={styles.barNote}>Calibration is reported beside discrimination so a ranking metric is not presented as the full evaluation.</p>
          </article>
        </div>
      </section>

      <section className={styles.section} id="evaluation">
        <div className={styles.sectionHeading}><div><p className={styles.kicker}>EVALUATION DESIGN</p><h2>Audit structure</h2></div><p>The public page documents the split and evaluation choices. The repository contains the implementation and saved metric output.</p></div>
        <div className={styles.methodGrid}>
          <article><span>01</span><h3>Patient-disjoint split</h3><p>Training and held-out cohorts have zero patient overlap.</p></article>
          <article><span>02</span><h3>Probability calibration</h3><p>Temperature scaling is evaluated with Brier score and 10-bin expected calibration error.</p></article>
          <article><span>03</span><h3>Decision audit</h3><p>The confusion matrix records results at the saved 0.112 operating threshold.</p></article>
        </div>
        <div className={styles.footnote}><span>STATIC REPOSITORY EVIDENCE</span><span>NO PATIENT-LEVEL DATA DISPLAYED</span></div>
      </section>
    </main>
  )
}
