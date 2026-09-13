import { useTranslations } from "next-intl";
import { Terminal } from "@/components/ui/Terminal";

export function TerminalSection() {
  const t = useTranslations("terminal");
  return (
    <section id="terminal" className="section-shell">
      <p className="section-label">05 — /terminal</p>
      <h2 className="section-title">{t("title")}</h2>
      <p className="mt-2 mb-10 font-mono text-xs text-white/40">
        {t("subtitle")}
      </p>
      <Terminal />
    </section>
  );
}
