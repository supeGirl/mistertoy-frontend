// src/i18n.js
import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-xhr-backend'

// Language resources
const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      tel_aviv: 'Tel Aviv',
      jerusalem: 'Jerusalem',
      haifa: 'Haifa',
    },
  },
  he: {
    translation: {
      welcome: 'ברוך הבא',
      tel_aviv: 'תל אביב',
      jerusalem: 'ירושלים',
      haifa: 'חיפה',
    },
  },
}

i18n
  .use(LanguageDetector) // Detects the user's language
  .use(Backend) // Optionally load translations from files
  .use(initReactI18next) // Passes i18n instance to React
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  })

export default i18n
