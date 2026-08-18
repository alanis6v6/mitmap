import { AccentLink } from "@/components/AccentLink";
import { regionClusters } from "@/data/mock";
import { useSearchParams } from "react-router-dom";

export default function Regions() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim().toLocaleLowerCase("zh-Hant-TW");
  const visibleRegions = regionClusters.filter((region) =>
    [region.county, region.clusterName, region.description]
      .join(" ")
      .toLocaleLowerCase("zh-Hant-TW")
      .includes(query),
  );

  return (
    <div>
      <h1 className="heading-page mb-1">找地方</h1>
      <p className="text-lede mb-8 max-w-xl">
        {query
          ? `正在搜尋「${searchParams.get("q")}」相關的製造地與產業聚落。`
          : "按縣市／產業聚落瀏覽製造地，這裡回答的是「這個地方做出了什麼」。"}
      </p>

      {/*
        TODO(地圖): 這裡之後要換成內嵌互動地圖（建議 Google Maps JS API + Places）。
        目前先用格狀卡片撐骨架；每個 RegionCluster 之後可以加 lat/lng 中心點，
        地圖上用群聚標記呈現，點聚落 marker 帶出下方同一份卡片清單。
        MVP 過渡期可先讓每張卡片的「在地圖上看」改成連到 Google Maps 搜尋網址。
      */}
      <div className="panel-card border-dashed h-56 sm:h-72 flex items-center justify-center mb-10">
        <p className="text-hint text-center px-4">
          [ 地圖插槽 · MAP SLOT ]
          <br />
          之後在此接 Google Maps JS API，用 regionClusters 的座標下 marker
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleRegions.map((r) => (
          <article key={r.id} className="panel-card p-4">
            <p className="text-meta">{r.county}</p>
            <h3 className="heading-sub mt-1">
              <AccentLink to={`/find?county=${encodeURIComponent(r.county)}`}>
                {r.clusterName}
              </AccentLink>
            </h3>
            <p className="text-body mt-2">{r.description}</p>
          </article>
        ))}
      </div>
      {visibleRegions.length === 0 && (
        <p className="py-12 text-center text-sm text-ink/50">目前沒有符合的地區或產業聚落。</p>
      )}
    </div>
  );
}
