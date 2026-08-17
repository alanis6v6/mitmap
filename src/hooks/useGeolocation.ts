import { useCallback, useState } from "react";
import type { LatLng } from "@/lib/geo";

type GeolocationStatus = "idle" | "loading" | "granted" | "denied" | "unsupported";

interface GeolocationState {
  status: GeolocationStatus;
  coords: LatLng | null;
  error: string | null;
}

/**
 * 定位是使用者主動觸發（request()），不在頁面載入時自動跳權限請求——
 * 瀏覽器定位權限提示不該在使用者還不知道要幹嘛前就跳出來。
 */
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    status: "idle",
    coords: null,
    error: null,
  });

  const request = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setState({ status: "unsupported", coords: null, error: "此瀏覽器不支援定位" });
      return;
    }

    setState((prev) => ({ ...prev, status: "loading", error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          status: "granted",
          coords: { lat: position.coords.latitude, lng: position.coords.longitude },
          error: null,
        });
      },
      (error) => {
        setState({ status: "denied", coords: null, error: error.message });
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 },
    );
  }, []);

  return { ...state, request };
}
