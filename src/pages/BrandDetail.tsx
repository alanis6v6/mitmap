import { useParams, Link } from "react-router-dom";
import { brands, products } from "@/data/mock";
import ProductCard from "@/components/ProductCard";
import { AccentAnchor, AccentLink } from "@/components/AccentLink";

export default function BrandDetail() {
  const { slug } = useParams();
  const brand = brands.find((b) => b.slug === slug);

  if (!brand) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <p className="text-ink/50">找不到這個品牌。</p>
        <AccentLink to="/find">回找商品 →</AccentLink>
      </div>
    );
  }

  const brandProducts = products.filter((p) => p.brandId === brand.id);

  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-meta mb-2">
        <Link to="/find" className="hover:text-accent">
          找商品
        </Link>{" "}
        / 品牌
      </p>

      <div className="flex items-start justify-between gap-3 mb-2">
        <h1 className="heading-page">{brand.name}</h1>
        <span
          className={`verify-badge ${
            brand.merchantConfirmed
              ? "border-chip-green text-chip-green bg-chip-green/10"
              : "border-ink/30 text-ink/50 bg-ink/5"
          }`}
        >
          {brand.merchantConfirmed ? "商家已確認" : "待商家確認"}
        </span>
      </div>

      <p className="text-prose mb-2 max-w-2xl">{brand.description}</p>
      {brand.website && (
        <AccentAnchor href={brand.website} className="text-sm">
          品牌官網 ↗
        </AccentAnchor>
      )}

      <h2 className="heading-section mt-10 mb-4">
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
