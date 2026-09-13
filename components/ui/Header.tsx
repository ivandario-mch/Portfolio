"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

const SECTIONS = ["about", "skills", "projects", "stack", "terminal", "contact"] as const;

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/5 bg-chaos-bg/70 backdrop-blur-xl" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-1.5 font-mono text-sm">
          <span className="text-white/80 group-hover:text-white">ivan.sh</span>
          <span className="animate-blink text-chaos-cyan">_</span>
        </a>

        <div className="hidden items-center gap-6 font-mono text-xs text-white/50 md:flex">
          {SECTIONS.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="transition-colors hover:text-chaos-cyan"
            >
              {t(s)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
        </div>
      </nav>
    </header>
  );
}
