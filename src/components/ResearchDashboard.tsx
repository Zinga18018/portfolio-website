'use client'

import { useState } from 'react'
import styles from '@/app/research/women-safety/research.module.css'

type CaseFilter = 'all' | 'political' | 'nonpolitical'

const cases = [
  { name: 'Sandeshkhali 2024', n: 3720, cg: 48.55, political: true },
  { name: 'Hathras 2020', n: 14297, cg: 40.71, political: true },
  { name: 'Unnao 2017', n: 9113, cg: 37.08, political: true },
  { name: 'RG Kar 2024', n: 9981, cg: 36.27, political: true },
  { name: 'Manipur 2023', n: 15250, cg: 30.52, political: true },
  { name: 'Hyderabad Vet 2019', n: 5194, cg: 23.97, political: false },
  { name: 'Kathua 2018', n: 14082, cg: 23.51, political: true },
  { name: 'Bhavana Assault 2017', n: 1634, cg: 23.26, political: false },
  { name: 'Nirbhaya 2012', n: 35517, cg: 19.34, political: false },
  { name: 'Badaun 2014', n: 3424, cg: 17.61, political: false },
  { name: 'Badlapur 2024', n: 5937, cg: 16.91, political: false },
  { name: 'Shraddha Walkar 2022', n: 1064, cg: 16.35, political: false },
  { name: 'Jisha 2016', n: 1261, cg: 16.10, political: false },
  { name: 'Shakti Mills 2013', n: 2898, cg: 13.11, political: false },
  { name: 'Uber Delhi 2014', n: 2637, cg: 12.36, political: false },
  { name: 'Pollachi 2019', n: 4849, cg: 11.71, political: false },
]

const phases = [
  { name: 'General baseline', window: 'comparison corpus', cg: 13.859, cs: 57.042, nr: 28.599, sv: 0.500 },
  { name: 'Acute', window: '0–90 days', cg: 33.862, cs: 26.093, nr: 36.536, sv: 3.510 },
  { name: 'Sustained', window: '91–365 days', cg: 29.293, cs: 29.597, nr: 37.482, sv: 3.628 },
  { name: 'Retrospective', window: '366+ days', cg: 23.938, cs: 30.165, nr: 41.144, sv: 4.753 },
]

const modelMetrics = [
  { name: 'Accuracy', base: 68.00, adapted: 74.47 },
  { name: 'Macro-F1', base: 67.54, adapted: 74.50 },
  { name: 'MCC', base: 59.81, adapted: 66.34 },
]

const stanceLabels = [
  { key: 'cg', label: 'Critical of government' },
  { key: 'cs', label: 'Critical of society' },
  { key: 'nr', label: 'Neutral reporting' },
  { key: 'sv', label: 'Supportive of victim' },
] as const

function Axis({ maximum, label }: { maximum: number; label: string }) {
  return (
    <div className={styles.axis} aria-hidden="true">
      <div className={styles.ticks}>{[0, 1, 2, 3, 4, 5].map((tick) => <span key={tick}>{tick * maximum / 5}</span>)}</div>
      <div className={styles.axisLabel}>{label}</div>
    </div>
  )
}

