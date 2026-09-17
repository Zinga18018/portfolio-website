'use client'

import { useMemo, useState } from 'react'

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

export default function ResearchDashboard() {
  const [filter, setFilter] = useState<CaseFilter>('all')
  const filteredCases = useMemo(() => cases.filter((item) => filter === 'all' || (filter === 'political' ? item.political : !item.political)), [filter])

  return (
    <>
      <section className="paper-method-strip" id="methods">
        {[
          ['01', 'Collect', 'Reddit + YouTube'],
          ['02', 'Clean', '351,501 retained'],
          ['03', 'Classify', 'Four stance labels'],
          ['04', 'Compare', 'Cases + time windows'],
          ['05', 'Audit', 'Tests + limitations'],
        ].map(([number, title, detail]) => <article key={number}><span>{number}</span><b>{title}</b><small>{detail}</small></article>)}
      </section>

      <section className="paper-section" id="findings">
        <div className="paper-section-head">
          <div><p className="paper-kicker">RQ1 · Triggering incidents</p><h2>Government criticism by case.</h2></div>
          <aside><strong>36.67%</strong><span>median government criticism in political cases</span><small>vs 16.65% in the submitted-paper non-political comparison</small></aside>
        </div>
        <div className="result-ribbon"><b>Mann–Whitney U = 59</b><span>p = 0.0005</span><span>r = 0.786</span><em>Large case-level effect</em></div>
        <div className="case-explorer">
          <div className="case-toolbar">
            <div><h3>Critical-of-government share by case</h3><p>Sorted by share of retained case comments.</p></div>
            <div className="filter-group" aria-label="Filter cases">
              {(['all', 'political', 'nonpolitical'] as CaseFilter[]).map((key) => <button key={key} type="button" className={filter === key ? 'active' : ''} onClick={() => setFilter(key)}>{key === 'all' ? 'All cases' : key === 'political' ? 'Political' : 'Non-political'}</button>)}
            </div>
          </div>
          <div className="case-chart">
            {filteredCases.map((item) => (
              <div className="case-bar" key={item.name}>
                <div className="case-label"><b>{item.name}</b><small>{item.n.toLocaleString()} comments</small></div>
                <div className="case-track"><i className={item.political ? 'political' : ''} style={{ width: `${item.cg * 2}%` }} /></div>
                <strong>{item.cg.toFixed(2)}%</strong>
              </div>
            ))}
          </div>
          <div className="case-legend"><span><i className="political" /> Political implication</span><span><i /> Non-political</span></div>
        </div>
      </section>

      <section className="paper-section temporal-section">
        <div className="paper-section-head simple">
          <div><p className="paper-kicker">RQ2 · Evolving narratives</p><h2>Stance across time windows.</h2><p>Among 15 eligible cases with at least 20 rows in both windows, the acute-to-retrospective change was not statistically uniform.</p></div>
          <aside><strong>W = 43</strong><span>Wilcoxon signed-rank</span><small>p = 0.359 · n = 15</small></aside>
        </div>
        <div className="stance-legend"><span><i className="cg" /> Critical of government</span><span><i className="cs" /> Critical of society</span><span><i className="nr" /> Neutral reporting</span><span><i className="sv" /> Supportive of victim</span></div>
        <div className="phase-chart">
          {phases.map((phase) => (
            <article key={phase.name}>
              <div><h3>{phase.name}</h3><small>{phase.window}</small></div>
              <div className="stacked-bar" aria-label={`${phase.name} stance distribution`}>
                <i className="cg" style={{ width: `${phase.cg}%` }} title={`Critical of government ${phase.cg.toFixed(1)}%`} />
                <i className="cs" style={{ width: `${phase.cs}%` }} title={`Critical of society ${phase.cs.toFixed(1)}%`} />
                <i className="nr" style={{ width: `${phase.nr}%` }} title={`Neutral reporting ${phase.nr.toFixed(1)}%`} />
                <i className="sv" style={{ width: `${phase.sv}%` }} title={`Supportive of victim ${phase.sv.toFixed(1)}%`} />
              </div>
              <strong>{phase.cg.toFixed(1)}% government criticism</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="paper-section outcomes-section">
        <div className="paper-section-head simple"><div><p className="paper-kicker">RQ3 · Institutional response</p><h2>Recorded institutional responses.</h2><p>The response taxonomy is descriptive. It does not establish that online discourse caused policy or legal action.</p></div></div>
        <div className="outcome-grid">
          <article><span>02</span><h3>Legislative</h3><p>Nirbhaya 2012 · Kathua 2018</p></article>
          <article><span>03</span><h3>Regulatory / state action</h3><p>Uber Delhi 2014 · Hyderabad Vet 2019 · RG Kar 2024</p></article>
          <article><span>11</span><h3>Executive / judicial only</h3><p>Remaining cases in the paper taxonomy</p></article>
        </div>
      </section>

      <section className="paper-section model-section">
        <div className="paper-section-head simple"><div><p className="paper-kicker">Post-submission local audit</p><h2>Classification and confidence audit.</h2><p>This panel reports the later fixed 3,000-row validation matrix. It is deliberately separated from the submitted paper&apos;s pilot results.</p></div><aside className="evidence-tag">Later model audit</aside></div>
        <div className="model-grid">
          <div className="model-bars">
            {modelMetrics.map((metric) => <article key={metric.name}><h3>{metric.name}</h3><div><span>Base</span><i><b style={{ width: `${metric.base}%` }} /></i><strong>{metric.base.toFixed(2)}</strong></div><div><span>Adapted</span><i><b className="adapted" style={{ width: `${metric.adapted}%` }} /></i><strong>{metric.adapted.toFixed(2)}</strong></div></article>)}
          </div>
          <aside className="hcer-card"><p>High-confidence error rate</p><strong>10.51% → 11.74%</strong><span>Macro-F1 improved, but the adapted Qwen model became slightly more confidently wrong in this audit matrix. Better classification is not automatically better calibration.</span></aside>
        </div>
      </section>

      <section className="paper-section evidence-section">
        <div><p className="paper-kicker">Notes</p><h2>Evidence and limitations</h2></div>
        <div className="evidence-grid">
          <article><span>Submitted-paper</span><p>Corpus scale, 16-case framing, 2012–2024 span, paper-facing tests, and annotator agreement mirror the accepted manuscript.</p></article>
          <article><span>Local-verified</span><p>The model audit uses later reproducibility artifacts and is labeled separately so it does not rewrite the submitted pilot.</p></article>
          <article><span>Privacy</span><p>Only aggregate statistics appear here. Raw usernames, comment text, and individual-level records are not published in this dashboard.</p></article>
          <article><span>Limitations</span><p>Platform participation is not representative of India as a whole. Observed discourse–response patterns are associations, not causal estimates.</p></article>
        </div>
      </section>
    </>
  )
}
