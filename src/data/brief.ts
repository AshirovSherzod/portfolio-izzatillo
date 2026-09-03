import type { Localized } from "../lib/localized";

/**
 * Brif formasidagi tanlov variantlari (byudjet va muddat).
 * Variantni o'zgartirish uchun faqat shu fayl tahrirlanadi.
 */
export type BriefOption = {
  /** Telegram xabariga tushmaydi — faqat React key va `value` uchun */
  id: string;
  label: Localized;
};

export const budgets: BriefOption[] = [
  {
    id: "under-2m",
    label: {
      uz: "2 mln so'mgacha",
      en: "Under 2M UZS",
      ru: "До 2 млн сум",
    },
  },
  {
    id: "2-5m",
    label: {
      uz: "2–5 mln so'm",
      en: "2–5M UZS",
      ru: "2–5 млн сум",
    },
  },
  {
    id: "5-10m",
    label: {
      uz: "5–10 mln so'm",
      en: "5–10M UZS",
      ru: "5–10 млн сум",
    },
  },
  {
    id: "over-10m",
    label: {
      uz: "10 mln so'mdan yuqori",
      en: "Over 10M UZS",
      ru: "Более 10 млн сум",
    },
  },
  {
    id: "unknown",
    label: {
      uz: "Hali aniq emas",
      en: "Not decided yet",
      ru: "Пока не определён",
    },
  },
];

export const timelines: BriefOption[] = [
  {
    id: "asap",
    label: {
      uz: "Imkon qadar tez",
      en: "As soon as possible",
      ru: "Как можно скорее",
    },
  },
  {
    id: "1-2-weeks",
    label: {
      uz: "1–2 hafta",
      en: "1–2 weeks",
      ru: "1–2 недели",
    },
  },
  {
    id: "1-month",
    label: {
      uz: "Bir oycha",
      en: "About a month",
      ru: "Около месяца",
    },
  },
  {
    id: "flexible",
    label: {
      uz: "Muddat cheklanmagan",
      en: "Flexible",
      ru: "Сроки не ограничены",
    },
  },
];
