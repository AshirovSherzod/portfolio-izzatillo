import "i18next";
import type uz from "./locales/uz.json";

// t("...") kalitlari endi TypeScript tomonidan tekshiriladi
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof uz;
    };
  }
}
