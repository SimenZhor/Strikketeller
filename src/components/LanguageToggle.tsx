import { useTranslation } from 'react-i18next'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

type Language = 'nb-NO' | 'en-US'

export function LanguageToggle({ className }: { className?: string }) {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useLocalStorage<Language>('strikketeller-language', 'nb-NO')

  // Initialize localStorage from i18n on mount if they differ
  useEffect(() => {
    const currentI18nLang = i18n.language as Language
    if (currentI18nLang !== language && (currentI18nLang === 'nb-NO' || currentI18nLang === 'en-US')) {
      setLanguage(currentI18nLang)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run on mount

  // Sync i18n language when localStorage value changes
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language)
    }
  }, [language, i18n])

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'nb-NO' ? 'en-US' : 'nb-NO'
    setLanguage(newLanguage)
  }

  return (
    <Button
      variant="outline"
      onClick={toggleLanguage}
      className={cn("text-sm", className)}
    >
      {language === 'nb-NO' ? 'NO' : 'EN'}
    </Button>
  )
}

