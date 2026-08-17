import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { decodeJwtPayload } from "@/lib/jwt";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  /** Google 帳號大頭貼；使用者也可以在本機覆寫（見 useAvatarOverride） */
  picture: string;
}

interface GoogleIdTokenPayload {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  /** VITE_GOOGLE_CLIENT_ID 沒設定時是 false，畫面要顯示對應提示 */
  isConfigured: boolean;
  /** Google Identity Services 腳本是否已經可用，button 元件要等這個才能 render */
  isReady: boolean;
  signOut: () => void;
  handleCredential: (response: GoogleCredentialResponse) => void;
}

const AUTH_STORAGE_KEY = "mitmap-auth-user";
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "";

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);
  const [isReady, setIsReady] = useState(() => Boolean(window.google?.accounts?.id));

  const handleCredential = useCallback((response: GoogleCredentialResponse) => {
    const payload = decodeJwtPayload<GoogleIdTokenPayload>(response.credential);
    const nextUser: AuthUser = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    };
    setUser(nextUser);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
    } catch {
      // 這次登入的個人化資訊就只留在記憶體裡，重新整理會消失
    }
  }, []);

  useEffect(() => {
    if (!CLIENT_ID) return;

    if (window.google?.accounts?.id) {
      setIsReady(true);
      return;
    }

    const script = document.querySelector<HTMLScriptElement>(
      'script[src="https://accounts.google.com/gsi/client"]',
    );
    if (!script) return;

    const onLoad = () => setIsReady(true);
    script.addEventListener("load", onLoad);
    return () => script.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (!isReady || !CLIENT_ID) return;
    window.google?.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredential,
      auto_select: false,
      cancel_on_tap_outside: true,
    });
  }, [isReady, handleCredential]);

  const signOut = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // 沒有可清的東西也無妨
    }
    window.google?.accounts.id.disableAutoSelect();
  }, []);

  const value = useMemo(
    () => ({ user, isConfigured: Boolean(CLIENT_ID), isReady, signOut, handleCredential }),
    [user, isReady, signOut, handleCredential],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
