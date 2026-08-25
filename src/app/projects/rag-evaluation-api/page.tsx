import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../dashboard.module.css'

export const metadata: Metadata = {
  title: 'Source-Grounded RAG Evaluation API | Yogesh Kuchimanchi',
  description: 'Endpoint, retrieval-pipeline, and seeded evaluation dashboard for a cited-answer FastAPI system.',
}

const endpoints = [
  ['/search', 'Return ranked source passages for a query.', 'RETRIEVAL'],
  ['/answer', 'Return an answer with supporting source citations.', 'GENERATION'],
  ['/metrics', 'Expose the saved local evaluation summary.', 'EVALUATION'],
  ['/health', 'Report service readiness and configuration mode.', 'OPERATIONS'],
] as const

const evaluation = [
  { label: 'Retrieval@1', value: '95%', width: 95 },
  { label: 'Retrieval@3', value: '100%', width: 100 },
  { label: 'Citation coverage', value: '100%', width: 100 },
] as const

export default function RagEvaluationPage() {
  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <Link className={styles.brand} href="/">YK // VERCEL DATA LAB</Link>
        <nav aria-label="RAG dashboard navigation"><a href="#endpoints">Endpoints</a><a href="#pipeline">Pipeline</a><a href="#evaluation">Evaluation</a></nav>
        <Link className={styles.back} href="/#rag">Back to portfolio ↗</Link>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>ML ENGINEERING · PROJECT 03</p>
          <h1>Source-Grounded RAG API</h1>
          <p className={styles.lede}>A FastAPI retrieval system that separates search, cited answers, metrics, and health checks. The page documents a seeded local benchmark, not live production traffic.</p>
          <div className={styles.actions}>
            <a href="https://github.com/Zinga18018/rag-evaluation-deployment-api" target="_blank" rel="noreferrer">Source repository ↗</a>
            <a href="https://github.com/Zinga18018/rag-evaluation-deployment-api/blob/main/outputs/evaluation_metrics.json" target="_blank" rel="noreferrer">Evaluation file ↗</a>
          </div>
        </div>
        <aside className={styles.heroCard}><span>SEEDED LOCAL BENCHMARK</span><strong>95%</strong><b>RETRIEVAL@1</b><p>20 evaluation queries over a 32-document source collection.</p></aside>
      </section>

      <section className={styles.metricStrip} aria-label="RAG evaluation summary">
        <article><strong>95%</strong><span>Retrieval@1</span></article>
        <article><strong>100%</strong><span>Retrieval@3</span></article>
        <article><strong>100%</strong><span>Citation coverage</span></article>
        <article><strong>20</strong><span>Evaluation queries</span></article>
      </section>

      <section className={styles.section} id="endpoints">
        <div className={styles.sectionHeading}><div><p className={styles.kicker}>API SURFACE</p><h2>Four endpoints</h2></div><p>The public portfolio documents the interface and links to source. It does not pretend these calls are live on this page.</p></div>
        <div className={styles.endpointTable}>{endpoints.map(([endpoint, copy, label]) => <div key={endpoint}><code>{endpoint}</code><p>{copy}</p><span>{label}</span></div>)}</div>
      </section>

      <section className={styles.section} id="pipeline">
        <div className={styles.sectionHeading}><div><p className={styles.kicker}>RETRIEVAL ARCHITECTURE</p><h2>Query to citation</h2></div><p>Each stage has one job: retrieve evidence, rank it, compose an answer, and keep the source reference attached.</p></div>
        <div className={styles.pipeline}>
          <article><span>01</span><h3>Query</h3><p>Accept a user question through the search or answer route.</p></article>
          <article><span>02</span><h3>Retrieve</h3><p>Use TF-IDF similarity to rank passages from the 32-document collection.</p></article>
          <article><span>03</span><h3>Compose</h3><p>Build a source-grounded response from the retrieved context.</p></article>
          <article><span>04</span><h3>Cite</h3><p>Return source identifiers with the answer for inspection.</p></article>
        </div>
      </section>

      <section className={styles.section} id="evaluation">
        <div className={styles.sectionHeading}><div><p className={styles.kicker}>REPOSITORY EVIDENCE</p><h2>Seeded evaluation</h2></div><p>The saved result contains retrieval, citation, and latency measurements for the local benchmark.</p></div>
        <div className={styles.evidenceGrid}>
          <div className={styles.capture}><Image src="/project-visuals/rag-evaluation.png" alt="Verified RAG evaluation dashboard showing retrieval, citation, and latency metrics" fill sizes="(max-width: 900px) 100vw, 68vw" priority /></div>
          <article className={styles.panel}>
            <div className={styles.panelHead}><div><span>EVALUATION RESULTS</span><h3>Retrieval and citation</h3></div><b>20 QUERIES</b></div>
            <div className={styles.metricBars}>{evaluation.map((metric) => <div className={styles.barRow} key={metric.label}><span>{metric.label}</span><div className={styles.barTrack}><i style={{ width: `${metric.width}%` }} /></div><b>{metric.value}</b></div>)}</div>
            <div className={styles.calibrationReadout}>
              <div><span>AVERAGE LATENCY</span><strong>0.13 ms</strong><small>Saved local benchmark</small></div>
              <div><span>P95 LATENCY</span><strong>0.16 ms</strong><small>Saved local benchmark</small></div>
            </div>
            <p className={styles.barNote}>Latency values describe this seeded local retrieval benchmark and are not production-service claims.</p>
          </article>
        </div>
        <div className={styles.footnote}><span>32 DOCUMENTS · 20 QUESTIONS</span><span>FASTAPI · PYTEST · DOCKER</span></div>
      </section>
    </main>
  )
}