export default function ResearchDashboard() {
  const [filter, setFilter] = useState<CaseFilter>('all')
  const filteredCases = cases.filter((item) => filter === 'all' || (filter === 'political' ? item.political : !item.political))

  return (
    <>
      <section className={styles.section} id="findings" aria-labelledby="case-heading">
        <h2 id="case-heading">Government criticism by case</h2>
        <p>Share of retained case comments classified as critical of government, sorted from highest to lowest.</p>
        <div className={styles.filters} role="group" aria-label="Filter cases">
          {(['all', 'political', 'nonpolitical'] as CaseFilter[]).map((key) => (
            <button key={key} type="button" aria-pressed={filter === key} aria-controls="case-chart case-data" onClick={() => setFilter(key)}>
              {key === 'all' ? 'All cases' : key === 'political' ? 'Political' : 'Non-political'}
            </button>
          ))}
          <span role="status">Showing {filteredCases.length} of 16 cases</span>
        </div>
        <figure className={styles.figure} aria-labelledby="case-heading" aria-describedby="case-caption">
          <div className={styles.legend} aria-label="Case groups">
            <span><i className={styles.political} />Political implication</span>
            <span><i className={styles.nonpolitical} />Non-political</span>
          </div>
          <div id="case-chart" className={styles.caseChart}>
            {filteredCases.map((item) => (
              <div className={styles.barRow} key={item.name}>
                <div className={styles.rowLabel}>{item.name}<small>{item.n.toLocaleString('en-US')} comments · {item.political ? 'Political' : 'Non-political'}</small></div>
                <div className={styles.track} aria-hidden="true"><i className={item.political ? styles.political : styles.nonpolitical} style={{ width: `${item.cg * 2}%` }} /></div>
                <span className={styles.value}>{item.cg.toFixed(2)}%</span>
              </div>
            ))}
          </div>
          <Axis maximum={50} label="Comments critical of government (%)" />
          <figcaption id="case-caption">The submitted paper reports a median of 36.67% for political cases and 16.65% for the non-political comparison (Mann–Whitney U = 59, p = 0.0005, r = 0.786; a large case-level effect). Filtering changes the displayed cases, not this reported comparison.</figcaption>
        </figure>
        <details className={styles.details} id="case-data">
          <summary>View case data</summary>
          <div className={styles.tableScroll} role="region" aria-label="Case data" tabIndex={0}>
            <table><caption>Values shown in the filtered chart</caption><thead><tr><th scope="col">Case</th><th scope="col">Group</th><th scope="col">Comments</th><th scope="col">Government criticism (%)</th></tr></thead><tbody>
              {filteredCases.map((item) => <tr key={item.name}><th scope="row">{item.name}</th><td>{item.political ? 'Political' : 'Non-political'}</td><td>{item.n.toLocaleString('en-US')}</td><td>{item.cg.toFixed(2)}</td></tr>)}
            </tbody></table>
          </div>
        </details>
      </section>

      <section className={styles.section} aria-labelledby="phase-heading">
        <h2 id="phase-heading">Stance across time windows</h2>
        <p>The baseline is a separate comparison corpus. The other rows group comments by time since the case.</p>
        <figure className={styles.figure} aria-labelledby="phase-heading" aria-describedby="phase-caption">
          <div className={styles.legend}>{stanceLabels.map((stance) => <span key={stance.key}><i className={styles[stance.key]} />{stance.label}</span>)}</div>
          <div className={styles.phaseChart}>
            {phases.map((phase) => (
              <div className={styles.barRow} key={phase.name}>
                <div className={styles.rowLabel}>{phase.name}<small>{phase.window}</small></div>
                <div className={styles.stacked} role="img" aria-label={`${phase.name}: ${stanceLabels.map((stance) => `${stance.label} ${phase[stance.key].toFixed(3)}%`).join(', ')}`}>
                  {stanceLabels.map((stance) => <i key={stance.key} className={styles[stance.key]} style={{ width: `${phase[stance.key]}%` }} title={`${stance.label}: ${phase[stance.key].toFixed(3)}%`} />)}
                </div>
              </div>
            ))}
          </div>
          <Axis maximum={100} label="Share of comments (%)" />
          <figcaption id="phase-caption">The retrospective row shows a lower government-criticism share than the acute row. The paired acute-to-retrospective test across 15 eligible cases did not find a statistically significant change (Wilcoxon W = 43, p = 0.359). Each eligible case had at least 20 rows in both windows.</figcaption>
        </figure>
        <details className={styles.details}>
          <summary>View time-window data</summary>
          <div className={styles.tableScroll} role="region" aria-label="Time-window data" tabIndex={0}>
            <table><caption>Stance shares (%); rounding may affect row totals</caption><thead><tr><th scope="col">Window</th>{stanceLabels.map((stance) => <th scope="col" key={stance.key}>{stance.label}</th>)}</tr></thead><tbody>
              {phases.map((phase) => <tr key={phase.name}><th scope="row">{phase.name}<small>{phase.window}</small></th>{stanceLabels.map((stance) => <td key={stance.key}>{phase[stance.key].toFixed(3)}</td>)}</tr>)}
            </tbody></table>
          </div>
        </details>
      </section>

      <section className={styles.section} aria-labelledby="response-heading">
        <h2 id="response-heading">Recorded institutional responses</h2>
        <p>This taxonomy describes the responses recorded in the paper. It does not show that online discussion caused legal or policy action.</p>
        <div className={styles.tableScroll} role="region" aria-label="Institutional responses" tabIndex={0}>
          <table><caption>Response categories across the 16 cases</caption><thead><tr><th scope="col">Response</th><th scope="col">Cases</th><th scope="col">Examples / coverage</th></tr></thead><tbody>
            <tr><th scope="row">Legislative</th><td>2</td><td>Nirbhaya 2012 · Kathua 2018</td></tr>
            <tr><th scope="row">Regulatory / state action</th><td>3</td><td>Uber Delhi 2014 · Hyderabad Vet 2019 · RG Kar 2024</td></tr>
            <tr><th scope="row">Executive / judicial only</th><td>11</td><td>Remaining cases in the paper taxonomy</td></tr>
          </tbody></table>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="model-heading">
        <h2 id="model-heading">Later model audit</h2>
        <p>These results use a fixed 3,000-row validation matrix from a post-submission local audit. They are separate from the submitted paper’s pilot results.</p>
        <figure className={styles.figure} aria-labelledby="model-heading" aria-describedby="model-caption">
          <div className={styles.legend}><span><i className={styles.base} />Base</span><span><i className={styles.adapted} />Adapted</span></div>
          <div className={styles.modelChart}>
            {modelMetrics.map((metric) => <div className={styles.modelGroup} key={metric.name}>
              <h3>{metric.name}</h3>
              {(['base', 'adapted'] as const).map((model) => <div className={styles.barRow} key={model}>
                <span className={styles.rowLabel}>{model === 'base' ? 'Base' : 'Adapted'}</span>
                <div className={styles.track} aria-hidden="true"><i className={styles[model]} style={{ width: `${metric[model]}%` }} /></div>
                <span className={styles.value}>{metric[model].toFixed(2)}</span>
              </div>)}
            </div>)}
          </div>
          <Axis maximum={100} label="Reported score (0–100 scale)" />
          <figcaption id="model-caption">The adapted Qwen model scored higher on all three measures. Its high-confidence error rate also rose, from 10.51% to 11.74%. Better classification did not mean better calibration in this audit.</figcaption>
        </figure>
        <details className={styles.details}>
          <summary>View model-audit data</summary>
          <div className={styles.tableScroll} role="region" aria-label="Model-audit data" tabIndex={0}>
            <table><caption>Reported scores from the later validation matrix</caption><thead><tr><th scope="col">Measure</th><th scope="col">Base</th><th scope="col">Adapted</th></tr></thead><tbody>
              {modelMetrics.map((metric) => <tr key={metric.name}><th scope="row">{metric.name}</th><td>{metric.base.toFixed(2)}</td><td>{metric.adapted.toFixed(2)}</td></tr>)}
              <tr><th scope="row">High-confidence error rate (%)</th><td>10.51</td><td>11.74</td></tr>
            </tbody></table>
          </div>
        </details>
      </section>

      <section className={`${styles.section} ${styles.notes}`} id="methods" aria-labelledby="methods-heading">
        <h2 id="methods-heading">Methods and limitations</h2>
        <p>Public Reddit and YouTube comments were collected, cleaned and classified into four stance labels, then compared by case and time window. The accepted manuscript reports 351,501 retained comments, 16 cases with event years from 2012–2024, and 92.8% annotator agreement.</p>
        <p>The corpus summary and case/time comparisons above retain the submitted-paper figures. The later model audit uses local reproducibility artifacts; it does not replace the submitted pilot.</p>
        <ul>
          <li>Platform participation is not representative of India as a whole.</li>
          <li>Observed discourse–response patterns are associations, not causal estimates.</li>
          <li>Only aggregate statistics are shown. Raw usernames, comment text and individual-level records are not published here.</li>
        </ul>
      </section>
    </>
  )
}
