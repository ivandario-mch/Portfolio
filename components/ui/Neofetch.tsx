"use client";

import { useTranslations } from "next-intl";
import { stack, system } from "@/data/skills";

const HEADER = `      █ ███░ ██  ██████▒▄▄▄█████▓ ██   
      █ ▓██░ ██▒▓██   ▒ ▓  ██▒ ▓▒  ▒▒  
 ▗█▙▄▌█ ▒██▀▀██░▒████ ░ ▒ ▓██░ ▒░   ░░ 
 ▝ ▝▀ █ ░▓█ ░██ ░▓█▒  ░ ░ ▓██▓ ░   ░░  
 ▒ ░░ █ ░▓█▒░██▓░▒█░      ▒██▒ ░  ░░   
   ░  ▒ ▒ ░░▒░▒ ▒ ░      ▒ ░░          
      ▒ ▒ ░▒░ ░ ░          ░     ░░    
      ░ ░  ░░ ░ ░ ░      ░       ░     `;

export function Neofetch() {
  const t = useTranslations("terminal.neofetch");

  const rows: [string, string][] = [
    [t("os"), system.os],
    [t("wm"), system.wm],
    [t("shell"), system.shell],
    [t("editor"), system.editor],
    [t("theme"), system.theme],
    [t("stack"), stack.slice(0, 7).join(" · ")],
    [t("rubik"), "3×3 < 12 s · 4×4 < 1 mn · 5×5 < 2 mn"],
  ];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
      <pre
        aria-hidden
        className="shrink-0 select-none text-[8px] leading-[1.05] text-chaos-cyan/90 sm:text-[10px]"
      >
        {HEADER}
      </pre>

      <div className="min-w-0 font-mono text-xs leading-relaxed">
        <p className="text-chaos-magenta">
          {system.user}
          <span className="text-white/40">@</span>
          <span className="text-chaos-cyan">{system.host}</span>
        </p>
        <p className="text-white/25">{"-".repeat(20)}</p>
        <p className="mb-2 text-white/80">{t("role")}</p>
        {rows.map(([label, value]) => (
          <p key={label} className="truncate">
            <span className="text-white/40">{label}: </span>
            <span className="text-white/75">{value}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
