
import { useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface TranslationObject {
  [key: string]: string | TranslationObject;
}

const translations: Record<Language, TranslationObject> = {
  en: {},
  ar: {}
};

// Load translation files
const loadTranslations = async () => {
  try {
    const [enTranslations, arTranslations] = await Promise.all([
      import('../locales/en/common.json'),
      import('../locales/ar/common.json')
    ]);
    
    translations.en = enTranslations.default;
    translations.ar = arTranslations.default;
  } catch (error) {
    console.error('Failed to load translations:', error);
  }
};

// Initialize translations
loadTranslations();

export const useI18n = () => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('ux-analyzer-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('ux-analyzer-language', newLanguage);
  };

  const t = (key: string, replacements?: Record<string, string>): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    // Navigate through nested keys
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if translation not found
          }
        }
        break;
      }
    }

    if (typeof value !== 'string') {
      return key; // Return key if final value is not a string
    }

    // Handle replacements like {count}
    if (replacements) {
      return Object.keys(replacements).reduce((str, replaceKey) => {
        return str.replace(new RegExp(`{${replaceKey}}`, 'g'), replacements[replaceKey]);
      }, value);
    }

    return value;
  };

  return {
    language,
    toggleLanguage,
    t
  };
};
