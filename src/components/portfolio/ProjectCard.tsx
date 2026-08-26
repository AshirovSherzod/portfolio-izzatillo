import { useTranslation } from "react-i18next";
import { MdArrowOutward } from "react-icons/md";
import type { Project } from "../../data/projects";
import { pickLocalized } from "../../lib/localized";
import ProjectImage from "./ProjectImage";

type ProjectCardProps = {
  project: Project;
  /** Katta plitka — ikki ustun va ikki qatorni egallaydi */
  isFeatured: boolean;
  /** Filtr almashganda paydo bo'lish animatsiyasini navbatlash uchun */
  index: number;
  onOpen: (project: Project) => void;
};

function ProjectCard({ project, isFeatured, index, onOpen }: ProjectCardProps) {
  const { t, i18n } = useTranslation();
  const title = pickLocalized(project.title, i18n.language);

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      className={`group animate-fade-up relative overflow-hidden rounded-xl border border-white/10 bg-ink/60 text-left transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-neon/40 hover:shadow-[0_18px_45px_rgba(0,0,0,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon ${
        isFeatured ? "sm:col-span-2 sm:row-span-2" : ""
      }`}
    >
      <ProjectImage
        src={project.cover}
        alt={title}
        className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.06]"
      />

      {/* Matn o'qilishi uchun pastdan yuqoriga qorayadigan qatlam */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-colors duration-300 group-hover:from-black/90" />

      <span className="absolute top-3 left-3 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[11px] text-white/85 backdrop-blur-sm">
        {t(`cat-${project.category}`)}
      </span>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3
            className={`truncate font-semibold text-white transition-colors group-hover:text-neon ${
              isFeatured ? "sm:text-xl" : ""
            }`}
          >
            {title}
          </h3>
          {project.year && (
            <span className="text-sm text-white/45">{project.year}</span>
          )}
        </div>

        <span className="flex h-9 w-9 shrink-0 translate-y-2 items-center justify-center rounded-full bg-neon text-ink opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <MdArrowOutward />
        </span>
      </div>
    </button>
  );
}

export default ProjectCard;
