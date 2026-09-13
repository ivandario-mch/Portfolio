"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { pulseButterfly } from "@/lib/chaos";
import { Neofetch } from "@/components/ui/Neofetch";

type Line = { type: "input" | "output" | "neofetch"; text: string };

export function Terminal() {
  const t = useTranslations("terminal");
  const locale = useLocale();
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);

  useEffect(() => {
    setLines([
      {
        type: "output",
        text:
          locale === "es"
            ? "Bienvenido al shell de Iván. Escribe `help` para ver los comandos."
            : "Welcome to Iván's shell. Type `help` to list commands.",
      },
    ]);
  }, [locale]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [lines]);

  const run = (raw: string): string => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return "";
    switch (cmd) {
      case "help":
        return locale === "es"
          ? "comandos: whoami, ls, cat skills, neofetch, sudo, butterfly, clear"
          : "commands: whoami, ls, cat skills, neofetch, sudo, butterfly, clear";
      case "whoami":
        return locale === "es"
          ? "iván — ingeniería física × infraestructura de IA 🇨🇴"
          : "iván — engineering physics × AI infrastructure 🇨🇴";
      case "ls":
        return "about/  skills/  projects/  stack/  contact/  .chaos";
      case "cat skills":
        return "Linux(90) TypeScript(80) Git/GitHub(70) Docker(80) LLM/RAG(80) Python(70) Física(70) MATLAB(50) Azure(40) Cuántica(40) Rust(30)";
      case "neofetch":
        return "__NEOFETCH__";
      case "sudo":
      case "sudo rm -rf /":
        return locale === "es"
          ? "nice try. Los sistemas caóticos son irreversibles. 🦋"
          : "nice try. Chaotic systems are irreversible. 🦋";
      case "butterfly":
        pulseButterfly();
        return locale === "es"
          ? "perturbando condición inicial… observa la divergencia 🦋"
          : "perturbing initial condition… watch it diverge 🦋";
      case "clear":
        return "__CLEAR__";
      default:
        return locale === "es"
          ? `command not found: ${cmd}. prueba \`help\``
          : `command not found: ${cmd}. try \`help\``;
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = value;
    if (!cmd.trim()) return;
    const output = run(cmd);
    if (output === "__CLEAR__") {
      setLines([]);
    } else if (output === "__NEOFETCH__") {
      setLines((prev) => [
        ...prev,
        { type: "input", text: cmd },
        { type: "neofetch", text: "" },
      ]);
    } else {
      setLines((prev) => [
        ...prev,
        { type: "input", text: cmd },
        { type: "output", text: output },
      ]);
    }
    setHistory((h) => [cmd, ...h]);
    setHIndex(-1);
    setValue("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const ni = Math.min(hIndex + 1, history.length - 1);
      if (history[ni]) {
        setHIndex(ni);
        setValue(history[ni]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const ni = hIndex - 1;
      setHIndex(ni);
      setValue(ni >= 0 ? history[ni] : "");
    }
  };

  return (
    <div
      className="glass overflow-hidden rounded-2xl"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-3 font-mono text-xs text-white/40">
          {t("title")} — zsh
        </span>
      </div>

      <div
        ref={scrollRef}
        className="h-72 overflow-y-auto p-4 font-mono text-sm leading-relaxed"
      >
        {lines.map((line, i) =>
          line.type === "neofetch" ? (
            <div key={i} className="py-2">
              <Neofetch />
            </div>
          ) : (
            <pre
              key={i}
              className={`whitespace-pre-wrap ${
                line.type === "input"
                  ? "text-chaos-cyan"
                  : "text-white/70"
              }`}
            >
              {line.type === "input" ? `${t("prompt")} ${line.text}` : line.text}
            </pre>
          )
        )}

        <form onSubmit={onSubmit} className="mt-2 flex items-center gap-2">
          <span className="text-chaos-magenta">{t("prompt")}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            placeholder={t("placeholder")}
            className="flex-1 bg-transparent text-white caret-chaos-cyan outline-none placeholder:text-white/25"
          />
        </form>
      </div>

      <div className="border-t border-white/10 bg-white/[0.02] px-4 py-2 font-mono text-[11px] text-white/35">
        {t("hint")}
      </div>
    </div>
  );
}
