import type { Product } from "@/data/types";
import { getBrand, getCategory } from "@/data/mock";
import { NeonLink } from "./NeonLink";
import OriginBadge from "./OriginBadge";

export default function ProductCard({ product }: { product: Product }) {
  const brand = getBrand(product.brandId);
  const category = getCategory(product.categoryId);

  return (
    <article className="tile-card p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-ink/50 font-mono">{category?.name}</p>
          <h3 className="font-display font-bold text-lg leading-snug">
            <NeonLink to={`/products/${product.slug}`}>{product.name}</NeonLink>
          </h3>
        </div>
        <OriginBadge classification={product.origin.classification} />
      </div>

      <p className="text-sm text-ink/70 leading-relaxed">{product.description}</p>

      <div className="flex items-center justify-between text-xs text-ink/50 border-t border-ink/10 pt-3 mt-1">
        <span>
          {brand ? (
            <NeonLink to={`/brands/${brand.slug}`}>{brand.name}</NeonLink>
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
