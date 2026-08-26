import logo from "../../assets/jd-logo.svg";
import { useTranslation } from "react-i18next";
import { LanSelect } from "../LanSelect/LanSelect";

function Header() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto w-full max-w-[1200px] px-5">
      <header className="glass relative mx-auto my-5 flex w-full items-center justify-between rounded-[10px] px-[25px] py-2.5">
        <div className="flex items-center gap-[25px]">
          <div className="h-[50px] w-[50px]">
            <img src={logo} alt="" className="h-full w-full" />
          </div>
          <ul className="flex gap-5 text-white">
            <li>{t("home")}</li>
            <li>{t("about")}</li>
            <li>{t("services")}</li>
            <li>{t("portfolio")}</li>
            <li>{t("contact")}</li>
          </ul>
        </div>
        <div className="flex items-center gap-5">
          <LanSelect />
          <button className="glass h-10 w-[120px] rounded-[10px] text-white transition-transform duration-100 active:scale-95">
            Breaf
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
