import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { ProjectCategory } from "../../data/projects";

type ProjectImageProps = {
  src?: string;
  alt: string;
  category: ProjectCategory;
  className?: string;
};

/**
 * Loyiha rasmi. Rasm hali qo'shilmagan yoki yo'l noto'g'ri bo'lsa,
 * layoutni buzmasdan placeholder ko'rsatadi.
 */
function ProjectImage({
  src,
  alt,
  category,
  className = "",
}: ProjectImageProps) {
  const { t } = useTranslation();

  // Qaysi yo'l yuklanmaganini saqlaymiz — shunda src o'zgarganda
  // holat o'z-o'zidan tiklanadi va effekt kerak bo'lmaydi.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const hasFailed = src !== undefined && failedSrc === src;

  if (!src || hasFailed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-neon/10 to-transparent text-center ${className}`}
      >
        <span className="text-xs tracking-[0.2em] text-neon/70 uppercase">
          {t(`cat-${category}`)}
        </span>
        <span className="text-sm text-white/40">{t("project-soon")}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailedSrc(src)}
      className={`object-cover ${className}`}
    />
  );
}

export default ProjectImage;
