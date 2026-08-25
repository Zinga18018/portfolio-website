'use client'

import { useState } from 'react'

type PartId = 'data' | 'features' | 'model' | 'monitor'

const parts = [
  { id: 'data', number: '01', hardware: 'DATA SSD', science: 'Data pipeline', detail: 'Clean, split, and protect against leakage.', slot: 'DATA BAY' },
  { id: 'features', number: '02', hardware: 'FEATURE RAM', science: 'Feature engineering', detail: 'Encode signal and handle missingness.', slot: 'MEMORY CHANNEL' },
  { id: 'model', number: '03', hardware: 'MODEL GPU', science: 'Model training', detail: 'Fit, tune, and compare candidates.', slot: 'COMPUTE SLOT' },
  { id: 'monitor', number: '04', hardware: 'DRIFT SENSOR', science: 'Evaluation', detail: 'Audit calibration, drift, and decay.', slot: 'TELEMETRY HEADER' },
] as const

const applications = [
  { number: '01', title: 'Women’s Safety Narratives', detail: 'NLP research dashboard', href: '/projects/womens-safety-narratives' },
  { number: '02', title: 'Readmission Risk Audit', detail: 'Healthcare model evaluation', href: '/projects/readmission-risk-audit' },
  { number: '03', title: 'RAG Evaluation API', detail: 'Retrieval system evidence', href: '/projects/rag-evaluation-api' },
  { number: '04', title: 'GitHub Project Archive', detail: '43 public repositories', href: '#project-atlas' },
] as const

const emptyPlacement: Record<PartId, boolean> = { data: false, features: false, model: false, monitor: false }

export default function PcWorkbench() {
  const [placed, setPlaced] = useState<Record<PartId, boolean>>({ ...emptyPlacement })
  const [selected, setSelected] = useState<PartId | null>(null)
  const [wrongSlot, setWrongSlot] = useState<PartId | null>(null)
  const [message, setMessage] = useState('Select a component, then fit it into the matching slot.')
  const placedCount = parts.filter((part) => placed[part.id]).length
  const complete = placedCount === parts.length

  function fitPart(partId: PartId, slotId: PartId) {
    if (partId !== slotId) {
      setWrongSlot(slotId)
      setMessage('Wrong slot. Match the component label to its system stage.')
      window.setTimeout(() => setWrongSlot(null), 420)
      return
    }
    const part = parts.find((item) => item.id === partId)
    setPlaced((current) => ({ ...current, [partId]: true }))
    setSelected(null)
    setWrongSlot(null)
    setMessage(partId === 'monitor' && placedCount === parts.length - 1 ? 'System online. Project routes unlocked.' : `${part?.hardware ?? 'Component'} connected.`)
  }

  function resetPuzzle() {
    setPlaced({ ...emptyPlacement })
    setSelected(null)
    setWrongSlot(null)
    setMessage('System reset. Select a component and fit it into the case.')
  }

  return (
    <div className="workbench-wrap">
      <div className="workbench-head">
        <div>
          <p className="system-label">INTERACTIVE SYSTEM BUILD</p>
          <h3>Assemble the ML workstation.</h3>
          <p>Each PC component maps to one stage of a measured data system.</p>
        </div>
        <div className="build-progress" aria-label={`${placedCount} of ${parts.length} components connected`}>
          <span><b>{placedCount}</b> / {parts.length} CONNECTED</span>
          <i><b style={{ width: `${(placedCount / parts.length) * 100}%` }} /></i>
        </div>
      </div>

      <div className="pc-workbench">
        <aside className="parts-tray" aria-label="Data science component tray">
          <div className="tray-heading"><span>PARTS TRAY</span><small>CLICK OR DRAG</small></div>
          {parts.map((part) => (
            <button type="button" key={part.id}
              className={`pc-part pc-part-${part.id} ${selected === part.id ? 'selected' : ''} ${placed[part.id] ? 'installed' : ''}`}
              draggable={!placed[part.id]} disabled={placed[part.id]} aria-pressed={selected === part.id}
              onClick={() => { setSelected(part.id); setMessage(`${part.hardware} selected. Find the ${part.slot.toLowerCase()}.`) }}
              onDragStart={(event) => { event.dataTransfer.setData('text/plain', part.id); event.dataTransfer.effectAllowed = 'move'; setSelected(part.id) }}>
              <span className="part-number">{part.number}</span>
              <span className="part-body"><b>{part.hardware}</b><strong>{part.science}</strong><small>{part.detail}</small></span>
              <span className="part-connector" aria-hidden="true" />
            </button>
          ))}
        </aside>

        <section className={`pc-case ${complete ? 'system-online' : ''}`} aria-label="PC case assembly area">
          <div className="case-topbar"><span>YK-ML // CASE_03</span><div className="case-lights" aria-hidden="true"><i /><i /><i className={complete ? 'online' : ''} /></div></div>
          <div className="case-window">
            <div className="case-fan fan-one"><i /><span>DATA<br />FLOW</span></div>
            <div className="case-fan fan-two"><i /></div>
            <div className="motherboard" aria-hidden="true"><span className="board-chip">DS<br />CORE</span><i className="trace trace-one" /><i className="trace trace-two" /><i className="trace trace-three" /></div>
            <div className="case-slots">
              {parts.map((part) => (
                <button type="button" key={part.id}
                  className={`pc-slot slot-${part.id} ${placed[part.id] ? 'filled' : ''} ${wrongSlot === part.id ? 'wrong' : ''}`}
                  aria-label={`${part.slot}: ${placed[part.id] ? `${part.hardware} installed` : 'empty'}`}
                  onClick={() => selected && fitPart(selected, part.id)}
                  onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = 'move' }}
                  onDrop={(event) => { event.preventDefault(); const partId = event.dataTransfer.getData('text/plain') as PartId; if (parts.some((item) => item.id === partId)) fitPart(partId, part.id) }}>
                  {placed[part.id]
                    ? <span className={`installed-part installed-${part.id}`}><small>{part.number}</small><b>{part.hardware}</b><em>{part.science}</em></span>
                    : <span className="empty-slot"><small>{part.slot}</small><b>{part.science}</b><em>Fit part {part.number}</em></span>}
                </button>
              ))}
            </div>
            <div className="power-supply"><span>POWER</span><i /><i /><i /></div>
            <div className="case-cable cable-one" /><div className="case-cable cable-two" />
          </div>
          <div className="case-status" aria-live="polite">
            <span className={complete ? 'online' : ''}>{complete ? 'SYSTEM ONLINE' : 'ASSEMBLY MODE'}</span>
            <p>{message}</p>
            <button type="button" onClick={resetPuzzle}>RESET ↺</button>
          </div>
        </section>
      </div>

      <section className={`system-apps ${complete ? 'unlocked' : ''}`} aria-label="Project applications">
        <div className="system-apps-heading">
          <div><p className="system-label">INSTALLED APPLICATIONS</p><h3>{complete ? 'Build complete. Open a project.' : 'Complete the build to unlock the routes.'}</h3></div>
          <span>{complete ? 'ACCESS GRANTED' : 'SYSTEM LOCKED'}</span>
        </div>
        <div className="system-app-grid">
          {applications.map((app) => complete ? (
            <a href={app.href} key={app.number}>
              <span>{app.number}</span><div><b>{app.title}</b><small>{app.detail}</small></div><i>↗</i>
            </a>
          ) : (
            <div className="locked-app" key={app.number} aria-disabled="true"><span>{app.number}</span><div><b>APPLICATION LOCKED</b><small>Install all four components</small></div><i aria-hidden="true">×</i></div>
          ))}
        </div>
      </section>
    </div>
  )
}
