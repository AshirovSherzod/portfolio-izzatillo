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

i18n.use(initReactI18next).init({
  resources,
  lng: "uz",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
