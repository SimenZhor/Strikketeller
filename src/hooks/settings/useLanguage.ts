import { useEffect } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useTranslation } from 'react-i18next'

export type Language = 'nb-NO' | 'en-US'

export function useLanguage() {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useLocalStorage<Language>('strikketeller-language', 'nb-NO')

  // Sync i18n language whenever the stored language changes
  // This handles both initialization and updates
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language)
    }
  }, [language, i18n])

  return [language, setLanguage] as const
}

