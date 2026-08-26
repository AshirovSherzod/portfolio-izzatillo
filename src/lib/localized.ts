import { resources, type Language } from "../i18n";

/** Uch tilda yoziladigan qiymat. Matn i18n JSON'ida emas, ma'lumot faylida turadi. */
export type Localized = Record<Language, string>;

function isLanguage(value: string): value is Language {
  return value in resources;
}

/** Joriy tilga mos matnni oladi; topilmasa o'zbekchaga qaytadi. */
export function pickLocalized(value: Localized, language: string): string {
  const key = language.slice(0, 2);
  return isLanguage(key) ? value[key] : value.uz;
}
