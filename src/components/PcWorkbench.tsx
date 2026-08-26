'use client'

import { useState } from 'react'
import { FiArrowUpRight, FiGithub, FiRefreshCw } from 'react-icons/fi'
import { projects } from '@/lib/data'

type PartId = 'data' | 'features' | 'model' | 'monitor'

const parts = [
  { id: 'data', number: '01', hardware: 'DATA SSD', science: 'Data pipeline', detail: 'Clean, split, and protect against leakage.', slot: 'DATA BAY' },
  { id: 'features', number: '02', hardware: 'FEATURE RAM', science: 'Feature engineering', detail: 'Encode signal and handle missingness.', slot: 'MEMORY CHANNEL' },
  { id: 'model', number: '03', hardware: 'MODEL GPU', science: 'Model training', detail: 'Fit, tune, and compare candidates.', slot: 'COMPUTE SLOT' },
  { id: 'monitor', number: '04', hardware: 'DRIFT SENSOR', science: 'Evaluation + monitoring', detail: 'Audit calibration, drift, and decay.', slot: 'TELEMETRY HEADER' },
] as const

const emptyPlacement: Record<PartId, boolean> = { data: false, features: false, model: false, monitor: false }

export default function PcWorkbench() {
  const [placed, setPlaced] = useState<Record<PartId, boolean>>(emptyPlacement)
  const [selected, setSelected] = useState<PartId | null>(null)
  const [wrongSlot, setWrongSlot] = useState<PartId | null>(null)
  const [message, setMessage] = useState('Select a component, then fit it into the matching slot.')
  const placedCount = parts.filter((part) => placed[part.id]).length
  const complete = placedCount === parts.length

  function fitPart(partId: PartId, slotId: PartId) {
    if (partId !== slotId) {
      setWrongSlot(slotId)
      setMessage('That part does not fit there. Match the hardware label to its data-science job.')
      window.setTimeout(() => setWrongSlot(null), 420)
      return
    }
    const part = parts.find((item) => item.id === partId)
    setPlaced((current) => ({ ...current, [partId]: true }))
    setSelected(null)
    setWrongSlot(null)
    setMessage(partId === 'monitor' && placedCount === parts.length - 1
      ? 'System online. Project applications unlocked.'
      : `${part?.hardware ?? 'Component'} connected.`)
  }

  function resetPuzzle() {
    setPlaced(emptyPlacement)
    setSelected(null)
    setWrongSlot(null)
    setMessage('System reset. Select a component and fit it into the case.')
  }

  return (
    <div className="workbench-wrap">
      <div className="workbench-head">
        <div>
          <p className="eyebrow">Interactive build</p>
          <h3>Assemble the data-science PC.</h3>
          <p>Each computer part maps to one stage of a defensible ML system.</p>
        </div>
        <div className="build-progress" aria-label={`${placedCount} of ${parts.length} components connected`}>
          <span><b>{placedCount}</b> / {parts.length} connected</span>
          <i><b style={{ width: `${(placedCount / parts.length) * 100}%` }} /></i>
        </div>
      </div>

      <div className="pc-workbench">
        <aside className="parts-tray" aria-label="Data science component tray">
          <div className="tray-heading"><span>Parts tray</span><small>Click or drag</small></div>
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
          <div className="case-topbar"><span>YK-ML // CASE_01</span><div className="case-lights" aria-label={complete ? 'System online' : 'System waiting'}><i /><i /><i className={complete ? 'online' : ''} /></div></div>
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
            <span className={complete ? 'online' : ''}>{complete ? 'System online' : 'Assembly mode'}</span>
            <p>{message}</p>
            <button type="button" onClick={resetPuzzle}><FiRefreshCw /> Reset</button>
          </div>
        </section>
      </div>

      <section className={`system-apps ${complete ? 'unlocked' : ''}`} aria-label="Project applications">
        <div className="system-apps-heading">
          <div><p className="eyebrow">Installed applications</p><h3>{complete ? 'Build complete. Choose a project.' : 'Complete the build to unlock the demos.'}</h3></div>
          <span>{complete ? 'Access granted' : 'System locked'}</span>
        </div>
        <div className="system-app-grid">
          {projects.map((project) => complete ? (
            <article key={project.number}>
              <div className="app-index">{project.number}</div>
              <div className="app-copy"><b>{project.shortTitle}</b><small>{project.stack.join(' · ')}</small></div>
              <div className="app-actions"><a href={project.demo} target="_blank" rel="noreferrer">{project.demoLabel ?? 'Demo'} <FiArrowUpRight /></a>{project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} source code`}><FiGithub /></a>}</div>
            </article>
          ) : (
            <div className="locked-app" key={project.number} aria-disabled="true"><span>{project.number}</span><div><b>Application locked</b><small>Install all four components</small></div><i aria-hidden="true">×</i></div>
          ))}
        </div>
      </section>
    </div>
  )
}
