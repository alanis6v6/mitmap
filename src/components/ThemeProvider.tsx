import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemePreference = "system" | "light" | "dark";
export type ResolvedTheme = Exclude<ThemePreference, "system">;

const THEME_STORAGE_KEY = "mitmap-theme";
const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";

interface ThemeContextValue {
  theme: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isThemePreference(value: unknown): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

function getInitialPreference(): ThemePreference {
  if (typeof document === "undefined") return "system";

  const initialPreference = document.documentElement.dataset.themePreference;
  return isThemePreference(initialPreference) ? initialPreference : "system";
}

function getInitialResolvedTheme(): ResolvedTheme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(preference: ThemePreference): ResolvedTheme {
  const resolvedTheme =
    preference === "system"
      ? window.matchMedia(DARK_MEDIA_QUERY).matches
        ? "dark"
        : "light"
      : preference;
  const root = document.documentElement;

  root.classList.toggle("dark", resolvedTheme === "dark");
  root.dataset.theme = resolvedTheme;
  root.dataset.themePreference = preference;
  root.style.colorScheme = resolvedTheme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", resolvedTheme === "dark" ? "#151814" : "#F2EAD8");

  return resolvedTheme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>(getInitialPreference);
  const [resolvedTheme, setResolvedTheme] =
    useState<ResolvedTheme>(getInitialResolvedTheme);

  const setTheme = useCallback((nextTheme: ThemePreference) => {
    setThemeState(nextTheme);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Theme selection still works for this visit when storage is unavailable.
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DARK_MEDIA_QUERY);
    const syncTheme = () => setResolvedTheme(applyTheme(theme));

    syncTheme();
    mediaQuery.addEventListener("change", syncTheme);
    return () => mediaQuery.removeEventListener("change", syncTheme);
  }, [theme]);

  useEffect(() => {
    const syncAcrossTabs = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      setThemeState(isThemePreference(event.newValue) ? event.newValue : "system");
    };

    window.addEventListener("storage", syncAcrossTabs);
    return () => window.removeEventListener("storage", syncAcrossTabs);
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
