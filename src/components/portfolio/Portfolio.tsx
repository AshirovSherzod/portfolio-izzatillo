import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  PROJECT_CATEGORIES,
  projects,
  type Project,
  type ProjectCategory,
} from "../../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

type Filter = ProjectCategory | "all";

const FILTERS: Filter[] = ["all", ...PROJECT_CATEGORIES];

function Portfolio() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>("all");
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const visibleProjects = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  return (
    <section
      id="portfolio"
      className="mx-auto w-full max-w-[1200px] scroll-mt-28 px-5 py-16 text-white"
    >
      <h2 className="text-2xl font-bold sm:text-3xl">{t("portfolio-title")}</h2>
      <p className="mt-2 text-[gray]">{t("portfolio-desc")}</p>

      <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
        {FILTERS.map((value) => {
          const isActive = value === filter;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              aria-pressed={isActive}
              className={`h-9 rounded-full px-4 text-sm transition-colors ${
                isActive
                  ? "bg-neon font-medium text-ink"
                  : "glass text-white/80 hover:text-white"
              }`}
            >
              {value === "all" ? t("filter-all") : t(`cat-${value}`)}
            </button>
          );
        })}
      </div>

      {visibleProjects.length === 0 ? (
        <p className="mt-10 text-center text-white/40">
          {t("portfolio-empty")}
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={setOpenProject}
            />
          ))}
        </div>
      )}

      {openProject && (
        <ProjectModal
          project={openProject}
          onClose={() => setOpenProject(null)}
        />
      )}
    </section>
  );
}

export default Portfolio;
