import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F2EAD8", // 米紙/磨石子底色
        ink: "#2A241E", // 老招牌墨色
        "tile-red": "#A6453A", // 老鐵盒磚紅
        "tile-green": "#4B6B55", // 花磚苔綠
        "tile-blue": "#3B5875", // 花磚靛藍
        "tile-gold": "#C08A34", // 鐵盒金邊
        "tile-cream": "#E8DDC4", // 磚縫米白
        neon: {
          pink: "#FF3D9A",
          cyan: "#23E8C9",
        },
      },
      fontFamily: {
        display: ['"Noto Serif TC"', "serif"],
        stamp: ['"Alfa Slab One"', "cursive"],
        body: ['"Noto Sans TC"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      boxShadow: {
        neon: "0 0 6px rgba(255,61,154,0.7), 0 0 18px rgba(255,61,154,0.35)",
        "neon-cyan": "0 0 6px rgba(35,232,201,0.7), 0 0 18px rgba(35,232,201,0.35)",
        tile: "0 2px 0 rgba(42,36,30,0.08)",
      },
      backgroundImage: {
        "tile-grid":
          "linear-gradient(rgba(42,36,30,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(42,36,30,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        "tile-grid": "48px 48px",
      },
    },
  },
  plugins: [],
} satisfies Config;
