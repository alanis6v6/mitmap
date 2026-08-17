import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        shell: "rgb(var(--color-shell) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
        sidebar: "rgb(var(--color-sidebar) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        chip: {
          green: "rgb(var(--color-chip-green) / <alpha-value>)",
          blue: "rgb(var(--color-chip-blue) / <alpha-value>)",
          gold: "rgb(var(--color-chip-gold) / <alpha-value>)",
          rose: "rgb(var(--color-chip-rose) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ['"Noto Serif TC"', "serif"],
        stamp: ['"Alfa Slab One"', "cursive"],
        body: ['"Noto Sans TC"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        soft: "0 8px 24px rgb(var(--color-ink) / 0.08)",
        card: "0 2px 10px rgb(var(--color-ink) / 0.06)",
        accent: "0 6px 18px rgb(var(--color-accent) / 0.35)",
        shell: "0 24px 70px rgb(var(--color-ink) / 0.13)",
      },
    },
  },
  plugins: [],
} satisfies Config;
