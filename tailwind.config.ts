import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        "tile-red": "rgb(var(--color-tile-red) / <alpha-value>)",
        "tile-green": "rgb(var(--color-tile-green) / <alpha-value>)",
        "tile-blue": "rgb(var(--color-tile-blue) / <alpha-value>)",
        "tile-gold": "rgb(var(--color-tile-gold) / <alpha-value>)",
        "tile-cream": "rgb(var(--color-tile-cream) / <alpha-value>)",
        neon: {
          pink: "rgb(var(--color-neon-pink) / <alpha-value>)",
          cyan: "rgb(var(--color-neon-cyan) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ['"Noto Serif TC"', "serif"],
        stamp: ['"Alfa Slab One"', "cursive"],
        body: ['"Noto Sans TC"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      boxShadow: {
        neon:
          "0 0 6px rgb(var(--color-neon-pink) / 0.7), 0 0 18px rgb(var(--color-neon-pink) / 0.35)",
        "neon-cyan":
          "0 0 6px rgb(var(--color-neon-cyan) / 0.7), 0 0 18px rgb(var(--color-neon-cyan) / 0.35)",
        tile: "0 2px 0 rgb(var(--color-ink) / 0.08)",
      },
      backgroundImage: {
        "tile-grid":
          "linear-gradient(rgb(var(--color-ink) / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-ink) / 0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        "tile-grid": "48px 48px",
      },
    },
  },
  plugins: [],
} satisfies Config;
