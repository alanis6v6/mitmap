import type { Product } from "@/data/types";
import { getBrand, getCategory } from "@/data/mock";
import { AccentLink } from "./AccentLink";
import OriginBadge from "./OriginBadge";
import { HeartIcon } from "./icons";
import { useFavorites } from "./FavoritesProvider";

export default function ProductCard({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const brand = getBrand(product.brandId);
  const category = getCategory(product.categoryId);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  return (
    <article className={`panel-card p-4 flex flex-col gap-3 ${className}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-meta">{category?.name}</p>
          <h3 className="heading-sub leading-snug">
            <AccentLink to={`/products/${product.slug}`}>{product.name}</AccentLink>
          </h3>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <OriginBadge classification={product.origin.classification} />
          <button
            type="button"
            onClick={() => toggleFavorite(product.id)}
            aria-pressed={favorited}
            aria-label={favorited ? "取消收藏" : "加入收藏"}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
              favorited ? "text-accent" : "text-ink/30 hover:text-accent"
            }`}
          >
            <HeartIcon filled={favorited} className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-body">{product.description}</p>

      <div className="flex items-center justify-between text-xs text-ink/50 border-t border-ink/10 pt-3 mt-1">
        <span>
          {brand ? (
            <AccentLink to={`/brands/${brand.slug}`}>{brand.name}</AccentLink>
          ) : (
            "未知品牌"
          )}
        </span>
        <span className="font-mono">
          {product.location.county}
          {product.location.cluster ? ` · ${product.location.cluster}` : ""}
        </span>
      </div>
    </article>
  );
}
