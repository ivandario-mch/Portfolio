import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 font-mono text-xs text-white/35 sm:flex-row sm:px-8">
        <span>
          λ = 10(σ) · 28(ρ) · 8/3(β) — {t("built")}
        </span>
        <span>
          © {new Date().getFullYear()} Iván · {t("rights")}
        </span>
      </div>
    </footer>
  );
}
