'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  caseMetrics,
  headlineMetrics,
  phaseLabels,
  stanceLabels,
  stanceTotals,
  yearlyVolume,
  type PhaseKey,
  type StanceKey,
} from './womens-safety-narratives-data';
import styles from './womens-safety-narratives.module.css';

const number = new Intl.NumberFormat('en-US');
const maxYearVolume = Math.max(...yearlyVolume.map((item) => item.value));
const maxCaseVolume = Math.max(...caseMetrics.map((item) => item.rows));
const totalStanceRows = stanceTotals.reduce((sum, item) => sum + item.value, 0);

export default function WomensSafetyNarrativesDashboard() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = caseMetrics[selectedIndex];
  const redditShare = (headlineMetrics.redditRows / headlineMetrics.publicRows) * 100;

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <Link className={styles.brand} href="/">YK // VERCEL DATA LAB</Link>
        <nav aria-label="Women’s Safety Narratives navigation">
          <a href="#overview">Overview</a>
          <a href="#cases">Cases</a>
          <a href="#method">Method</a>
        </nav>
        <Link className={styles.back} href="/#fieldwork">Back to projects ↗</Link>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>NLP RESEARCH · PROJECT 02</p>
          <h1>Women&apos;s Safety Narratives</h1>
          <p className={styles.lede}>
            Public discourse patterns across 16 women-safety cases in India.
            The dashboard summarizes Reddit and YouTube data by stance, case, platform, and time.
          </p>
          <div className={styles.actions}>
            <a href="https://github.com/Zinga18018/womens-safety-discourse-dashboard" target="_blank" rel="noreferrer">GitHub repository ↗</a>
            <a href="https://github.com/Zinga18018/womens-safety-discourse-dashboard/blob/main/EVIDENCE.md" target="_blank" rel="noreferrer">Metric sources ↗</a>
          </div>
        </div>
        <aside className={styles.paperCard}>
          <span>RESEARCH STATUS</span>
          <strong>Accepted Paper</strong>
          <b>ASONAM 2026</b>
          <p>Aggregate dashboard built from the research export.</p>
        </aside>
      </section>

      <section className={styles.metrics} aria-label="Dataset summary">
        <article><strong>{number.format(headlineMetrics.publicRows)}</strong><span>public comments</span></article>
        <article><strong>{number.format(headlineMetrics.caseRows)}</strong><span>case-linked comments</span></article>
        <article><strong>{headlineMetrics.caseCount}</strong><span>canonical cases</span></article>
        <article><strong>2012–2024</strong><span>case years</span></article>
      </section>

      <section className={styles.section} id="overview">
        <div className={styles.sectionHeading}>
          <div><p className={styles.kicker}>DATASET OVERVIEW</p><h2>Public conversation at scale.</h2></div>
          <p>The charts use the verified aggregate summary from the project repository.</p>
        </div>

        <div className={styles.overviewGrid}>
          <article className={`${styles.panel} ${styles.yearPanel}`}>
            <div className={styles.panelHead}><div><span>YEARLY VOLUME</span><h3>Comments collected since 2012</h3></div><b>351.5K total</b></div>
            <div className={styles.yearChart} aria-label="Yearly public comment volume from 2012 to 2026">
              {yearlyVolume.map((item) => (
                <div className={styles.yearColumn} key={item.year} title={`${item.year}: ${number.format(item.value)} comments`}>
                  <span>{number.format(item.value)}</span>
                  <div><i style={{ height: `${Math.max((item.value / maxYearVolume) * 100, 2)}%` }} /></div>
                  <b>{item.year.slice(2)}</b>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.panel}>
            <div className={styles.panelHead}><div><span>PLATFORMS</span><h3>Reddit and YouTube</h3></div></div>
            <div className={styles.platformDonut} style={{ background: `conic-gradient(#2db7a3 0 ${redditShare}%, #f1b94e ${redditShare}% 100%)` }}>
              <div><strong>2</strong><span>sources</span></div>
            </div>
            <dl className={styles.platformLegend}>
              <div><dt><i className={styles.tealDot} />Reddit</dt><dd>{number.format(headlineMetrics.redditRows)}</dd></div>
              <div><dt><i className={styles.amberDot} />YouTube</dt><dd>{number.format(headlineMetrics.youtubeRows)}</dd></div>
            </dl>
          </article>
        </div>

        <article className={styles.panel}>
          <div className={styles.panelHead}><div><span>OVERALL STANCE MIX</span><h3>How the full public dataset was grouped</h3></div></div>
          <div className={styles.overallStance}>
            {stanceTotals.map((item) => {
              const percent = (item.value / totalStanceRows) * 100;
              return (
                <div className={styles.overallRow} key={item.key}>
                  <span>{item.label}</span>
                  <div><i className={styles[item.color]} style={{ width: `${Math.max(percent, 1.5)}%` }} /></div>
                  <strong>{percent.toFixed(1)}%</strong>
                  <b>{number.format(item.value)}</b>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <section className={`${styles.section} ${styles.caseSection}`} id="cases">
        <div className={styles.sectionHeading}>
          <div><p className={styles.kicker}>CASE EXPLORER</p><h2>Compare one case at a time.</h2></div>
          <label className={styles.selector}>Case
            <select value={selectedIndex} onChange={(event) => setSelectedIndex(Number(event.target.value))}>
              {caseMetrics.map((item, index) => <option value={index} key={`${item.name}-${item.year}`}>{item.name} · {item.year}</option>)}
            </select>
          </label>
        </div>

        <div className={styles.caseMetrics} aria-live="polite">
          <article><strong>{number.format(selected.rows)}</strong><span>case-linked comments</span></article>
          <article><strong>{selected.share.toFixed(2)}%</strong><span>of canonical case rows</span></article>
          <article><strong>{selected.gap.toFixed(2)}</strong><span>stance-gap points</span></article>
          <article><strong>{selected.peak}</strong><span>peak month · {number.format(selected.peakCount)} comments</span></article>
        </div>

        <div className={styles.caseCharts}>
          <article className={styles.panel}>
            <div className={styles.panelHead}><div><span>STANCE MIX</span><h3>{selected.name}</h3></div><b>{stanceLabels[selected.dominant]}</b></div>
            <div className={styles.stack} aria-label={`${selected.name} stance percentages`}>
              {(Object.keys(selected.stance) as StanceKey[]).map((key) => <i className={styles[key]} style={{ width: `${selected.stance[key]}%` }} key={key} />)}
            </div>
            <dl className={styles.stackLegend}>
              {(Object.keys(selected.stance) as StanceKey[]).map((key) => <div key={key}><dt>{stanceLabels[key]}</dt><dd>{selected.stance[key].toFixed(2)}%</dd></div>)}
            </dl>
          </article>

          <article className={styles.panel}>
            <div className={styles.panelHead}><div><span>TEMPORAL PHASE</span><h3>Conversation timing</h3></div></div>
            <div className={styles.phaseRows}>
              {(Object.keys(selected.phase) as PhaseKey[]).map((key) => (
                <div key={key}><span>{phaseLabels[key]}</span><div><i style={{ width: `${Math.max(selected.phase[key], 1)}%` }} /></div><b>{selected.phase[key].toFixed(1)}%</b></div>
              ))}
            </div>
          </article>
        </div>

        <article className={styles.panel}>
          <div className={styles.panelHead}><div><span>CASE VOLUME</span><h3>All 16 canonical cases</h3></div><b>{number.format(headlineMetrics.caseRows)} comments</b></div>
          <div className={styles.caseVolume}>
            {caseMetrics.map((item, index) => (
              <button type="button" className={item === selected ? styles.activeCase : ''} key={`${item.name}-${item.year}`} onClick={() => setSelectedIndex(index)}>
                <span>{item.name} <small>{item.year}</small></span>
                <div><i style={{ width: `${Math.max((item.rows / maxCaseVolume) * 100, 1.5)}%` }} /></div>
                <b>{number.format(item.rows)}</b>
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className={styles.method} id="method">
        <div><p className={styles.kicker}>METHOD</p><h2>Aggregate research dashboard.</h2></div>
        <div className={styles.methodGrid}>
          <article><span>01</span><h3>Source</h3><p>Public Reddit and YouTube records tied to women-safety discourse.</p></article>
          <article><span>02</span><h3>Summary</h3><p>Python produced the checked aggregate JSON used for these charts.</p></article>
          <article><span>03</span><h3>Public view</h3><p>The page contains counts and percentages. Raw post text stays outside the dashboard.</p></article>
        </div>
        <footer><span>Generated from the verified summary · 21 June 2026</span><span>Accepted Paper · ASONAM 2026</span></footer>
      </section>
    </main>
  );
}
