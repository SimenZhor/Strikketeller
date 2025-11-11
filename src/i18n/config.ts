import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import nbNoTranslations from './locales/nb-NO.json'
import enUsTranslations from './locales/en-US.json'

// Get language from localStorage or default to Norwegian
const getStoredLanguage = (): string => {
  if (typeof window === 'undefined') {
    return 'nb-NO'
  }
  try {
    const stored = window.localStorage.getItem('strikketeller-language')
    return stored || 'nb-NO'
  } catch {
    return 'nb-NO'
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      'nb-NO': {
        translation: nbNoTranslations
      },
      'en-US': {
        translation: enUsTranslations
      }
    },
    lng: getStoredLanguage(),
    fallbackLng: 'nb-NO',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  })

export default i18n

