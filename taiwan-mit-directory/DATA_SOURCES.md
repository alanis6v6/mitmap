# 資料來源清單（給資料管線用）

這份文件是給 Claude Code（或任何接手寫 ingestion script 的人/AI）看的，
把要串接的資料源、欄位、格式都寫死在這裡，不用每次重新解釋。

目標輸出：符合 `src/data/types.ts` 的 `Product[]` / `Brand[]` / `RegionCluster[]` JSON，
取代 `src/data/mock.ts` 裡的假資料。

## 建議管線順序

1. 下載①的 MIT ZIP，parse 成中繼資料（含統一編號）
2. 用②的 GCIS API，以統一編號查公司登記地址，補進 `location`
3. 地址 geocode 成縣市 + lat/lng（可用 Nominatim 或政府地址定位服務）
4. 依統一編號、產業別，人工/半自動判斷 `origin.classification`
   （MIT 微笑標章本身已代表通過原產地認定，預設可標 `complete` 或
   `substantial_transformation`，除非有其他資訊顯示是部分工序）
5. ④的工藝之家名單另外整理成 `RegionCluster` 或獨立品牌資料

## ① MIT 微笑標章通過驗證產品資料（核心種子資料）

- 下載網址：`https://keid.nat.gov.tw/mittw/Files/Download/productlist.zip`
- 說明頁：https://data.gov.tw/dataset/6027
- 授權：政府資料開放授權條款第1版，免費
- 欄位：序號、產業別、獲證業者、**統一編號**、產品名稱、產品型號、產品效期、
  標章編號、品牌名稱、備註
- 更新頻率：不定期，抓的時候記得記錄抓取日期

## ② 商工行政資料開放平臺（用統一編號補地址）

- API 說明文件：https://data.gcis.nat.gov.tw/od/rule
- 公司登記基本資料 API 範例：
  `https://data.gcis.nat.gov.tw/od/data/api/5F64D864-61CB-4D0D-8AD9-492047CC1EA6?$format=json&$filter=Business_Accounting_NO eq {統一編號}`
- 關鍵回傳欄位：`Company_Name`、`Company_Location`（地址）、`Company_Status_Desc`
- 注意：`Company_Location` 是「公司登記地址」，不一定等於實際工廠地址；
  如果要更準的製造地，要另外查工廠登記公示資料
  （https://www.ida.gov.tw/ctlr?PRO=inquery.rwdInqueryList，目前只有查詢介面，
  沒有批次 API，量大的話要考慮人工核對或申請合作）
- 有 rate limit，寫 script 時要加 sleep/重試機制，避免被擋

## ③ 食品/農產類補充來源（非本次第一批，之後擴充用）

- CAS台灣優良農產品：https://cas.moa.gov.tw （查詢介面，無批次下載）
- 農業資料開放平臺（產銷履歷TAP等）：https://data.moa.gov.tw/api.aspx

## ④ 臺灣工藝之家（地方聚落/工藝品牌資料）

- 名單頁：https://www.ntcri.gov.tw/home/zh-tw/artists
- 全台145位授證工藝家（自2004年起五屆＋後續屆次），含所在地
- 沒有結構化 API，需要手動整理或寫頁面爬蟲（注意爬蟲頻率，不要打太快）

## 已知限制 / 待確認

- MIT 微笑標章資料本身沒有「原料來源國」欄位，`origin.sourceCountries` 這類細節
  目前無法從①自動取得，只能之後靠品牌自述或人工查核補上
- CAS、工藝之家都沒有現成批次 API，第一版資料庫先以①②為主，③④用人工慢慢補
