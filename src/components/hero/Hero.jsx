import "./hero.css";
import TiltCard from "../tiltCard/TiltCard";
import { useTranslation } from "react-i18next";
import person from "../../assets/person.jpg";

function Hero() {
  const { t } = useTranslation();
  return (
    <>
      <section className="hero container">
        <div className="hero-left">
          <h1>
            {t("hero-title")} <span class="highlight">{t("designer")}</span>
          </h1>
          <p>{t("hero-desc")}</p>
          <div className="hero-btns">
            <button>{t("contact")}</button>
            <button>Breaf</button>
          </div>
        </div>
        <div className="hero-right">
          <TiltCard className="card">
            <img
              src={person}
              alt=""
              style={{ width: 300, height: 320, objectFit: "cover" }}
            />
            <div className="tilt-text">Jamolitdinov - Dizayner</div>
          </TiltCard>
        </div>
      </section>
    </>
  );
}

export default Hero;
