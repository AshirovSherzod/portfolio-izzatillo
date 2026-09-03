/**
 * TODO: bu yerdagi qiymatlar VAQTINCHA — haqiqiy ma'lumotlar bilan
 * almashtirilishi shart. Aloqa havolalari saytning bir necha joyida
 * (Footer, Contact bo'limi) shu fayldan olinadi.
 */
export const contact = {
  email: "izzatillo@example.com",
  phone: "+998 90 000 00 00",
} as const;

/**
 * Resume PDF'ga yo'l (`public/` ichidagi fayl, masalan "/resume.pdf").
 * Bo'sh qoldirilsa About'dagi yuklab olish tugmasi umuman ko'rsatilmaydi —
 * shuning uchun ishlamaydigan tugma hech qachon chiqmaydi.
 *
 * TODO: PDF tayyor bo'lgach, faylni `public/` ga tashlab shu yerga yozing.
 */
export const resumeUrl = "";

export type Social = {
  id: string;
  label: string;
  href: string;
  icon: "telegram" | "instagram" | "behance";
};

export const socials: Social[] = [
  {
    id: "telegram",
    label: "Telegram",
    href: "https://t.me/username",
    icon: "telegram",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/username",
    icon: "instagram",
  },
  {
    id: "behance",
    label: "Behance",
    href: "https://behance.net/username",
    icon: "behance",
  },
];
