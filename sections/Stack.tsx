"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { stack } from "@/data/skills";

export function Stack() {
  const t = useTranslations("stack");

  return (
    <section id="stack" className="section-shell">
      <p className="section-label">04 — /stack</p>
      <h2 className="section-title">{t("title")}</h2>
      <p className="mt-2 font-mono text-xs text-white/40">{t("subtitle")}</p>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.04 } },
        }}
        className="mt-10 flex flex-wrap gap-2.5"
      >
        {stack.map((item) => (
          <motion.span
            key={item}
            variants={{
              hidden: { opacity: 0, scale: 0.85 },
              show: { opacity: 1, scale: 1 },
            }}
            whileHover={{ y: -3, scale: 1.06 }}
            className="cursor-default rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 font-mono text-sm text-white/70 transition-colors hover:border-chaos-cyan/50 hover:text-chaos-cyan"
          >
            {item}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
