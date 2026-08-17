import type { ReactNode } from "react";
import { useTheme, type ThemePreference } from "./ThemeProvider";
import { DesktopIcon, SunIcon, MoonIcon } from "./icons";

const themeOptions: Array<{
  value: ThemePreference;
  label: string;
  description: string;
  icon: (props: { className?: string }) => ReactNode;
}> = [
  { value: "system", label: "自動", description: "跟隨系統顯示設定", icon: (p) => <DesktopIcon {...p} /> },
  { value: "light", label: "亮", description: "使用亮色主題", icon: (p) => <SunIcon {...p} /> },
  { value: "dark", label: "暗", description: "使用暗色主題", icon: (p) => <MoonIcon {...p} /> },
];

interface ThemeToggleProps {
  className?: string;
  variant?: "pill" | "sidebar";
}

export default function ThemeToggle({ className = "", variant = "pill" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  if (variant === "sidebar") {
    return (
      <div
        className={`flex flex-col items-center gap-1 ${className}`}
        role="radiogroup"
        aria-label="顯示主題"
      >
        {themeOptions.map((option) => {
          const isActive = theme === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={option.description}
              title={option.description}
              onClick={() => setTheme(option.value)}
              className={`flex items-center justify-center w-9 h-9 rounded-xl2 transition-colors duration-150 ${
                isActive ? "bg-white/25 text-white" : "text-white/60 hover:bg-white/10"
              }`}
            >
              {option.icon({ className: "w-4 h-4" })}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full border border-ink/10 bg-panel p-1 shadow-card ${className}`}
      role="radiogroup"
      aria-label="顯示主題"
    >
      {themeOptions.map((option) => {
        const isActive = theme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={option.description}
            title={option.description}
            onClick={() => setTheme(option.value)}
            className={`min-w-8 rounded-full px-2 py-1 font-mono text-[11px] transition-colors duration-200 ${
              isActive
                ? "bg-ink text-surface shadow-sm"
                : "text-ink/55 hover:bg-panel hover:text-ink"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
