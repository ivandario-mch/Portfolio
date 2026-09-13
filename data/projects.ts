export type Project = {
  id: string;
  name: string;
  repo: string;
  url: string;
  language: string;
  accent: string;
  featured?: boolean;
  tag: { es: string; en: string };
  description: { es: string; en: string };
};

export const projects: Project[] = [
  {
    id: "bandit",
    name: "bandit_10_armed",
    repo: "ivandario-mch/bandit_10_armed",
    url: "https://github.com/ivandario-mch/bandit_10_armed",
    language: "Rust",
    accent: "#ffb347",
    featured: true,
    tag: { es: "Reinforcement Learning", en: "Reinforcement Learning" },
    description: {
      es: "Implementación en Rust del problema del bandido multibrazo de 10 brazos: exploración vs. explotación, estrategias ε-greedy y análisis de recompensa esperada.",
      en: "Rust implementation of the 10-armed bandit problem: exploration vs. exploitation, ε-greedy strategies and expected-reward analysis.",
    },
  },
  {
    id: "rag",
    name: "RAG",
    repo: "ivandario-mch/Appi_RAG",
    url: "https://github.com/ivandario-mch/Appi_RAG",
    language: "Python",
    accent: "#38e8ff",
    featured: true,
    tag: { es: "RAG · Qdrant", en: "RAG · Qdrant" },
    description: {
      es: "API de RAG multi-tenant sobre Qdrant: recuperación aumentada, gestión de colecciones y pipeline de embeddings para asistentes con contexto propio.",
      en: "Multi-tenant RAG API on top of Qdrant: augmented retrieval, collection management and an embedding pipeline for context-aware assistants.",
    },
  },
  {
    id: "tem",
    name: "Talleres_TEM",
    repo: "ivandario-mch/Talleres_TEM",
    url: "https://github.com/ivandario-mch/Talleres_TEM",
    language: "LaTeX",
    accent: "#8b5cf6",
    tag: { es: "Teoría electromagnética", en: "Electromagnetic theory" },
    description: {
      es: "Talleres de teoría electromagnética en LaTeX: ecuaciones de Maxwell, campos, ondas y formulación matemática rigurosa.",
      en: "Electromagnetic theory workshops in LaTeX: Maxwell's equations, fields, waves and rigorous mathematical formulation.",
    },
  },
];
