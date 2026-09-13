"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const EMAIL = "ivandariomch@gmail.com";
const GITHUB = "https://github.com/ivandario-mch";

export function Contact() {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="section-shell">
      <p className="section-label">06 — /contact</p>
      <h2 className="section-title">{t("title")}</h2>
      <p className="mt-2 font-mono text-xs text-white/40">{t("subtitle")}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onClick={copyEmail}
          className="glass group flex items-center justify-between rounded-2xl p-6 text-left transition-colors hover:border-chaos-cyan/40"
        >
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-white/40">
              {t("email")}
            </div>
            <div className="mt-1 font-mono text-sm text-white">{EMAIL}</div>
          </div>
          <span className="font-mono text-xs text-chaos-cyan">
            {copied ? `✓ ${t("copied")}` : t("copy")}
          </span>
        </motion.button>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          href={GITHUB}
          target="_blank"
          rel="noreferrer"
          className="glass group flex items-center justify-between rounded-2xl p-6 transition-colors hover:border-chaos-magenta/40"
        >
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-white/40">
              {t("github")}
            </div>
            <div className="mt-1 font-mono text-sm text-white">
              @ivandario-mch
            </div>
          </div>
          <span className="text-chaos-magenta transition-transform group-hover:translate-x-1">
            →
          </span>
        </motion.a>
      </div>
    </section>
  );
}
