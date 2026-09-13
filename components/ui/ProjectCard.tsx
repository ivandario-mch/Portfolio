"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import type { ProjectMeta } from "@/lib/github";
import type { Locale } from "@/lib/i18n/config";

export function ProjectCard({
  project,
  index,
}: {
  project: ProjectMeta;
  index: number;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("projects");

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-colors hover:border-white/20"
      style={{ borderColor: "rgba(255,255,255,0.1)" }}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: project.accent }}
      />
      <div className="flex items-start justify-between">
        <span
          className="rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider"
          style={{
            borderColor: `${project.accent}55`,
            color: project.accent,
          }}
        >
          {project.language}
        </span>
      </div>

      <h3 className="mt-5 font-mono text-lg font-semibold text-white">
        {project.name}
      </h3>
      <p className="mt-1 font-mono text-xs text-white/40">{project.tag[locale]}</p>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-white/65">
        {project.description[locale]}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 font-mono text-xs">
        <span className="flex items-center gap-1 text-white/40">
          ★ {project.stars} {t("stars")}
        </span>
        <span
          className="flex items-center gap-1 transition-transform group-hover:translate-x-1"
          style={{ color: project.accent }}
        >
          {t("viewOn")} →
        </span>
      </div>
    </motion.a>
  );
}
