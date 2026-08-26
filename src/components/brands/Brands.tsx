import { useTranslation } from "react-i18next";
import { brands } from "../../data/brands";

function Brands() {
  const { t } = useTranslation();

  return (
    <section
      id="brands"
      aria-label={t("brands-title")}
      className="mx-auto w-full max-w-[1200px] px-5 py-10"
    >
      <p className="text-center text-sm tracking-[0.2em] text-white/35 uppercase">
        {t("brands-title")}
      </p>

      {/*
        Chekkalarda logotiplar sekin so'nadi — lenta kesilgandek emas,
        oqib kirayotgandek ko'rinadi.
      */}
      <div className="marquee mt-8">
        <div className="marquee-track">
          {/* Ro'yxat ikki marta chiziladi: uzluksiz aylanish uchun */}
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="marquee-group"
              aria-hidden={copy === 1 || undefined}
            >
              {brands.map((brand) => (
                <li key={brand.name} className="shrink-0">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    loading="lazy"
                    className="h-10 w-auto opacity-45 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-12"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Brands;
