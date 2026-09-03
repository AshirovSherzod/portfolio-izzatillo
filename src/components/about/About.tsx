import { useTranslation } from "react-i18next";
import TiltCard from "../tiltCard/TiltCard";
import person from "../../assets/person.jpg";
import { MdOutlineFileDownload } from "react-icons/md";
import { resumeUrl } from "../../data/contact";

function About() {
  const { t } = useTranslation();

  return (
    <div id="about" className="mx-auto w-full max-w-[1200px] scroll-mt-28 px-5">
      <section className="glass flex flex-col gap-8 rounded-[10px] p-5 text-white sm:p-[25px] lg:flex-row lg:gap-5">
        <div className="flex w-full justify-center lg:w-1/2">
          <TiltCard className="w-full max-w-[300px]">
            <img
              src={person}
              alt="Jamolitdinov Izzatillo"
              className="h-[280px] w-full object-cover sm:h-[320px]"
            />
            <div className="tilt-text absolute top-4 left-4 rounded-full bg-black/35 px-3.5 py-2.5 text-sm backdrop-blur-[10px]">
              {t("about-badge")}
            </div>
          </TiltCard>
        </div>

        <div className="flex w-full flex-col gap-5 lg:w-1/2">
          <h2 className="text-2xl font-bold">Jamolitdinov Izzatillo</h2>
          <p>{t("about-p1")}</p>
          <p>{t("about-p2")}</p>

          {/* PDF hali qo'yilmagan bo'lsa, ishlamaydigan tugma ko'rsatilmaydi */}
          {resumeUrl && (
            <a
              href={resumeUrl}
              download
              className="glass flex h-[35px] w-[170px] items-center justify-center gap-2.5 rounded-[10px] text-white transition-transform duration-100 active:scale-[0.98]"
            >
              <MdOutlineFileDownload /> {t("about-resume")}
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

export default About;
