"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { locales, type Locale } from "@/lib/i18n/config";

export function LanguageToggle() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-0.5 font-mono text-xs">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            l === locale
              ? "bg-chaos-cyan text-chaos-bg"
              : "text-white/60 hover:text-white"
          }`}
          aria-pressed={l === locale}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
