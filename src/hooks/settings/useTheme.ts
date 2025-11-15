import { useEffect } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export type Theme = 'default' | 'sunset' | 'blue' | 'green' | 'purple'

// Default theme preference
const getDefaultTheme = (): Theme => {
  if (typeof window === 'undefined') return 'default'
  return 'default'
}

export function useTheme() {
  // useLocalStorage will read from localStorage if available
  // If not, it will use the default theme
  const [theme, setTheme] = useLocalStorage<Theme>('strikketeller-theme', getDefaultTheme())

  // Apply theme data attribute to document on mount and when theme changes
  useEffect(() => {
    const root = document.documentElement
    // Remove all theme data attributes
    root.removeAttribute('data-theme')
    // Apply the selected theme (only if not default)
    if (theme !== 'default') {
      root.setAttribute('data-theme', theme)
    }
    // Note: Dark mode class is managed by useMode hook
  }, [theme])

  return [theme, setTheme] as const
}

