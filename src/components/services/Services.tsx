import type { ComponentType } from "react";
import { useTranslation } from "react-i18next";
import {
  MdOutlineDevices,
  MdOutlineMovie,
  MdOutlinePalette,
  MdOutlineViewInAr,
} from "react-icons/md";
import { services, type Service } from "../../data/services";
import { pickLocalized } from "../../lib/localized";

const ICONS: Record<Service["icon"], ComponentType<{ className?: string }>> = {
  palette: MdOutlinePalette,
  devices: MdOutlineDevices,
  movie: MdOutlineMovie,
  cube: MdOutlineViewInAr,
};

function Services() {
  const { t, i18n } = useTranslation();

  return (
    <section
      id="services"
      className="mx-auto w-full max-w-[1200px] scroll-mt-28 px-5 py-16 text-white"
    >
      <span className="mb-3 block h-1 w-12 rounded-full bg-neon" />
      <h2 className="text-2xl font-bold sm:text-3xl">{t("services-title")}</h2>
      <p className="mt-2 text-[gray]">{t("services-desc")}</p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => {
          const Icon = ICONS[service.icon];

          return (
            <article
              key={service.id}
              style={{ animationDelay: `${index * 70}ms` }}
              className="group animate-fade-up glass flex flex-col gap-4 rounded-2xl p-6 transition-colors duration-300 hover:border-neon/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon/10 text-2xl text-neon transition-colors duration-300 group-hover:bg-neon group-hover:text-ink">
                <Icon />
              </span>

              <h3 className="font-semibold">
                {pickLocalized(service.title, i18n.language)}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">
                {pickLocalized(service.description, i18n.language)}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Services;
