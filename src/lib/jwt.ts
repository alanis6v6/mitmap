/**
 * 純前端解碼 JWT payload，只為了讀出 Google 個人資料拿來顯示用。
 * 沒有驗證簽章——這不是安全性驗證，只是把 ID token 裡的欄位攤開來看。
 * 真的要保護後端資源，簽章驗證必須在伺服器上做。
 */
export function decodeJwtPayload<T>(token: string): T {
  const payload = token.split(".")[1];
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const json = decodeURIComponent(
    atob(padded)
      .split("")
      .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join(""),
  );
  return JSON.parse(json) as T;
}
