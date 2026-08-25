'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

export type LabSettings = {
  temperature: number
  nodeDensity: number
  dropout: number
}

type LabControlKey = keyof LabSettings

type LabContextValue = {
  settings: LabSettings
  setSetting: (key: LabControlKey, value: number) => void
  reset: () => void
}

export const DEFAULT_LAB_SETTINGS: LabSettings = {
  temperature: 0.55,
  nodeDensity: 0.65,
  dropout: 0.12,
}

const LabContext = createContext<LabContextValue | null>(null)

export function LabProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<LabSettings>(DEFAULT_LAB_SETTINGS)

  const setSetting = useCallback((key: LabControlKey, value: number) => {
    setSettings((current) => ({ ...current, [key]: value }))
  }, [])

  const reset = useCallback(() => setSettings(DEFAULT_LAB_SETTINGS), [])
  const value = useMemo(() => ({ settings, setSetting, reset }), [settings, setSetting, reset])

  return <LabContext.Provider value={value}>{children}</LabContext.Provider>
}

export function useLabControls() {
  const context = useContext(LabContext)
  if (!context) throw new Error('useLabControls must be used inside LabProvider')
  return context
}
