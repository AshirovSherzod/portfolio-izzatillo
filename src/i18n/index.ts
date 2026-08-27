import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import uz from "./locales/uz.json";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

export const resources = {
  uz: { translation: uz },
  en: { translation: en },
  ru: { translation: ru },
} as const;

export type Language = keyof typeof resources;

export const LANGUAGE_STORAGE_KEY = "lang";

const DEFAULT_LANGUAGE: Language = "uz";

function isLanguage(value: string | null): value is Language {
  return value !== null && value in resources;
}

/**
 * Til tanlash tartibi:
 * 1) foydalanuvchi oldin tanlagan til (localStorage)
 * 2) brauzer tili
 * 3) o'zbekcha
 */
function resolveInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguage(saved)) return saved;
  } catch {
    // localStorage yopiq bo'lishi mumkin (private rejim) — e'tiborsiz qoldiramiz
  }

  const fromBrowser = navigator.language.split("-")[0];
  if (isLanguage(fromBrowser)) return fromBrowser;

  return DEFAULT_LANGUAGE;
}

const initialLanguage = resolveInitialLanguage();

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});

// <html lang="..."> ni tanlangan tilga moslab turamiz
document.documentElement.lang = initialLanguage;
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;
