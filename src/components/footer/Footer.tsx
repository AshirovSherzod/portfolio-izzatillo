import type { ComponentType } from "react";
import { useTranslation } from "react-i18next";
import { FaBehance, FaInstagram, FaTelegram } from "react-icons/fa6";
import logo from "../../assets/jd-logo.svg";
import { contact, socials, type Social } from "../../data/contact";
import { SECTIONS } from "../../lib/sections";
import { useSectionNav } from "../../hooks/useSectionNav";

const SOCIAL_ICONS: Record<
  Social["icon"],
  ComponentType<{ className?: string }>
> = {
  telegram: FaTelegram,
  instagram: FaInstagram,
  behance: FaBehance,
};

function Footer() {
  const { t } = useTranslation();
  const goToSection = useSectionNav();

  return (
    <footer className="mx-auto w-full max-w-[1200px] px-5 pt-10 pb-8 text-white">
      <div className="glass rounded-[10px] p-6 sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <img
              src={logo}
              alt="Jamolitdinov Izzatillo"
              className="h-12 w-12"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              {t("hero-title")} {t("designer")}. {t("hero-desc")}.
            </p>
          </div>

          <nav aria-label={t("menu")}>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-1">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <a
                    href={`/#${id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      goToSection(id);
                    }}
                    className="text-white/70 hover:text-neon"
                  >
                    {t(id)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 text-sm">
            <a
              href={`mailto:${contact.email}`}
              className="text-white/70 hover:text-neon"
            >
              {contact.email}
            </a>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="text-white/70 hover:text-neon"
            >
              {contact.phone}
            </a>

            <ul className="mt-2 flex gap-3">
              {socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="glass flex h-10 w-10 items-center justify-center rounded-lg text-lg text-white/80 transition-colors hover:text-neon"
                    >
                      <Icon />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/[0.12] pt-5 text-center text-xs text-white/35">
          © {new Date().getFullYear()} Jamolitdinov Izzatillo
        </div>
      </div>
    </footer>
  );
}

export default Footer;
