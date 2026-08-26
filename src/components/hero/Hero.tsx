import TiltCard from "../tiltCard/TiltCard";
import { useTranslation } from "react-i18next";
import person from "../../assets/person.jpg";

function Hero() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto flex w-full max-w-[1200px] items-center justify-around px-5 py-[120px] text-white">
      <div className="flex w-1/2 flex-col gap-5">
        <h1 className="w-[95%] text-[2.8rem] leading-[1.5] font-bold text-white">
          {t("hero-title")}{" "}
          <span className="relative inline-block text-neon after:pointer-events-none after:absolute after:top-1/2 after:-right-3 after:-left-[5px] after:h-[80%] after:-translate-y-1/2 after:rotate-[-6deg] after:rounded-[50%] after:border-2 after:border-white/90 after:content-['']">
            {t("designer")}
          </span>
        </h1>
        <p className="text-[gray]">{t("hero-desc")}</p>
        <div className="flex gap-5">
          <button className="glass relative my-5 h-[45px] w-[150px] overflow-hidden rounded-[10px] px-[25px] py-2.5 text-base text-white">
            {t("contact")}
          </button>
          <button className="glass relative my-5 h-[45px] w-[150px] overflow-hidden rounded-[10px] px-[25px] py-2.5 text-base text-white">
            Breaf
          </button>
        </div>
      </div>

      <div className="flex w-[30%] items-center justify-center gap-5">
        <TiltCard>
          <img
            src={person}
            alt=""
            className="h-[320px] w-[300px] object-cover"
          />
          <div className="tilt-text absolute top-4 left-4 rounded-full bg-black/35 px-3.5 py-2.5 backdrop-blur-[10px]">
            Jamolitdinov - Dizayner
          </div>
        </TiltCard>
      </div>
    </section>
  );
}

export default Hero;
