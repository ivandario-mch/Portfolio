"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center px-5 pt-24"
    >
      <div className="content-scrim relative z-10 mx-auto max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-scrim font-mono text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl"
        >
          {t("greeting")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-scrim mt-4 font-mono text-sm text-chaos-cyan sm:text-base"
        >
          {t("role")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-scrim mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base"
        >
          {t("tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-9 flex items-center justify-center"
        >
          <a
            href="#projects"
            className="w-full rounded-full bg-chaos-cyan px-7 py-3 font-mono text-sm font-semibold text-chaos-bg transition-transform hover:scale-[1.03] sm:w-auto"
          >
            {t("cta")} →
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center font-mono text-[11px] text-white/30">
        <div className="mx-auto mb-2 h-10 w-px animate-pulse bg-gradient-to-b from-chaos-cyan to-transparent" />
        {t("scroll")}
      </div>
    </section>
  );
}
