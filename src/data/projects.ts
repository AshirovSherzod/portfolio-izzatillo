import type { Localized } from "../lib/localized";

export const PROJECT_CATEGORIES = ["graphic", "web", "motion", "3d"] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type Project = {
  /** URL va React key uchun — takrorlanmasligi kerak */
  id: string;
  title: Localized;
  category: ProjectCategory;
  /**
   * Muqova rasmi: `public/projects/` ichidagi faylga yo'l, masalan
   * "/projects/uzum-rebrand.webp". Bo'sh qoldirilsa placeholder ko'rsatiladi.
   */
  cover?: string;
  /** Modal ichidagi qo'shimcha rasmlar */
  images?: string[];
  client?: string;
  year?: number;
  /** Behance / Dribbble / Instagram havolasi */
  link?: string;
};

/**
 * TODO: bular dizaynni ko'rish uchun qo'yilgan NAMUNA yozuvlar.
 * Saytni chiqarishdan oldin haqiqiy ishlar bilan almashtirilishi shart.
 *
 * Yangi ish qo'shish:
 *   1. Rasmni `public/projects/` ga tashlang
 *   2. Shu massivga yozuv qo'shing (`cover: "/projects/fayl-nomi.webp"`)
 * Boshqa fayl tahrirlash shart emas.
 */
export const projects: Project[] = [
  {
    id: "brand-identity",
    title: {
      uz: "Brend identifikatsiyasi",
      en: "Brand Identity",
      ru: "Фирменный стиль",
    },
    category: "graphic",
    year: 2025,
  },
  {
    id: "packaging",
    title: {
      uz: "Qadoq dizayni",
      en: "Packaging Design",
      ru: "Дизайн упаковки",
    },
    category: "graphic",
    year: 2025,
  },
  {
    id: "corporate-site",
    title: {
      uz: "Korporativ sayt",
      en: "Corporate Website",
      ru: "Корпоративный сайт",
    },
    category: "web",
    year: 2025,
  },
  {
    id: "mobile-app",
    title: {
      uz: "Mobil ilova interfeysi",
      en: "Mobile App UI",
      ru: "Интерфейс мобильного приложения",
    },
    category: "web",
    year: 2024,
  },
  {
    id: "promo-video",
    title: {
      uz: "Promo roliki",
      en: "Promo Reel",
      ru: "Промо-ролик",
    },
    category: "motion",
    year: 2024,
  },
  {
    id: "product-render",
    title: {
      uz: "Mahsulot renderi",
      en: "Product Render",
      ru: "Рендер продукта",
    },
    category: "3d",
    year: 2024,
  },
];
