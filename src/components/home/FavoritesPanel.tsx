import { useMemo, useState } from "react";
import { AccentLink } from "@/components/AccentLink";
import { HeartIcon, SearchSmallIcon } from "@/components/icons";
import { useFavorites } from "@/components/FavoritesProvider";
import { categories, getCategory, products } from "@/data/mock";

export default function FavoritesPanel() {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");

  const favoriteProducts = useMemo(
    () => products.filter((p) => favoriteIds.includes(p.id)),
    [favoriteIds],
  );

  const filtered = favoriteProducts.filter((p) => {
    if (categoryId !== "all" && p.categoryId !== categoryId) return false;
    if (query.trim() && !p.name.includes(query.trim())) return false;
    return true;
  });

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="heading-sub">收藏清單</h2>
        <span className="text-meta">{favoriteProducts.length} 件</span>
      </div>

      {favoriteProducts.length === 0 ? (
        <p className="text-lede">
          還沒有收藏——在商品卡片上按愛心即可加入。
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-2 mb-3">
            <div className="relative">
              <SearchSmallIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜尋收藏的商品"
                className="w-full rounded-full border border-ink/10 bg-panel pl-8 pr-3 py-1.5 text-xs focus:outline-none"
              />
            </div>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-full border border-ink/10 bg-panel px-3 py-1.5 text-xs focus:outline-none"
            >
              <option value="all">全部類別</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <ul className="flex flex-col gap-2">
            {filtered.length === 0 ? (
              <li className="text-lede">沒有符合條件的收藏。</li>
            ) : (
              filtered.map((product) => (
                <li
                  key={product.id}
                  className="panel-card flex items-center gap-2 px-3 py-2"
                >
                  <div className="min-w-0 flex-1">
                    <AccentLink
                      to={`/products/${product.slug}`}
                      className="text-sm font-bold block truncate"
                    >
                      {product.name}
                    </AccentLink>
                    <p className="text-meta truncate">
                      {getCategory(product.categoryId)?.name} · {product.location.county}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="取消收藏"
                    className="text-accent shrink-0"
                  >
                    <HeartIcon filled className="w-4 h-4" />
                  </button>
                </li>
              ))
            )}
          </ul>
        </>
      )}
    </section>
  );
}
