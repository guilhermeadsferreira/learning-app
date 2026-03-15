import { createContext, useContext, useState, useCallback } from 'react'

interface SettingsDrawerContextValue {
  isOpen: boolean
  openSettings: () => void
  closeSettings: () => void
}

const SettingsDrawerContext = createContext<SettingsDrawerContextValue | null>(null)

export function SettingsDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openSettings = useCallback(() => setIsOpen(true), [])
  const closeSettings = useCallback(() => setIsOpen(false), [])

  const value: SettingsDrawerContextValue = {
    isOpen,
    openSettings,
    closeSettings,
  }

  return <SettingsDrawerContext.Provider value={value}>{children}</SettingsDrawerContext.Provider>
}

export function useSettingsDrawer(): SettingsDrawerContextValue {
  const context = useContext(SettingsDrawerContext)
  if (!context) {
    throw new Error('useSettingsDrawer must be used within SettingsDrawerProvider')
  }
  return context
}
