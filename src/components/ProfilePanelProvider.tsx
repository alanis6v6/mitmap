import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "mitmap-profile-panel-collapsed";

interface ProfilePanelContextValue {
  collapsed: boolean;
  toggle: () => void;
}

const ProfilePanelContext = createContext<ProfilePanelContextValue | null>(null);

function readStored(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function ProfilePanelProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState<boolean>(readStored);

  const toggle = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        // 這次切換就只影響當下畫面，重新整理會回到預設值
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ collapsed, toggle }), [collapsed, toggle]);

  return (
    <ProfilePanelContext.Provider value={value}>{children}</ProfilePanelContext.Provider>
  );
}

export function useProfilePanel() {
  const context = useContext(ProfilePanelContext);
  if (!context) {
    throw new Error("useProfilePanel must be used within ProfilePanelProvider");
  }
  return context;
}
