import { useCallback, useEffect, useState } from "react";

function storageKey(userId: string | null) {
  return `mitmap-avatar-${userId ?? "guest"}`;
}

/** 讓使用者用本機圖片覆蓋顯示用的大頭貼，存成 data URL，不用後端 */
export function useAvatarOverride(userId: string | null) {
  const [overrideUrl, setOverrideUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem(storageKey(userId));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      setOverrideUrl(localStorage.getItem(storageKey(userId)));
    } catch {
      setOverrideUrl(null);
    }
  }, [userId]);

  const setAvatarFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setOverrideUrl(dataUrl);
        try {
          localStorage.setItem(storageKey(userId), dataUrl);
        } catch {
          // 圖片太大存不進 localStorage 時，這次變更就只留在畫面上
        }
      };
      reader.readAsDataURL(file);
    },
    [userId],
  );

  return { overrideUrl, setAvatarFile };
}
