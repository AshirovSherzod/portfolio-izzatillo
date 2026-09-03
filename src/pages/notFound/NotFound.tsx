import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function NotFound() {
  const { t } = useTranslation();

  return (
    <main className="mx-auto flex w-full max-w-[820px] flex-col items-center px-5 py-24 text-center text-white">
      <p className="text-6xl font-bold text-neon sm:text-7xl">404</p>
      <h1 className="mt-6 text-2xl font-bold sm:text-3xl">
        {t("notfound-title")}
      </h1>
      <p className="mt-2 max-w-md text-[gray]">{t("notfound-desc")}</p>

      <Link
        to="/"
        className="glass mt-8 flex h-11 items-center rounded-[10px] px-6 text-white transition-transform duration-100 active:scale-[0.98]"
      >
        {t("notfound-home")}
      </Link>
    </main>
  );
}

export default NotFound;
