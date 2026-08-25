'use client'

import dynamic from 'next/dynamic'
import { MotionConfig, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import ControlRoom from './ControlRoom'
import { LabProvider, useLabControls } from './LabControls'
import StaticNeuralFallback from './StaticNeuralFallback'

const NeuralField = dynamic(() => import('./NeuralField'), {
  ssr: false,
  loading: () => <StaticNeuralFallback />,
})

function LabScene() {
  const reducedMotion = useReducedMotion()
  const { settings } = useLabControls()
  const [canvasEnabled, setCanvasEnabled] = useState(false)

  useEffect(() => {
    if (reducedMotion || window.matchMedia('(max-width: 720px)').matches) return
    const activate = () => setCanvasEnabled(true)
    const timeoutId = window.setTimeout(activate, 500)
    return () => window.clearTimeout(timeoutId)
  }, [reducedMotion])

  return (
    <>
      <div
        className="lab-backdrop"
        data-temperature={settings.temperature.toFixed(2)}
        data-node-density={settings.nodeDensity.toFixed(2)}
        data-dropout={settings.dropout.toFixed(2)}
        aria-hidden="true"
      >
        {canvasEnabled
          ? <NeuralField reducedMotion={Boolean(reducedMotion)} />
          : <StaticNeuralFallback
              opacity={(0.22 + settings.nodeDensity * 0.38) * (1 - settings.dropout * 0.32)}
              contrast={0.9 + settings.temperature * 0.18}
            />}
      </div>
      <ControlRoom />
    </>
  )
}

export default function LabEnvironment() {
  return <MotionConfig reducedMotion="user"><LabProvider><LabScene /></LabProvider></MotionConfig>
}
