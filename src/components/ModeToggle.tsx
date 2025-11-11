import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Sun, Moon } from 'lucide-react'

type Mode = 'light' | 'dark'

export function ModeToggle({ className }: { className?: string }) {
  // Initialize mode from system preference if no stored preference exists
  const getInitialMode = (): Mode => {
    if (typeof window === 'undefined') return 'light'
    
    try {
      const stored = localStorage.getItem('strikketeller-mode')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed === 'dark' || parsed === 'light') {
          return parsed as Mode
        }
      }
    } catch {
      // Invalid stored value, fall through to system preference
    }
    
    // No stored preference, use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  }

  const [mode, setMode] = useLocalStorage<Mode>('strikketeller-mode', getInitialMode())

  // Apply mode to document on mount and when mode changes
  useEffect(() => {
    const root = document.documentElement
    if (mode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [mode])

  const toggleMode = () => {
    const newMode: Mode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
  }

  return (
    <Button
      variant="outline"
      onClick={toggleMode}
      className={cn("text-sm", className)}
      aria-label={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {mode === 'light' ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </Button>
  )
}

