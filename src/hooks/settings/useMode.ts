import { useEffect } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export type Mode = 'light' | 'dark'

// Get system preference for dark mode
// This is only used as a fallback when no stored preference exists
const getSystemPreference = (): Mode => {
  if (typeof window === 'undefined') return 'light'
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export function useMode() {
  // useLocalStorage will read from localStorage if available
  // If not, it will use the system preference as the initial value
  const [mode, setMode] = useLocalStorage<Mode>('strikketeller-mode', getSystemPreference())

  // Apply dark mode class to document on mount and when mode changes
  useEffect(() => {
    const root = document.documentElement
    if (mode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [mode])

  return [mode, setMode] as const
}

