import type { OriginClassification } from "@/data/types";

const ORIGIN_OPTIONS: { value: OriginClassification | "all"; label: string }[] = [
  { value: "all", label: "全部原料/製造分類" },
  { value: "complete", label: "完全台灣製" },
  { value: "substantial_transformation", label: "實質轉型" },
  { value: "partial_process", label: "部分台灣工序" },
];

interface FilterBarProps {
  counties: string[];
  origin: OriginClassification | "all";
  county: string | "all";
  onOriginChange: (v: OriginClassification | "all") => void;
  onCountyChange: (v: string) => void;
}

/**
 * 兩個篩選器彼此獨立、可同時疊加，
 * 對應資料模型裡 originClassification 與 manufacturingLocation 是正交欄位這件事。
 */
export default function FilterBar({
  counties,
  origin,
  county,
  onOriginChange,
  onCountyChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8">
      <select
        value={origin}
        onChange={(e) => onOriginChange(e.target.value as OriginClassification | "all")}
        className="tile-card px-3 py-2 text-sm bg-paper font-body focus:outline-none"
      >
        {ORIGIN_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        value={county}
        onChange={(e) => onCountyChange(e.target.value)}
        className="tile-card px-3 py-2 text-sm bg-paper font-body focus:outline-none"
      >
        <option value="all">全部地區</option>
        {counties.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
