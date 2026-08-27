import type { Localized } from "../lib/localized";

export type Service = {
  id: string;
  /** react-icons/md dagi ikonka nomi — Services komponentida moslashtiriladi */
  icon: "palette" | "devices" | "movie" | "cube";
  title: Localized;
  description: Localized;
};

export const services: Service[] = [
  {
    id: "graphic",
    icon: "palette",
    title: {
      uz: "Grafik dizayn",
      en: "Graphic Design",
      ru: "Графический дизайн",
    },
    description: {
      uz: "Logotip, brend identifikatsiyasi, qadoq va bosma mahsulotlar — brendingizni tanib olinadigan qiladigan vizual tizim.",
      en: "Logos, brand identity, packaging and print — a visual system that makes your brand recognisable.",
      ru: "Логотип, фирменный стиль, упаковка и печатная продукция — визуальная система, которая делает бренд узнаваемым.",
    },
  },
  {
    id: "web",
    icon: "devices",
    title: {
      uz: "Web dizayn (UI/UX)",
      en: "Web Design (UI/UX)",
      ru: "Веб-дизайн (UI/UX)",
    },
    description: {
      uz: "Sayt va mobil ilova interfeyslari. Foydalanuvchi yo'lini o'ylab tuzilgan, ishlab chiquvchiga tayyor maketlar.",
      en: "Website and mobile app interfaces. Built around the user's journey and handed over ready for development.",
      ru: "Интерфейсы сайтов и мобильных приложений. Построены вокруг пути пользователя и готовы к разработке.",
    },
  },
  {
    id: "motion",
    icon: "movie",
    title: {
      uz: "Moushn dizayn",
      en: "Motion Design",
      ru: "Моушн-дизайн",
    },
    description: {
      uz: "Promo roliklar, animatsiyali logotip va ijtimoiy tarmoqlar uchun videolar — harakat orqali e'tibor tortadi.",
      en: "Promo reels, animated logos and social media videos — motion that earns attention.",
      ru: "Промо-ролики, анимированные логотипы и видео для соцсетей — движение, которое привлекает внимание.",
    },
  },
  {
    id: "3d",
    icon: "cube",
    title: {
      uz: "3D dizayn",
      en: "3D Design",
      ru: "3D-дизайн",
    },
    description: {
      uz: "Mahsulot renderi va 3D vizualizatsiya — mahsulotni suratga olishdan oldin ko'rsatish imkoni.",
      en: "Product renders and 3D visualisation — show the product before it is ever photographed.",
      ru: "Рендеры продукта и 3D-визуализация — показать продукт ещё до съёмки.",
    },
  },
];
