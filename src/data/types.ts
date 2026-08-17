/**
 * ------------------------------------------------------------------------
 * 資料骨架說明
 * ------------------------------------------------------------------------
 * 核心資料實體是「商品 Product」，不是「品牌 Brand」。
 * 原因：同一品牌底下的商品，原料/製造狀態常常不同（例如同品牌有台灣製
 * 款也有中國代工款），所以查核分類要掛在商品上，不能掛在品牌上。
 *
 * 「產地」被拆成兩個完全獨立的欄位，不要合併：
 *   1. originClassification — 原料/製造分類（法規意義上的台灣製）
 *   2. manufacturingLocation — 地理位置（縣市/聚落，給地圖用）
 * 這兩者是正交的：一件商品可以是「實質轉型台灣製」同時「產地在彰化社頭」。
 * ------------------------------------------------------------------------
 */

/** 原料/製造分類——對應財政部原產地認定標準與 MIT 微笑標章的法規邏輯 */
export type OriginClassification =
  /** 完全生產：原料到製造皆在台灣境內取得或完成 */
  | "complete"
  /** 實質轉型：進口原料，但稅則號列改變／附加價值率逾35%／符合公告重要製程 */
  | "substantial_transformation"
  /** 部分台灣工序：僅部分工序在台灣完成，未達法定實質轉型門檻 */
  | "partial_process"
  /** 待查核：尚未確認，僅為社群線索或商家自述 */
  | "unverified"
  /** 爭議待查：收到具體產地爭議回報，查核中 */
  | "disputed";

export interface OriginDetail {
  classification: OriginClassification;
  /** 實質轉型時的原料來源國（可多國） */
  sourceCountries?: string[];
  /** 部分台灣工序時，註明哪些工序在台灣完成 */
  taiwanProcessSteps?: string[];
  /** 部分台灣工序時，其餘工序/原料的來源國 */
  otherCountries?: string[];
  /** 查核依據來源連結（官網、政府資料、公開貼文等），不隱藏、不腦補 */
  sourceLinks?: string[];
  /** 最後查核日期 ISO 字串 */
  verifiedAt?: string;
}

export interface ManufacturingLocation {
  county: string; // 縣市，例如「彰化縣」
  cluster?: string; // 產業聚落，例如「社頭製襪」
  address?: string; // 工廠/店家地址（選填，非必要公開）
  lat?: number;
  lng?: number;
  mapPlaceId?: string; // 之後串 Google Places API 用
}

export interface Category {
  id: string;
  slug: string;
  name: string;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  website?: string;
  social?: string;
  description: string;
  /** 品牌自身的查核狀態不等於商品查核狀態，僅代表品牌資料是否經確認 */
  merchantConfirmed?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brandId: string;
  categoryId: string;
  origin: OriginDetail;
  location: ManufacturingLocation;
  description: string;
  image?: string;
}

export interface RegionCluster {
  id: string;
  slug: string;
  county: string;
  clusterName: string;
  description: string;
}
