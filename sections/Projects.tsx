import { getTranslations } from "next-intl/server";
import { getProjects } from "@/lib/github";
import { ProjectsGrid } from "./ProjectsGrid";

export async function Projects() {
  const t = await getTranslations("projects");
  const projects = await getProjects();

  return (
    <section id="projects" className="section-shell">
      <p className="section-label">03 — /projects</p>
      <h2 className="section-title">{t("title")}</h2>
      <p className="mt-2 font-mono text-xs text-white/40">{t("subtitle")}</p>

      <ProjectsGrid projects={projects} />
    </section>
  );
}
