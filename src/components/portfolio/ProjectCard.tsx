import { useTranslation } from "react-i18next";
import { MdArrowOutward } from "react-icons/md";
import type { Project } from "../../data/projects";
import { pickLocalized } from "../../lib/localized";
import ProjectImage from "./ProjectImage";
import { getTileClasses, type TileSize } from "./bento";

type ProjectCardProps = {
  project: Project;
  /** Tartib raqami — kartochkadagi "01" va animatsiya navbati uchun */
  index: number;
  size: TileSize;
  onOpen: (project: Project) => void;
};

const TITLE_SIZES: Record<TileSize, string> = {
  large: "lg:text-2xl",
  wide: "lg:text-lg",
  small: "",
};

function ProjectCard({ project, index, size, onOpen }: ProjectCardProps) {
  const { t, i18n } = useTranslation();
  const title = pickLocalized(project.title, i18n.language);
  const number = String(index + 1).padStart(2, "0");

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
      className={`group animate-fade-up relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/10 bg-ink/60 text-left transition-[border-color,box-shadow] duration-400 hover:border-neon/50 hover:shadow-[0_24px_60px_rgba(0,0,0,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon lg:aspect-auto lg:h-full ${getTileClasses(size)}`}
    >
      <ProjectImage
        src={project.cover}
        alt={title}
        className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-108"
      />

      {/* Matn o'qilishi uchun pastdan yuqoriga qorayadigan qatlam */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-400 group-hover:from-black/95" />

      <span className="absolute top-4 left-4 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[11px] text-white/85 backdrop-blur-sm">
        {t(`cat-${project.category}`)}
      </span>

      <span className="absolute top-3 right-4 text-3xl font-bold text-white/10 transition-colors duration-400 group-hover:text-neon/30">
        {number}
      </span>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div className="min-w-0">
          <h3
            className={`truncate font-semibold text-white transition-colors duration-300 group-hover:text-neon ${TITLE_SIZES[size]}`}
          >
            {title}
          </h3>
          {/* Hoverda sarlavha ostida o'sib chiqadigan neon chiziq */}
          <span className="mt-1 block h-px w-0 bg-neon transition-[width] duration-500 group-hover:w-10" />
          {project.year && (
            <span className="mt-1 block text-sm text-white/45">
              {project.year}
            </span>
          )}
        </div>

        <span className="flex h-10 w-10 shrink-0 translate-y-3 items-center justify-center rounded-full bg-neon text-lg text-ink opacity-0 transition-[opacity,transform] duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          <MdArrowOutward />
        </span>
      </div>
    </button>
  );
}

export default ProjectCard;
