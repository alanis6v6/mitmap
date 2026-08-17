import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "./AuthProvider";

interface FavoritesContextValue {
  favoriteIds: string[];
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function storageKey(userId: string | null) {
  return `mitmap-favorites-${userId ?? "guest"}`;
}

function readIds(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    // 收藏這次就只留在記憶體裡，重新整理會消失
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() =>
    readIds(storageKey(user?.id ?? null)),
  );

  // 登入時把訪客身分累積的收藏併進帳號，不要憑空消失
  useEffect(() => {
    if (!user) return;
    const guestIds = readIds(storageKey(null));
    if (guestIds.length === 0) return;

    setFavoriteIds((current) => {
      const merged = Array.from(new Set([...current, ...guestIds]));
      writeIds(storageKey(user.id), merged);
      return merged;
    });
    localStorage.removeItem(storageKey(null));
  }, [user]);

  useEffect(() => {
    setFavoriteIds(readIds(storageKey(user?.id ?? null)));
  }, [user?.id]);

  const toggleFavorite = useCallback(
    (productId: string) => {
      setFavoriteIds((current) => {
        const next = current.includes(productId)
          ? current.filter((id) => id !== productId)
          : [...current, productId];
        writeIds(storageKey(user?.id ?? null), next);
        return next;
      });
    },
    [user?.id],
  );

  const isFavorite = useCallback(
    (productId: string) => favoriteIds.includes(productId),
    [favoriteIds],
  );

  const value = useMemo(
    () => ({ favoriteIds, isFavorite, toggleFavorite }),
    [favoriteIds, isFavorite, toggleFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}
