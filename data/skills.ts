export type Skill = {
  name: string;
  level: number;
  accent: string;
};

export const skills: Skill[] = [
  { name: "Linux ", level: 60, accent: "#38e8ff" },
  { name: "TypeScript / Next.js", level: 50, accent: "#38e8ff" },
  { name: "Docker & self-hosting", level: 60, accent: "#ff4fd8" },
  { name: "IA / LLMs & RAG", level: 70, accent: "#8b5cf6" },
  { name: "Python", level: 70, accent: "#ffb347" },
  { name: "Física / cómputo científico", level: 80, accent: "#8b5cf6" },
  { name: "Computación cuántica", level: 40, accent: "#8b5cf6" },
  { name: "Git / GitHub", level: 70, accent: "#ff4fd8" },
  { name: "Azure", level: 40, accent: "#38e8ff" },
  { name: "MATLAB", level: 50, accent: "#ffb347" },
  { name: "Rust", level: 20, accent: "#ffb347" },
];

export const stack = [
  "TypeScript",
  "Rust",
  "Python",
  "Docker",
  "Qdrant",
  "n8n",
  "Bifrost",
  "Ollama",
  "Arch Linux",
  "Neovim",
  "Qiskit",
  "Git",
  "GitHub",
  "Azure",
  "MATLAB",
  "LaTeX",
  "Cubos Rubik",
];

export const system = {
  user: "ivan",
  host: "portfolio",
  os: "Arch Linux (btw)",
  wm: "Hyprland",
  shell: "zsh + tmux",
  editor: "Neovim",
  theme: "chaos",
};
