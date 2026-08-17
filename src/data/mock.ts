import type { Brand, Category, Product, RegionCluster } from "./types";

/**
 * 以下全部是示範用假資料，用來把畫面撐起來。
 * 之後接真實資料時，把這個檔案換成從 API / DB 抓資料即可，
 * 元件端吃的型別（types.ts）不用動。
 */

export const categories: Category[] = [
  { id: "c1", slug: "socks", name: "襪子" },
  { id: "c2", slug: "towels", name: "毛巾" },
  { id: "c3", slug: "umbrellas", name: "雨傘" },
  { id: "c4", slug: "ceramics", name: "餐具陶瓷" },
  { id: "c5", slug: "hardware", name: "五金工具" },
  { id: "c6", slug: "apparel", name: "衣服" },
];

export const brands: Brand[] = [
  {
    id: "b1",
    slug: "hillfoot",
    name: "台灣好襪",
    website: "https://example.com",
    description: "與彰化在地製襪工廠合作生產的機能襪品牌。",
    merchantConfirmed: true,
  },
  {
    id: "b2",
    slug: "rainbow-towel",
    name: "彩虹毛巾",
    website: "https://example.com",
    description: "虎尾毛巾產業聚落老字號廠牌，MIT 微笑標章獲證。",
    merchantConfirmed: true,
  },
  {
    id: "b3",
    slug: "meinong-umbrella",
    name: "美濃李家傘廠",
    description: "客家油紙傘工藝聚落，傳統製傘技法傳承三代。",
    merchantConfirmed: false,
  },
  {
    id: "b4",
    slug: "generic-appliance",
    name: "日象家電",
    description: "民國74年以製造電子鍋起家，部分產品台灣製、部分海外代工。",
    merchantConfirmed: false,
  },
];

export const regionClusters: RegionCluster[] = [
  {
    id: "r1",
    slug: "changhua-shetou-socks",
    county: "彰化縣",
    clusterName: "社頭製襪",
    description: "台灣製襪產業聚落，全台過半數襪子產自此地。",
  },
  {
    id: "r2",
    slug: "yunlin-huwei-towel",
    county: "雲林縣",
    clusterName: "虎尾毛巾",
    description: "台灣毛巾產業重鎮，多家 MIT 微笑標章毛巾廠聚集於此。",
  },
  {
    id: "r3",
    slug: "kaohsiung-meinong-umbrella",
    county: "高雄市",
    clusterName: "美濃紙傘",
    description: "客家油紙傘工藝聚落，傳統工序仍在地完成。",
  },
  {
    id: "r4",
    slug: "changhua-lukang-hardware",
    county: "彰化縣",
    clusterName: "鹿港水五金",
    description: "全球知名水五金產業聚落。",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "hillfoot-compression-socks",
    name: "機能壓力襪",
    brandId: "b1",
    categoryId: "c1",
    origin: {
      classification: "complete",
      sourceLinks: ["https://example.com/about"],
      verifiedAt: "2026-07-19",
    },
    location: { county: "彰化縣", cluster: "社頭製襪", lat: 23.8987, lng: 120.5758 },
    description: "紗線採購到織襪、定型皆在社頭在地工廠完成。",
  },
  {
    id: "p2",
    slug: "rainbow-cotton-towel",
    name: "純棉浴巾",
    brandId: "b2",
    categoryId: "c2",
    origin: {
      classification: "substantial_transformation",
      sourceCountries: ["印度（原棉）"],
      sourceLinks: ["https://example.com/mit-cert"],
      verifiedAt: "2026-06-02",
    },
    location: { county: "雲林縣", cluster: "虎尾毛巾", lat: 23.7089, lng: 120.4325 },
    description: "進口原棉，於虎尾廠完成紡紗、織造、剪裁至包裝全製程。",
  },
  {
    id: "p3",
    slug: "meinong-oil-paper-umbrella",
    name: "手繪油紙傘",
    brandId: "b3",
    categoryId: "c3",
    origin: {
      classification: "complete",
      verifiedAt: "2026-05-11",
    },
    location: { county: "高雄市", cluster: "美濃紙傘", lat: 22.8998, lng: 120.7297 },
    description: "竹骨、棉紙、桐油皆取自在地供應鏈，手工繪製。",
  },
  {
    id: "p4",
    slug: "generic-rice-cooker-tw",
    name: "電子鍋（台灣組裝款）",
    brandId: "b4",
    categoryId: "c5",
    origin: {
      classification: "partial_process",
      taiwanProcessSteps: ["最終組裝", "品檢", "包裝"],
      otherCountries: ["中國（內鍋與電路板）"],
      sourceLinks: ["https://example.com/thread-post"],
    },
    location: { county: "新北市", lat: 25.0117, lng: 121.4627 },
    description: "核心零件海外採購，最終組裝與品檢在新北廠完成，未達實質轉型門檻。",
  },
];

export function getBrand(id: string) {
  return brands.find((b) => b.id === id);
}

export function getCategory(id: string) {
  return categories.find((c) => c.id === id);
}
