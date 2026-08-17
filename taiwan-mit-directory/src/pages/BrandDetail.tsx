import { useParams, Link } from "react-router-dom";
import { brands, products } from "@/data/mock";
import ProductCard from "@/components/ProductCard";
import { NeonAnchor, NeonLink } from "@/components/NeonLink";

export default function BrandDetail() {
  const { slug } = useParams();
  const brand = brands.find((b) => b.slug === slug);

  if (!brand) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="text-ink/50">找不到這個品牌。</p>
        <NeonLink to="/find">回找商品 →</NeonLink>
      </div>
    );
  }

  const brandProducts = products.filter((p) => p.brandId === brand.id);

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <p className="text-xs font-mono text-ink/50 mb-2">
        <Link to="/find" className="hover:text-tile-red">
          找商品
        </Link>{" "}
        / 品牌
      </p>

      <div className="flex items-start justify-between gap-3 mb-2">
        <h1 className="font-display font-black text-3xl">{brand.name}</h1>
        <span
          className={`verify-badge ${
            brand.merchantConfirmed
              ? "border-tile-green text-tile-green bg-tile-green/10"
              : "border-ink/30 text-ink/50 bg-ink/5"
          }`}
        >
          {brand.merchantConfirmed ? "商家已確認" : "待商家確認"}
        </span>
      </div>

      <p className="text-ink/70 leading-relaxed mb-2 max-w-2xl">{brand.description}</p>
      {brand.website && (
        <NeonAnchor href={brand.website} className="text-sm">
          品牌官網 ↗
        </NeonAnchor>
      )}

      <h2 className="font-display font-bold text-xl mt-10 mb-4">
        收錄商品 ({brandProducts.length})
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {brandProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
