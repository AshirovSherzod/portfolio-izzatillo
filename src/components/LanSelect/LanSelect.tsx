import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiGlobe } from "react-icons/fi";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import ReactCountryFlag from "react-country-flag";
import type { Language } from "../../i18n";

const LANGUAGES: { code: Language; countryCode: string; label: string }[] = [
  { code: "uz", countryCode: "UZ", label: "UZ" },
  { code: "en", countryCode: "GB", label: "EN" },
  { code: "ru", countryCode: "RU", label: "RU" },
];

export function LanSelect() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const changeLang = (lang: Language) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    setOpen(false);
  };

  return (
    <div>
      <div
        className="glass relative flex h-10 w-[120px] cursor-pointer items-center justify-center rounded-lg p-1.5"
        onClick={() => setOpen(!open)}
      >
        <div className="flex h-full w-full items-center justify-between rounded-[5px] border border-white/[0.16] bg-ink/60 text-sm text-white">
          <span className="ml-2.5 flex items-center justify-center text-base">
            <FiGlobe />
          </span>
          {i18n.language.toUpperCase()}

          {open && (
            <div className="absolute top-[45px] left-0 w-[120px] cursor-pointer rounded-lg bg-black/70 p-[5px]">
              {LANGUAGES.map(({ code, countryCode, label }) => (
                <div
                  key={code}
                  onClick={() => changeLang(code)}
                  className="flex items-center gap-2.5 rounded-[5px] p-[5px] text-white/90 hover:bg-neon/15 hover:text-white active:bg-neon/10"
                >
                  <span className="flex items-center justify-center">
                    <ReactCountryFlag
                      countryCode={countryCode}
                      svg
                      style={{
                        width: "22px",
                        height: "18px",
                        borderRadius: "4px",
                      }}
                    />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          )}

          <div className="flex h-full w-1/4 items-center justify-center border-l border-white/[0.16] text-lg transition-all duration-300">
            {open ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </div>
        </div>
      </div>
    </div>
  );
}
