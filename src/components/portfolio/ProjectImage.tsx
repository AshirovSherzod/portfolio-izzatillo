import { useState } from "react";
import { useTranslation } from "react-i18next";

type ProjectImageProps = {
  src?: string;
  alt: string;
  className?: string;
};

/**
 * Loyiha rasmi. Rasm hali qo'shilmagan yoki yo'l noto'g'ri bo'lsa,
 * layoutni buzmasdan placeholder ko'rsatadi.
 */
function ProjectImage({ src, alt, className = "" }: ProjectImageProps) {
  const { t } = useTranslation();

  // Qaysi yo'l yuklanmaganini saqlaymiz — shunda src o'zgarganda
  // holat o'z-o'zidan tiklanadi va effekt kerak bo'lmaydi.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const hasFailed = src !== undefined && failedSrc === src;

  if (!src || hasFailed) {
    return (
      <div
        className={`flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,163,0.14),transparent_60%)] ${className}`}
      >
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs tracking-wider text-white/35">
          {t("project-soon")}
        </span>
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
