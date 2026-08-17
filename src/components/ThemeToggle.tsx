import { useTheme, type ThemePreference } from "./ThemeProvider";

const themeOptions: Array<{
  value: ThemePreference;
  label: string;
  description: string;
}> = [
  { value: "system", label: "自動", description: "跟隨系統顯示設定" },
  { value: "light", label: "亮", description: "使用亮色主題" },
  { value: "dark", label: "暗", description: "使用暗色主題" },
];

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-sm border border-ink/15 bg-tile-cream/55 p-1 shadow-tile ${className}`}
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
            className={`min-w-8 rounded-sm px-2 py-1 font-mono text-[11px] transition-colors duration-200 ${
              isActive
                ? "bg-ink text-paper shadow-sm"
                : "text-ink/55 hover:bg-paper/70 hover:text-ink"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
