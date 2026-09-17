'use client'

import { useState, useEffect } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import repositories from '@/lib/github-repos.json'
import styles from './ProjectDashboards.module.css'

const cases = [
  { name: 'Sandeshkhali 2024', n: 3720, cg: 48.55 }, { name: 'Hathras 2020', n: 14297, cg: 40.71 },
  { name: 'Unnao 2017', n: 9113, cg: 37.08 }, { name: 'RG Kar 2024', n: 9981, cg: 36.27 },
  { name: 'Manipur 2023', n: 15250, cg: 30.52 }, { name: 'Hyderabad Vet 2019', n: 5194, cg: 23.97 },
  { name: 'Kathua 2018', n: 14082, cg: 23.51 }, { name: 'Bhavana Assault 2017', n: 1634, cg: 23.26 },
  { name: 'Nirbhaya 2012', n: 35517, cg: 19.34 }, { name: 'Badaun 2014', n: 3424, cg: 17.61 },
  { name: 'Badlapur 2024', n: 5937, cg: 16.91 }, { name: 'Shraddha Walkar 2022', n: 1064, cg: 16.35 },
  { name: 'Jisha 2016', n: 1261, cg: 16.10 }, { name: 'Shakti Mills 2013', n: 2898, cg: 13.11 },
  { name: 'Uber Delhi 2014', n: 2637, cg: 12.36 }, { name: 'Pollachi 2019', n: 4849, cg: 11.71 },
]
const phases = [
  { name: 'Acute · 0–90 days', cg: 33.862, cs: 26.093, nr: 36.536, sv: 3.510 },
  { name: 'Sustained · 91–365 days', cg: 29.293, cs: 29.597, nr: 37.482, sv: 3.628 },
  { name: 'Retrospective · 366+ days', cg: 23.938, cs: 30.165, nr: 41.144, sv: 4.753 },
]
const featured = ['readmission-risk-audit', 'NewsSnap', 'driftlab-model-monitoring-simulator', 'womens-safety-discourse-dashboard']
const title: Record<string, string> = { 'readmission-risk-audit': 'Readmission risk', NewsSnap: 'NewsSnap', 'driftlab-model-monitoring-simulator': 'DriftLab', 'womens-safety-discourse-dashboard': 'Women’s safety research' }
const demos: Record<string, string> = { 'readmission-risk-audit': 'https://yogesh-readmission-risk-audit.streamlit.app/', NewsSnap: 'https://yogesh-newssnap-classifier.streamlit.app/', 'driftlab-model-monitoring-simulator': 'https://yogesh-driftlab-monitoring.streamlit.app/', 'womens-safety-discourse-dashboard': '/research/women-safety/' }

