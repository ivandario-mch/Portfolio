"use client";

import { useTranslations } from "next-intl";
import { skills } from "@/data/skills";
import { SkillBar } from "@/components/ui/SkillBar";

export function Skills() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="section-shell">
      <p className="section-label">02 — /skills</p>
      <h2 className="section-title">{t("title")}</h2>
      <p className="mt-2 font-mono text-xs text-white/40">{t("subtitle")}</p>

      <div className="mt-10 grid gap-x-12 gap-y-7 sm:grid-cols-2">
        {skills.map((skill, i) => (
          <SkillBar key={skill.name} skill={skill} index={i} />
        ))}
      </div>
      <p className="mt-8 font-mono text-[11px] text-white/30">↳ {t("hint")}</p>
    </section>
  );
}
