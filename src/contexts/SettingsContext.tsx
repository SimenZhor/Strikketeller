import { createContext, useContext, useMemo, useCallback, type ReactNode } from 'react'
import { useLanguage, type Language } from '@/hooks/settings/useLanguage'
import { useMode, type Mode } from '@/hooks/settings/useMode'

export type Settings = {
  language: Language
  mode: Mode
  // Future settings can be added here, e.g.:
  // theme?: 'default' | 'high-contrast'
  // fontSize?: 'small' | 'medium' | 'large'
}

export type SettingsContextType = {
  settings: Settings
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useLanguage()
  const [mode, setMode] = useMode()

  // Map of setting keys to their setters - eliminates need for switch statement
  const setters = useMemo(
    () =>
      ({
        language: setLanguage,
        mode: setMode
      }) as Record<keyof Settings, (value: any) => void>,
    [setLanguage, setMode]
  )

  const settings = useMemo(
    () => ({
      language,
      mode
    }),
    [language, mode]
  )

  const setSetting = useCallback(
    <K extends keyof Settings>(key: K, value: Settings[K]) => {
      setters[key](value)
    },
    [setters]
  )

  const value: SettingsContextType = useMemo(
    () => ({
      settings,
      setSetting
    }),
    [settings, setSetting]
  )

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

// Re-export types for convenience
export type { Language, Mode }
