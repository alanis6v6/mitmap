import { useEffect, useRef } from "react";
import { useAuth } from "./AuthProvider";

export default function GoogleSignInButton() {
  const { isConfigured, isReady } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isReady || !containerRef.current) return;
    containerRef.current.innerHTML = "";
    window.google?.accounts.id.renderButton(containerRef.current, {
      type: "standard",
      theme: "outline",
      size: "medium",
      shape: "pill",
      text: "signin_with",
      width: 220,
    });
  }, [isReady]);

  if (!isConfigured) {
    return (
      <p className="text-hint max-w-[220px]">
        尚未設定 Google 登入（缺少 VITE_GOOGLE_CLIENT_ID），見 README「登入設定」。
      </p>
    );
  }

  if (!isReady) {
    return <p className="text-hint">登入元件載入中…</p>;
  }

  return <div ref={containerRef} />;
}
