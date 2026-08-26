import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MdClose, MdMenu } from "react-icons/md";
import logo from "../../assets/jd-logo.svg";
import { LanSelect } from "../LanSelect/LanSelect";
import { useDismiss } from "../../hooks/useDismiss";
import { useSectionNav } from "../../hooks/useSectionNav";
import { SECTIONS, type SectionId } from "../../lib/sections";

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToSection = useSectionNav();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  useDismiss(headerRef, isMenuOpen, closeMenu);

  const handleSectionClick = (id: SectionId) => {
    closeMenu();
    goToSection(id);
  };

  const handleBriefClick = () => {
    closeMenu();
    navigate("/brief");
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="mx-auto w-full max-w-[1200px] px-5">
        <header
          ref={headerRef}
          className="glass my-5 rounded-[10px] px-4 py-2.5 sm:px-[25px]"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-6 lg:gap-[25px]">
              <a
                href="/"
                onClick={(event) => {
                  event.preventDefault();
                  handleSectionClick("home");
                }}
                className="block h-10 w-10 shrink-0 sm:h-[50px] sm:w-[50px]"
              >
                <img
                  src={logo}
                  alt="Jamolitdinov Izzatillo"
                  className="h-full w-full"
                />
              </a>

              <ul className="hidden gap-5 text-white lg:flex">
                {SECTIONS.map((id) => (
                  <li key={id}>
                    <a
                      href={`/#${id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        handleSectionClick(id);
                      }}
                      className="hover:text-neon"
                    >
                      {t(id)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 sm:gap-5">
              <LanSelect />

              <button
                onClick={handleBriefClick}
                className="glass hidden h-10 w-[120px] rounded-[10px] text-white transition-transform duration-100 active:scale-95 lg:block"
              >
                {t("brief")}
              </button>

              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-label={t("menu")}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                className="glass flex h-10 w-10 items-center justify-center rounded-[10px] text-xl text-white active:scale-95 lg:hidden"
              >
                {isMenuOpen ? <MdClose /> : <MdMenu />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <nav
              id="mobile-menu"
              className="mt-4 border-t border-white/[0.16] pt-4 lg:hidden"
            >
              <ul className="flex flex-col gap-1 text-white">
                {SECTIONS.map((id) => (
                  <li key={id}>
                    <a
                      href={`/#${id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        handleSectionClick(id);
                      }}
                      className="block rounded-lg px-3 py-2.5 hover:bg-neon/15 hover:text-neon"
                    >
                      {t(id)}
                    </a>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleBriefClick}
                className="glass mt-3 h-10 w-full rounded-[10px] text-white active:scale-[0.98]"
              >
                {t("brief")}
              </button>
            </nav>
          )}
        </header>
      </div>
    </div>
  );
}

export default Header;
