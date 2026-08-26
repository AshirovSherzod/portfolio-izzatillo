import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdClose, MdOpenInNew } from "react-icons/md";
import type { Project } from "../../data/projects";
import { pickLocalized } from "../../lib/localized";
import { useDismiss } from "../../hooks/useDismiss";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import ProjectImage from "./ProjectImage";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t, i18n } = useTranslation();
  const title = pickLocalized(project.title, i18n.language);

  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const gallery = [project.cover, ...(project.images ?? [])].filter(
    (src): src is string => Boolean(src),
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useDismiss(panelRef, true, onClose);
  useBodyScrollLock(true);

  // Ochilganda fokusni modalga olamiz, yopilganda avvalgi elementga qaytaramiz
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => previouslyFocused?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="glass my-auto w-full max-w-3xl rounded-[10px] p-4 text-white sm:p-6"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3
              id="project-modal-title"
              className="text-xl font-bold sm:text-2xl"
            >
              {title}
            </h3>
            <p className="text-sm text-neon/80">
              {t(`cat-${project.category}`)}
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="glass flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg active:scale-95"
          >
            <MdClose />
          </button>
        </div>

        <ProjectImage
          src={gallery[activeIndex]}
          alt={title}
          category={project.category}
          className="h-[240px] w-full rounded-lg sm:h-[380px]"
        />

        {gallery.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {gallery.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`${title} — ${index + 1}`}
                className={`h-16 w-20 shrink-0 overflow-hidden rounded-md border-2 ${
                  index === activeIndex ? "border-neon" : "border-transparent"
                }`}
              >
                <ProjectImage
                  src={src}
                  alt=""
                  category={project.category}
                  className="h-full w-full"
                />
              </button>
            ))}
          </div>
        )}

        {(project.client || project.year || project.link) && (
          <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
            {project.client && (
              <div>
                <span className="block text-xs text-white/40">
                  {t("project-client")}
                </span>
                {project.client}
              </div>
            )}
            {project.year && (
              <div>
                <span className="block text-xs text-white/40">
                  {t("project-year")}
                </span>
                {project.year}
              </div>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="glass ml-auto flex h-10 items-center gap-2 rounded-[10px] px-4 hover:text-neon"
              >
                {t("project-link")} <MdOpenInNew />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectModal;
