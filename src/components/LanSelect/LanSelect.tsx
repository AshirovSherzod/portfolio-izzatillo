import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiGlobe } from "react-icons/fi";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import ReactCountryFlag from "react-country-flag";
import { LANGUAGE_STORAGE_KEY, type Language } from "../../i18n";
import { useDismiss } from "../../hooks/useDismiss";

const LANGUAGES: { code: Language; countryCode: string; label: string }[] = [
  { code: "uz", countryCode: "UZ", label: "UZ" },
  { code: "en", countryCode: "GB", label: "EN" },
  { code: "ru", countryCode: "RU", label: "RU" },
];

export function LanSelect() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);
  useDismiss(containerRef, isOpen, close);

  const changeLang = (lang: Language) => {
    i18n.changeLanguage(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // localStorage yopiq bo'lsa ham til almashaveradi
    }
    close();
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="glass flex h-10 w-[86px] cursor-pointer items-center justify-center rounded-lg p-1.5 sm:w-[120px]"
      >
        <span className="flex h-full w-full items-center justify-between rounded-[5px] border border-white/[0.16] bg-ink/60 text-sm text-white">
          <span className="ml-2 flex items-center justify-center text-base sm:ml-2.5">
            <FiGlobe />
          </span>
          {i18n.language.slice(0, 2).toUpperCase()}
          <span className="flex h-full w-1/4 items-center justify-center border-l border-white/[0.16] text-lg">
            {isOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </span>
        </span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute top-[45px] left-0 z-10 w-[120px] rounded-lg bg-black/70 p-[5px] backdrop-blur-md"
        >
          {LANGUAGES.map(({ code, countryCode, label }) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={i18n.language.startsWith(code)}
                onClick={() => changeLang(code)}
                className="flex w-full cursor-pointer items-center gap-2.5 rounded-[5px] p-[5px] text-white/90 hover:bg-neon/15 hover:text-white active:bg-neon/10"
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
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
