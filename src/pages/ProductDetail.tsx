import { useParams, Link } from "react-router-dom";
import { products, getBrand, getCategory } from "@/data/mock";
import OriginBadge from "@/components/OriginBadge";
import { NeonLink, NeonAnchor } from "@/components/NeonLink";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="text-ink/50">找不到這個商品。</p>
        <NeonLink to="/find">回找商品 →</NeonLink>
      </div>
    );
  }

  const brand = getBrand(product.brandId);
  const category = getCategory(product.categoryId);
  const { origin, location } = product;

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <p className="text-meta mb-2">
        <Link to="/find" className="hover:text-tile-red">
          找商品
        </Link>{" "}
        / {category?.name}
      </p>

      <div className="flex items-start justify-between gap-3 mb-1">
        <h1 className="heading-page">{product.name}</h1>
        <OriginBadge classification={origin.classification} />
      </div>

      {brand && (
        <p className="text-lede mb-6">
          品牌：<NeonLink to={`/brands/${brand.slug}`}>{brand.name}</NeonLink>
        </p>
      )}

      <p className="text-prose mb-8">{product.description}</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <section className="tile-card p-4">
          <h2 className="heading-section mb-3">原料/製造分類</h2>
          {origin.sourceCountries && (
            <p className="text-sm mb-1">
              <span className="text-ink/50">原料來源國：</span>
              {origin.sourceCountries.join("、")}
            </p>
          )}
          {origin.taiwanProcessSteps && (
            <p className="text-sm mb-1">
              <span className="text-ink/50">台灣完成工序：</span>
              {origin.taiwanProcessSteps.join("、")}
            </p>
          )}
          {origin.otherCountries && (
            <p className="text-sm mb-1">
              <span className="text-ink/50">其餘來源國：</span>
              {origin.otherCountries.join("、")}
            </p>
          )}
          {origin.verifiedAt && (
            <p className="text-hint mt-3">
              最後查核：{origin.verifiedAt}
            </p>
          )}
          {origin.sourceLinks && origin.sourceLinks.length > 0 && (
            <div className="mt-3 flex flex-col gap-1">
              {origin.sourceLinks.map((link) => (
                <NeonAnchor key={link} href={link} className="text-xs">
                  查核來源 ↗
                </NeonAnchor>
              ))}
            </div>
          )}
        </section>

        <section className="tile-card p-4">
          <h2 className="heading-section mb-3">製造地</h2>
          <p className="text-sm">
            <span className="text-ink/50">縣市：</span>
            {location.county}
          </p>
          {location.cluster && (
            <p className="text-sm mt-1">
              <span className="text-ink/50">產業聚落：</span>
              {location.cluster}
            </p>
          )}
          {/* TODO(地圖): 若有 mapPlaceId / lat,lng，這裡改成內嵌小地圖或「在地圖上看」連結 */}
          <p className="text-hint mt-3">
            [ 之後接 Google Maps：以 location.lat / lng 或 mapPlaceId 呈現 ]
          </p>
        </section>
      </div>
    </div>
  );
}
