# Atractor — Portfolio interactivo

Portfolio tipo CV de **Iván** (Ingeniería Física × Infraestructura IA) con estética de laboratorio de física y terminal. El fondo es un sistema caótico en WebGL: el **atractor de Lorenz** (la mariposa del caos) reacciona al cursor, junto a una cinta de Möbius, una esfera de Bloch y un campo de partículas.

## Características

- **Atractor de Lorenz** que sigue y se perturba con el mouse + botón "Efecto mariposa".
- **Secuencia por scroll**: la mariposa aparece en el hero, la **esfera de Bloch** en Skills y la **cinta de Möbius** en Stack/Terminal (cross-fade por ventanas de scroll).
- **Función de onda interactiva**: al pasar el cursor sobre la tarjeta cuántica, el vector de Bloch salta de |0⟩ a +X y se revela `|ψ⟩ = 1/√2 (|φ₁⟩ + |φ₂⟩)` con θ=π/2, φ=0, a=b=1/√2.
- **Campo de partículas** con repulsión al cursor y estela de partícula.
- **Scroll = energía**: la animación se acelera según el scroll.
- **Terminal interactiva**: `help`, `whoami`, `ls`, `cat skills`, `neofetch`, `butterfly`, `sudo` (easter egg).
- **Bilingüe ES/EN** con next-intl.
- **Toggle de entropía**: randomiza la paleta de colores.
- Proyectos **curados a mano** con metadatos vivos desde la API de GitHub (con fallback offline).
- Texto legible sobre la animación (scrim + sombras) y respeta `prefers-reduced-motion`.

## Stack

Next.js 14 (App Router) · TypeScript · React Three Fiber · drei · Three.js · framer-motion · Tailwind CSS · next-intl.

## Desarrollo

```bash
bun install
bun run dev      # http://localhost:3000
bun run build    # build de producción
bun run typecheck
bun run lint
```

## Estructura

```
app/[locale]/        página y layout (i18n)
components/scene/     capa WebGL (Lorenz, Möbius, Bloch, partículas, cursor)
components/ui/        Header, toggles, cards, terminal, skill bars
sections/             Hero, About, Skills, Projects, Stack, Terminal, Contact, Footer
data/                 proyectos curados y skills
lib/                  i18n, fetch de GitHub, estado global del caos
messages/             traducciones es.json / en.json
```

## Deploy en Vercel

1. Sube el repo a GitHub.
2. Importa el proyecto en Vercel.
3. Framework preset: **Next.js**. No requiere variables de entorno.

## Personalización

- Proyectos: edita `data/projects.ts`.
- Skills y stack: edita `data/skills.ts`.
- Textos: `messages/es.json` y `messages/en.json`.
- Paletas de entropía: `components/ui/EntropyToggle.tsx`.
