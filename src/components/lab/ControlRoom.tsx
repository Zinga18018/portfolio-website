'use client'

import { useEffect, useState } from 'react'
import { DEFAULT_LAB_SETTINGS, type LabSettings, useLabControls } from './LabControls'

type ControlDefinition = {
  key: keyof LabSettings
  label: string
  min: number
  max: number
  step: number
  format: (value: number) => string
}

const controls: ControlDefinition[] = [
  { key: 'temperature', label: 'Temperature', min: 0.2, max: 1.6, step: 0.05, format: (value) => value.toFixed(2) },
  { key: 'nodeDensity', label: 'Node density', min: 0.2, max: 1, step: 0.01, format: (value) => `${Math.round(value * 100)}%` },
  { key: 'dropout', label: 'Dropout', min: 0, max: 0.6, step: 0.01, format: (value) => `${Math.round(value * 100)}%` },
]

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export default function ControlRoom() {
  const [open, setOpen] = useState(false)
  const { settings, setSetting, reset } = useLabControls()

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <div className={`control-room ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="control-toggle"
        aria-expanded={open}
        aria-controls="lab-control-panel"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="control-led" aria-hidden="true" />
        CONTROL ROOM
        <span aria-hidden="true">{open ? '×' : '+'}</span>
      </button>

      <section id="lab-control-panel" className="control-panel" aria-label="Neural field controls" hidden={!open}>
        <div className="control-heading">
          <div><span>LAB / SCENE 01</span><strong>NEURAL FIELD</strong></div>
          <button type="button" onClick={reset}>Reset</button>
        </div>
        {controls.map((control) => (
          <label key={control.key} className="control-row">
            <span>{control.label}</span>
            <output>{control.format(settings[control.key])}</output>
            <input
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={settings[control.key]}
              aria-label={control.label}
              onInput={(event) => setSetting(control.key, Number(event.currentTarget.value))}
              onKeyDown={(event) => {
                const direction = event.key === 'ArrowRight' || event.key === 'ArrowUp'
                  ? 1
                  : event.key === 'ArrowLeft' || event.key === 'ArrowDown'
                    ? -1
                    : 0
                if (event.key === 'Home') {
                  event.preventDefault()
                  setSetting(control.key, control.min)
                } else if (event.key === 'End') {
                  event.preventDefault()
                  setSetting(control.key, control.max)
                } else if (direction !== 0) {
                  event.preventDefault()
                  const next = clamp(settings[control.key] + direction * control.step, control.min, control.max)
                  setSetting(control.key, Number(next.toFixed(4)))
                }
              }}
            />
          </label>
        ))}
        <p className="control-footnote">
          Defaults: T {DEFAULT_LAB_SETTINGS.temperature.toFixed(2)} · density {Math.round(DEFAULT_LAB_SETTINGS.nodeDensity * 100)}% · dropout {Math.round(DEFAULT_LAB_SETTINGS.dropout * 100)}%
        </p>
      </section>
    </div>
  )
}