function Metrics({ items }: { items: [string, string][] }) {
  return <dl className={styles.metrics}>{items.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
}
function Bars({ items, max = 1 }: { items: [string, number][]; max?: number }) {
  return <div className={styles.bars}>{items.map(([name, value]) => <div key={name}><span>{name}</span><div className={styles.track}><i style={{ width: `${value / max * 100}%` }} /></div><strong>{value.toFixed(3)}</strong></div>)}</div>
}

export default function ProjectDashboards() {
  const [project, setProject] = useState(featured[0])
  const [caseName, setCaseName] = useState('Nirbhaya 2012')
  const [phase, setPhase] = useState(0)
  const [view, setView] = useState('All cases')
  const [repos, setRepos] = useState(repositories)
  useEffect(() => {
    const selectProject = (event: Event) => {
      const name = (event as CustomEvent<string>).detail
      if (typeof name === 'string') setProject(name)
    }
    const refresh = (event: Event) => {
      const data = (event as CustomEvent<typeof repositories>).detail
      if (Array.isArray(data)) setRepos(data)
    }
    window.addEventListener('portfolio-project', selectProject)
    window.addEventListener('portfolio-repositories', refresh)
    return () => { window.removeEventListener('portfolio-project', selectProject); window.removeEventListener('portfolio-repositories', refresh) }
  }, [])
  const repo = repos.find(item => item.name === project)
  const selectedCase = cases.find(item => item.name === caseName)!
  const selectedPhase = phases[phase]
  const shownCases = view === 'Selected case' ? [selectedCase] : cases
  return (
    <section id="project-dashboards" className={styles.section} aria-labelledby="dashboard-heading">
      <div className={styles.header}><div><p className="eyebrow">Results</p><h3 id="dashboard-heading">Project dashboards</h3><p>Inspect the available results, then open the demo or source.</p></div><label>Project<select value={project} onChange={event => setProject(event.target.value)}><optgroup label="Featured projects">{featured.map(name => <option key={name} value={name}>{title[name]}</option>)}</optgroup><optgroup label="All other repositories">{repos.filter(item => !featured.includes(item.name)).sort((a,b)=>a.name.localeCompare(b.name)).map(item => <option key={item.id} value={item.name}>{item.name}</option>)}</optgroup></select></label></div>
      <div className={styles.panel}>
        <div className={styles.panelHeading}><h4>{title[project] || project.replace(/[-_]/g, ' ')}</h4><span>{featured.includes(project) ? 'Existing portfolio results' : 'Repository overview'}</span></div>
        {project === 'readmission-risk-audit' && <>
          <p>30-day readmission modeling with patient-disjoint splits and probability calibration.</p>
          <Metrics items={[["Held-out encounters", "10,822"], ["ROC-AUC", "0.661"], ["PR-AUC", "0.175"], ["Brier score ↓", "0.077"]]} />
          <h5>Held-out evaluation</h5><Bars items={[["ROC-AUC", .661], ["PR-AUC", .175], ["Brier score", .077]]} />
          <p className={styles.note}>Scale: 0–1. Higher AUC is better; lower Brier is better. These measure different properties and should not be ranked against each other. Prediction-level data is needed for ROC and calibration curves.</p>
        </>}
        {project === 'NewsSnap' && <>
          <p>A DistilBERT classifier for four AG News categories, with a FastAPI service and React interface.</p>
          <Metrics items={[["Held-out articles", "12,000"], ["Accuracy", "0.870"], ["Macro-F1", "0.869"], ["MCC", "0.827"]]} />
          <h5>Held-out evaluation</h5><Bars items={[["Accuracy", .870], ["Macro-F1", .869], ["MCC", .827]]} />
          <p className={styles.note}>Accuracy and F1 range from 0 to 1; MCC ranges from −1 to 1. Positive values are shown here on a 0–1 axis. A confusion matrix requires the evaluation predictions and is not reconstructed from these scores.</p>
        </>}
        {project === 'driftlab-model-monitoring-simulator' && <>
          <p>One recorded mixed-shift simulation. These are scenario results, not a production incident.</p>
          <Metrics items={[["Baseline ROC-AUC", "0.758"], ["Shifted ROC-AUC", "0.372"], ["Maximum PSI", "0.608"], ["Alerts fired", "3"]]} />
          <h5>Before and after the simulated shift</h5><Bars items={[["Baseline ROC-AUC", .758], ["Shifted ROC-AUC", .372]]} />
          <p className={styles.note}>Absolute ROC-AUC change: −0.386. Only the reported endpoints are shown. Open the simulator to change the shift settings.</p>
        </>}
        {project === 'womens-safety-discourse-dashboard' && <>
          <p>Stance patterns across 16 cases in India. Select a case and compare the study’s incident-relative time windows.</p>
          <div className={styles.filters}><label>Case study<select value={caseName} onChange={event => setCaseName(event.target.value)}>{cases.map(item => <option key={item.name}>{item.name}</option>)}</select></label><label>Case chart<select value={view} onChange={event => setView(event.target.value)}><option>All cases</option><option>Selected case</option></select></label></div>
          <Metrics items={[["Full retained corpus", "351,501"], ["Selected-case subset", selectedCase.n.toLocaleString('en-US')], ["Government criticism", `${selectedCase.cg.toFixed(2)}%`], ["Case studies", "16"]]} />
          <h5>Government criticism by case</h5><div className={styles.caseBars}>{shownCases.map(item => <div key={item.name}><span>{item.name}</span><div className={styles.track}><i style={{width:`${item.cg}%`}} /></div><strong>{item.cg.toFixed(2)}%</strong></div>)}</div>
          <p className={styles.note}>Axis: 0–100%. Case counts refer to the case-comparison subset, not the entire retained corpus. The bars describe stance, not sentiment.</p>
          <h5>Stance over time · aggregate across cases</h5><div className={styles.phaseButtons} role="group" aria-label="Dashboard time window">{phases.map((item,index)=><button key={item.name} type="button" aria-pressed={phase===index} onClick={()=>setPhase(index)}>{item.name}</button>)}</div>
          <div aria-live="polite"><Bars max={100} items={[["Critical of government",selectedPhase.cg],["Critical of society",selectedPhase.cs],["Neutral reporting",selectedPhase.nr],["Supportive of victim",selectedPhase.sv]]}/></div>
          <p className={styles.note}>Values are percentages across the eligible corpus. Selecting a case does not change this aggregate panel. Incident-relative windows are not verdict-relative dates; per-case sentiment and emotion exports have not been supplied.</p>
        </>}
        {!featured.includes(project) && <>
          <p>{repo?.description || 'Open the source for the project files and documentation.'}</p>
          <Metrics items={[["Main language",repo?.language || 'Not specified'],["Stars",String(repo?.stargazers_count ?? 0)],["Last push",repo?.pushed_at?.slice(0,10) || 'Not available'],["Status",repo?.archived ? 'Archived' : repo?.fork ? 'Fork' : 'Public']]} />
          <div className={styles.empty}><h5>Evaluation results not published here yet</h5><p>This view shows repository metadata. There is no verified result export to chart for this project.</p></div>
        </>}
        <div className={styles.links}>{demos[project] && <a href={demos[project]} target="_blank" rel="noreferrer">{project==='womens-safety-discourse-dashboard'?'Full research dashboard':'Open demo'} <FiArrowUpRight /></a>}<a href={`https://github.com/Zinga18018/${encodeURIComponent(project)}`} target="_blank" rel="noreferrer">View source <FiArrowUpRight /></a></div>
      </div>
    </section>
  )
}
