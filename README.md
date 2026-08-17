# 佇遮 tī-tsia

台灣製商品/品牌查核收錄網站的前端骨架。Vite + React + TypeScript + Tailwind，
資料層目前是假資料（`src/data/mock.ts`），介面元件已經照真實資料型別
（`src/data/types.ts`）寫好，換成真資料時元件不用動。

## 執行

```bash
npm install
npm run dev      # 開發
npm run build    # 檢查型別 + build 產出 dist/
```

## 資料模型（重點）

商品（Product）是核心實體，不是品牌。「產地」拆成兩個獨立欄位：

- `origin: OriginDetail` — 原料/製造分類（法規意義上的台灣製，5 種狀態）
- `location: ManufacturingLocation` — 地理位置（縣市/聚落，給地圖用；
  `lat`/`lng` 目前是示範座標，接真資料時要用真實地址 geocode）

這兩者正交，一件商品可以同時是「實質轉型台灣製」+「產地在彰化社頭」。
詳細欄位說明都寫在 `src/data/types.ts` 的註解裡。

換真資料時：把 `src/data/mock.ts` 換成打 API / 讀 DB 的 fetch 邏輯，
回傳符合 `types.ts` 型別的資料即可，`components/` 跟 `pages/` 不用改。

## 版面結構

左側 icon 導覽（`Sidebar.tsx`，手機版收成底部 `MobileNav.tsx`）＋內容欄，
首頁另外多一欄右側個人面板：

- `/` 首頁 — 中間輪播 Hero（本季推薦／廣告位／距離最近，見下）＋類別方塊
  輪播＋近期收錄商品輪播＋法規小知識；右側是個人面板（登入、大頭貼、收藏）
- `/find` 找商品 — 類別 tab + 兩個獨立篩選器（原料分類／地區），可疊加
- `/regions` 找地方 — 獨立於「找商品」的地理瀏覽入口，目前是格狀卡片＋
  一個地圖插槽（`[ 地圖插槽 · MAP SLOT ]`），標好 TODO 等你接 Google Maps API
- `/products/:slug` 商品頁 — 完整原料分類明細（來源國、台灣工序、查核來源連結）
- `/brands/:slug` 品牌頁 — 品牌資訊 + 旗下商品清單
- `/about` 收錄標準 — 查核狀態圖例 + 法規依據
- `/submit`、`/report` — 表單骨架，等你接送出邏輯

## 首頁 Hero 輪播

`src/components/home/HeroRotator.tsx` 每 6 秒輪播三張卡：本季推薦（從
`mock.ts` 取第一筆商品）、廣告位（`[ AD SLOT ]` 佔位，之後接真的廣告資料）、
距離最近（見下）。可以點兩側箭頭或下方圓點手動切換。

## 距離最近（瀏覽器定位）

`src/hooks/useGeolocation.ts` 封裝瀏覽器 Geolocation API，**使用者主動按
按鈕才觸發定位權限請求**，不會一進頁面就跳權限提示。拿到座標後用
`src/lib/geo.ts` 的 haversine 公式，對 `mock.ts` 裡每筆商品的
`location.lat/lng` 算距離，取最近的一筆顯示。

真資料的地址還沒有精確座標前，這區塊只能先用示範座標；接真資料時記得
把每筆 `location` 補上實際 geocode 過的 `lat`/`lng`。

## 登入設定（Google Sign-In）

右側個人面板的登入用 [Google Identity Services](https://developers.google.com/identity/gsi/web)，
純前端串接，不需要自己的後端：

1. 到 [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   建立一個 OAuth 2.0 用戶端 ID（應用程式類型選「網頁應用程式」），
   把 `http://localhost:5173`（開發）跟正式網域加進「已授權的 JavaScript 來源」。
2. 複製 `.env.example` 成 `.env`，把 Client ID 填進
   `VITE_GOOGLE_CLIENT_ID`。
3. 重啟 `npm run dev`。沒設定這個環境變數時，登入按鈕會顯示提示文字，
   不會壞掉。

**這不是後端驗證**：`src/lib/jwt.ts` 只是把 Google 回傳的 ID token
payload 解碼出來顯示大頭貼/名字，沒有驗證簽章。純粹用來個人化介面，
不能拿來保護任何真正需要授權的後端資源。

### 收藏功能目前只存在這台裝置

`src/components/FavoritesProvider.tsx` 把收藏清單存在瀏覽器
`localStorage`，用登入者的 Google `sub` 當 key。這代表**同一個帳號
在不同裝置登入，收藏清單不會同步**——真的要跨裝置同步，需要接一個
雲端資料庫（例如 Firebase Firestore，跟 Google 登入是同一套生態系、
免費額度通常夠用），把 `FavoritesProvider` 內的 `localStorage`
讀寫換成打 Firestore 的即可，`useFavorites()` 的介面不用改。

大頭貼變更（`src/hooks/useAvatarOverride.ts`）同樣是本機
`localStorage`，換裝置也不會同步。

## 設計語彙

- 配色：暖色系儀表板風格——外層桃膚色 `shell`、卡片米白 `surface`／
  `panel`、側邊欄與強調色是珊瑚色 `sidebar`／`accent`，四色產業方塊
  `chip-green`／`chip-blue`／`chip-gold`／`chip-rose`
- 字體：中文標題 Noto Serif TC（粗黑）、品牌 logo 用 Alfa Slab One、
  內文 Noto Sans TC、狀態/編號用 IBM Plex Mono
- 強調連結（`.accent-link`，見 `src/index.css`）：平時是墨色字，
  hover / focus 時變珊瑚色並亮起底線
- 卡片（`.panel-card`）大圓角＋柔和陰影，hover 時陰影加深

所有 token 定義在 `tailwind.config.ts` 和 `src/index.css`，
要調色/調字直接改那邊。

## 顯示主題

網站提供「跟隨系統／亮色／暗色」三種模式。使用者選擇會儲存在瀏覽器，
頁面載入前即套用，避免主題閃爍。亮暗色的語意化色彩變數定義在
`src/index.css`，React 狀態與系統偏好同步邏輯位於
`src/components/ThemeProvider.tsx`。
