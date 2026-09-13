"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations("about");

  const statItems = [
    "Física",
    "Programación",
    "|Φ⟩ = Computación cuántica",
  ];

  return (
    <section id="about" className="section-shell">
      <p className="section-label">01 — /about</p>
      <h2 className="section-title">{t("title")}</h2>

      <div className="mt-10 grid gap-10 md:grid-cols-[1.5fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="space-y-5 text-sm leading-relaxed text-white/65 sm:text-base"
        >
          <p className="text-white/85">{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
          {statItems.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass flex items-center justify-center rounded-xl p-4 text-center md:text-left"
            >
              <div className="font-mono text-lg font-bold text-chaos-cyan">
                {s}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
