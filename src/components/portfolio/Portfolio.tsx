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

/** Har beshinchi plitka katta bo'ladi — grid bir xil qutilar bo'lib qolmaydi. */
const FEATURED_EVERY = 5;

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
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="mb-3 block h-1 w-12 rounded-full bg-neon" />
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t("portfolio-title")}
          </h2>
          <p className="mt-2 text-[gray]">{t("portfolio-desc")}</p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
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
                    ? "bg-neon font-medium text-ink shadow-[0_0_20px_rgba(0,255,163,0.35)]"
                    : "glass text-white/70 hover:text-white"
                }`}
              >
                {value === "all" ? t("filter-all") : t(`cat-${value}`)}
              </button>
            );
          })}
        </div>
      </div>

      {visibleProjects.length === 0 ? (
        <p className="mt-14 text-center text-white/40">
          {t("portfolio-empty")}
        </p>
      ) : (
        <div
          // filter o'zgarganda grid qayta yig'iladi va animatsiya boshidan ketadi
          key={filter}
          className="mt-8 grid auto-rows-[240px] grid-flow-row-dense grid-cols-1 gap-4 sm:auto-rows-[190px] sm:grid-cols-2 lg:auto-rows-[200px] lg:grid-cols-3"
        >
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isFeatured={project.featured ?? index % FEATURED_EVERY === 0}
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
