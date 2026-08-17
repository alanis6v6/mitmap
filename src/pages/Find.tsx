import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterBar from "@/components/FilterBar";
import ProductCard from "@/components/ProductCard";
import { AccentLink } from "@/components/AccentLink";
import { categories, getBrand, products } from "@/data/mock";
import type { OriginClassification } from "@/data/types";

export default function Find() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "all";
  const query = (searchParams.get("q") ?? "").trim().toLocaleLowerCase("zh-Hant-TW");

  const [origin, setOrigin] = useState<OriginClassification | "all">("all");
  const [county, setCounty] = useState<string>("all");

  const counties = useMemo(
    () => Array.from(new Set(products.map((p) => p.location.county))),
    []
  );

  const filtered = products.filter((p) => {
    const cat = categories.find((c) => c.id === p.categoryId);
    const brand = getBrand(p.brandId);
    if (activeCategory !== "all" && cat?.slug !== activeCategory) return false;
    if (origin !== "all" && p.origin.classification !== origin) return false;
    if (county !== "all" && p.location.county !== county) return false;
    if (
      query &&
      ![p.name, p.description, brand?.name, cat?.name, p.location.county, p.location.cluster]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("zh-Hant-TW")
        .includes(query)
    ) {
      return false;
    }
    return true;
  });

  const selectCategory = (category: string) => {
    const next = new URLSearchParams(searchParams);
    if (category === "all") next.delete("category");
    else next.set("category", category);
    setSearchParams(next);
  };

  return (
    <div>
      <h1 className="heading-page mb-1">找商品</h1>
      <p className="text-lede mb-6">
        {query
          ? `正在搜尋「${searchParams.get("q")}」；也可繼續疊加類別、製造分類與地區篩選。`
          : "類別、原料/製造分類、地區三個篩選器互相獨立，可自由疊加。"}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => selectCategory("all")}
          className={`verify-badge ${
            activeCategory === "all"
              ? "border-accent text-accent bg-accent/10"
              : "border-ink/20 text-ink/60"
          }`}
        >
          全部類別
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => selectCategory(c.slug)}
            className={`verify-badge ${
              activeCategory === c.slug
                ? "border-accent text-accent bg-accent/10"
                : "border-ink/20 text-ink/60"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <FilterBar
        counties={counties}
        origin={origin}
        county={county}
        onOriginChange={setOrigin}
        onCountyChange={setCounty}
      />

      {filtered.length === 0 ? (
        <p className="text-ink/50 text-sm py-12 text-center">
          這個條件組合目前沒有收錄商品——
          <AccentLink to="/submit">要不要推薦一個？</AccentLink>
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
