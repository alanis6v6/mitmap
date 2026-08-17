# 台製誌 Taiwan Made Directory — 骨架

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
- `location: ManufacturingLocation` — 地理位置（縣市/聚落，給地圖用）

這兩者正交，一件商品可以同時是「實質轉型台灣製」+「產地在彰化社頭」。
詳細欄位說明都寫在 `src/data/types.ts` 的註解裡。

換真資料時：把 `src/data/mock.ts` 換成打 API / 讀 DB 的 fetch 邏輯，
回傳符合 `types.ts` 型別的資料即可，`components/` 跟 `pages/` 不用改。

## 頁面結構

- `/` 首頁 — Hero 拼磚區塊 + 類別捷徑 + 近期收錄 + 法規小知識
- `/find` 找商品 — 類別 tab + 兩個獨立篩選器（原料分類／地區），可疊加
- `/regions` 找地方 — 獨立於「找商品」的地理瀏覽入口，目前是格狀卡片＋
  一個地圖插槽（`[ 地圖插槽 · MAP SLOT ]`），標好 TODO 等你接 Google Maps API
- `/products/:slug` 商品頁 — 完整原料分類明細（來源國、台灣工序、查核來源連結）
- `/brands/:slug` 品牌頁 — 品牌資訊 + 旗下商品清單
- `/about` 收錄標準 — 查核狀態圖例 + 法規依據
- `/submit`、`/report` — 表單骨架，等你接送出邏輯

## Google Maps 待辦

`src/pages/Regions.tsx` 和 `src/pages/ProductDetail.tsx` 裡標了
`TODO(地圖)` 註解。建議做法（先前討論過）：內嵌互動地圖優先於純連結出去，
因為可以跟篩選系統互動；`ManufacturingLocation` 型別已經預留
`lat` / `lng` / `mapPlaceId` 欄位。MVP 過渡期可以先把卡片上的「在地圖上看」
簡化成連到 Google Maps 搜尋網址，之後再換成真的內嵌地圖元件。

## 設計語彙

- 配色：低飽和磁磚色系（磚紅 `tile-red` / 苔綠 `tile-green` / 靛藍
  `tile-blue` / 鐵盒金 `tile-gold`），底色是米紙色 `paper`
- 字體：中文標題 Noto Serif TC（粗黑）、英文/徽章用 Alfa Slab One（老鐵盒
  戳印感）、內文 Noto Sans TC、狀態/編號用 IBM Plex Mono
- 簽名元素：**霓虹底線連結**（`.neon-link`，見 `src/index.css`）——平時是
  低飽和的老磁磚配色，hover / focus 時底線像夜市招牌一樣亮起霓虹粉光暈。
  這是全站唯一「亮」的地方，其餘刻意收斂，避免花。
- 卡片（`.tile-card`）hover 時邊框同樣亮起霓虹光暈，跟連結呼應。

所有 token 定義在 `tailwind.config.ts`，要調色/調字直接改那邊。
