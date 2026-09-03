import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import BriefForm from "../../components/brief/BriefForm";

function Brief() {
  const { t } = useTranslation();

  return (
    <main className="mx-auto w-full max-w-[820px] px-5 py-16 text-white">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-neon"
      >
        <MdArrowBack /> {t("brief-back")}
      </Link>

      <span className="mt-8 mb-3 block h-1 w-12 rounded-full bg-neon" />
      <h1 className="text-2xl font-bold sm:text-3xl">{t("brief-title")}</h1>
      <p className="mt-2 max-w-xl text-[gray]">{t("brief-desc")}</p>

      <div className="glass mt-10 rounded-2xl p-6 sm:p-8">
        <BriefForm />
      </div>
    </main>
  );
}

export default Brief;
