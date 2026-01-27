import React from "react";
import "./header.css";
import logo from "../../assets/jd-logo.svg";
import { useTranslation } from "react-i18next";
import { LanSelect } from "../LanSelect/LanSelect";

function Header() {
  const { t } = useTranslation();
  return (
    <div className="container">
      <header className="header">
        <div className="header-left">
          <div className="header-left__logo">
            <img src={logo} alt="" />
          </div>
          <ul>
            <li>{t("home")}</li>
            <li>{t("about")}</li>
            <li>{t("services")}</li>
            <li>{t("portfolio")}</li>
            <li>{t("contact")}</li>
          </ul>
        </div>
        <div className="header-right">
          <LanSelect />
          <button className="glass-effect">Breaf</button>
        </div>
      </header>
    </div>
  );
}

export default Header;
