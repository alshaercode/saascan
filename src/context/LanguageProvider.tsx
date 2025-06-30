"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Language = "en" | "ar";

interface TranslationObject {
  [key: string]: string | TranslationObject;
}

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string, replacements?: Record<string, string>) => string;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [translations, setTranslations] = useState<
    Record<Language, TranslationObject>
  >({
    en: {},
    ar: {},
  });

  useEffect(() => {
    let savedLanguage = localStorage.getItem(
      "ux-analyzer-language"
    ) as Language | null;

    if (!savedLanguage) {
      localStorage.setItem("ux-analyzer-language", "en");
      savedLanguage = "en";
    }

    if (savedLanguage === "en" || savedLanguage === "ar") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      language === "ar" ? "rtl" : "ltr"
    );
  }, [language]);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const [enTranslations, arTranslations] = await Promise.all([
          import("../locales/en/common.json"),
          import("../locales/ar/common.json"),
        ]);
        setTranslations({
          en: enTranslations.default,
          ar: arTranslations.default,
        });
      } catch (error) {
        console.error("Failed to load translations:", error);
      }
    };

    loadTranslations();
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("ux-analyzer-language", newLanguage);
  };

  const t = (key: string, replacements?: Record<string, string>): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // fallback to English
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key;
          }
        }
        break;
      }
    }

    if (typeof value !== "string") return key;

    if (replacements) {
      return Object.keys(replacements).reduce(
        (str, repKey) =>
          str.replace(new RegExp(`{${repKey}}`, "g"), replacements[repKey]),
        value
      );
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
