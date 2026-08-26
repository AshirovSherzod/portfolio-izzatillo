import { useTranslation } from "react-i18next";
import type { Project } from "../../data/projects";
import { pickLocalized } from "../../lib/localized";
import ProjectImage from "./ProjectImage";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { t, i18n } = useTranslation();
  const title = pickLocalized(project.title, i18n.language);

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="glass group block overflow-hidden rounded-[10px] text-left transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon"
    >
      <ProjectImage
        src={project.cover}
        alt={title}
        category={project.category}
        className="h-[200px] w-full transition-transform duration-300 group-hover:scale-105"
      />

      <div className="flex items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-white">{title}</h3>
          <p className="text-sm text-neon/80">{t(`cat-${project.category}`)}</p>
        </div>
        {project.year && (
          <span className="shrink-0 text-sm text-white/40">{project.year}</span>
        )}
      </div>
    </button>
  );
}

export default ProjectCard;
