/**
 * Izzatillo ishlagan brendlar. Logotiplar `public/brands/` ichida.
 * Yangi brend qo'shish: rasmni o'sha papkaga tashlab, shu massivga yozuv qo'shing.
 */
export type Brand = {
  name: string;
  logo: string;
};

export const brands: Brand[] = [
  { name: "Uzum", logo: "/brands/uzum.png" },
  { name: "Uzinfocom", logo: "/brands/uzinfocom.png" },
  { name: "My5", logo: "/brands/my5.webp" },
  {
    name: "New Uzbekistan University",
    logo: "/brands/new-uzbekistan-univer.png",
  },
  {
    name: "Smart Technology Systems",
    logo: "/brands/smart-technology-systems.png",
  },
  { name: "Safia", logo: "/brands/safia.png" },
  { name: "Arial", logo: "/brands/arial.png" },
  { name: "The Republic of Toys", logo: "/brands/the-republic-of-toys.png" },
  {
    name: "Ta'lim sifatini ta'minlash",
    logo: "/brands/talim-sifatini-taminlash.png",
  },
  { name: "Administratsiya", logo: "/brands/admistratsiya.webp" },
];
