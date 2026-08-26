/**
 * Bento naqshi. Har 6 ta kartochka `lg` dagi 4 ustunli gridning 4x3 blokini
 * teshiksiz to'ldiradi:
 *
 *   1 1 2 2
 *   1 1 3 4
 *   5 5 6 6
 */
export type TileSize = "large" | "wide" | "small";

const BENTO_CYCLE: TileSize[] = [
  "large",
  "wide",
  "small",
  "small",
  "wide",
  "wide",
];

/** Naqsh to'liq tushishi uchun kamida shuncha kartochka kerak. */
export const BENTO_CYCLE_LENGTH = BENTO_CYCLE.length;

const TILE_CLASSES: Record<TileSize, string> = {
  // Tailwind klass nomlarini matn sifatida topishi uchun to'liq yozilgan
  large: "lg:col-span-2 lg:row-span-2",
  wide: "lg:col-span-2",
  small: "",
};

/**
 * Kartochkaning gridda egallaydigan o'lchami.
 *
 * Naqsh faqat to'liq oltiliklarga qo'llanadi. Qolgan "dumi" — masalan filtr
 * tanlanganda 2 tagina ish qolsa — keng plitkalarga aylanadi: aks holda
 * yarim tushgan naqsh gridning o'rtasida bo'shliq qoldiradi.
 */
export function getTileSize(index: number, total: number): TileSize {
  const patternedCount =
    Math.floor(total / BENTO_CYCLE_LENGTH) * BENTO_CYCLE_LENGTH;

  return index < patternedCount
    ? BENTO_CYCLE[index % BENTO_CYCLE_LENGTH]
    : "wide";
}

export function getTileClasses(size: TileSize): string {
  return TILE_CLASSES[size];
}
