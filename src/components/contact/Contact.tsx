import type { ComponentType } from "react";
import { useTranslation } from "react-i18next";
import { FaBehance, FaInstagram, FaTelegram } from "react-icons/fa6";
import { MdOutlineMail, MdOutlinePhone } from "react-icons/md";
import { contact, socials, type Social } from "../../data/contact";
import ContactForm from "./ContactForm";

const SOCIAL_ICONS: Record<
  Social["icon"],
  ComponentType<{ className?: string }>
> = {
  telegram: FaTelegram,
  instagram: FaInstagram,
  behance: FaBehance,
};

function Contact() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-[1200px] scroll-mt-28 px-5 py-16 text-white"
    >
      <span className="mb-3 block h-1 w-12 rounded-full bg-neon" />
      <h2 className="text-2xl font-bold sm:text-3xl">{t("contact-title")}</h2>
      <p className="mt-2 max-w-xl text-[gray]">{t("contact-desc")}</p>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="glass flex flex-col gap-6 rounded-2xl p-6 sm:p-8">
          <p className="text-sm tracking-[0.2em] text-white/35 uppercase">
            {t("contact-direct")}
          </p>

          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 hover:text-neon"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon/10 text-lg text-neon">
                <MdOutlineMail />
              </span>
              {contact.email}
            </a>

            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 hover:text-neon"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon/10 text-lg text-neon">
                <MdOutlinePhone />
              </span>
              {contact.phone}
            </a>
          </div>

          <ul className="mt-auto flex gap-3 pt-2">
            {socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon];
              return (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="glass flex h-11 w-11 items-center justify-center rounded-lg text-lg text-white/80 transition-colors hover:text-neon"
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default Contact;
