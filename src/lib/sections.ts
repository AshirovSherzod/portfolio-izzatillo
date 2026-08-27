/** Bosh sahifadagi bo'limlar — Header navigatsiyasi shu ro'yxatdan yasaladi. */
export const SECTIONS = [
  "home",
  "about",
  "services",
  "portfolio",
  "contact",
] as const;

export type SectionId = (typeof SECTIONS)[number];

export function scrollToSection(id: SectionId) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

/**
 * Boshqa sahifadan bosh sahifadagi bo'limga o'tish uchun "niyat".
 * Router state o'rniga oddiy modul o'zgaruvchisi ishlatilgan: router state
 * o'zgarishi ScrollManager effektini qayta ishga tushirib, scroll'ni buzardi.
 */
let pendingSection: SectionId | null = null;

export function setPendingSection(id: SectionId) {
  pendingSection = id;
}

/** Niyatni o'qiydi va darhol tozalaydi — bir marta ishlaydi. */
export function consumePendingSection(): SectionId | null {
  const id = pendingSection;
  pendingSection = null;
  return id;
}
