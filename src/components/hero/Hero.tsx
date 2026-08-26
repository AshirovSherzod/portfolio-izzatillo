import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TiltCard from "../tiltCard/TiltCard";
import person from "../../assets/person.jpg";
import { useSectionNav } from "../../hooks/useSectionNav";

function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToSection = useSectionNav();

  return (
    <section
      id="home"
      className="mx-auto flex w-full max-w-[1200px] scroll-mt-28 flex-col items-center gap-12 px-5 py-16 text-white lg:flex-row lg:justify-around lg:gap-8 lg:py-[120px]"
    >
      <div className="flex w-full flex-col gap-5 lg:w-1/2">
        <h1 className="text-3xl leading-[1.4] font-bold text-white sm:text-4xl lg:w-[95%] lg:text-[2.8rem] lg:leading-[1.5]">
          {t("hero-title")}{" "}
          <span className="relative inline-block text-neon after:pointer-events-none after:absolute after:top-1/2 after:-right-3 after:-left-[5px] after:h-[80%] after:-translate-y-1/2 after:rotate-[-6deg] after:rounded-[50%] after:border-2 after:border-white/90 after:content-['']">
            {t("designer")}
          </span>
        </h1>

        <p className="text-[gray]">{t("hero-desc")}</p>

        <div className="mt-2 flex flex-wrap gap-4 sm:gap-5">
          <button
            onClick={() => goToSection("contact")}
            className="glass h-[45px] w-[140px] rounded-[10px] text-base text-white transition-transform duration-100 active:scale-95 sm:w-[150px]"
          >
            {t("contact")}
          </button>
          <button
            onClick={() => navigate("/brief")}
            className="glass h-[45px] w-[140px] rounded-[10px] text-base text-white transition-transform duration-100 active:scale-95 sm:w-[150px]"
          >
            {t("brief")}
          </button>
        </div>
      </div>

      <div className="flex w-full justify-center lg:w-[30%]">
        <TiltCard className="w-full max-w-[300px]">
          <img
            src={person}
            alt="Jamolitdinov Izzatillo"
            className="h-[280px] w-full object-cover sm:h-[320px]"
          />
          <div className="tilt-text absolute top-4 left-4 rounded-full bg-black/35 px-3.5 py-2.5 text-sm backdrop-blur-[10px]">
            Jamolitdinov - Dizayner
          </div>
        </TiltCard>
      </div>
    </section>
  );
}

export default Hero;
