"use client";

import type { ProjectMeta } from "@/lib/github";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function ProjectsGrid({ projects }: { projects: ProjectMeta[] }) {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2">
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}
