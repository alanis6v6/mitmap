import TileMosaic from "@/components/TileMosaic";
import ProductCard from "@/components/ProductCard";
import { NeonLink } from "@/components/NeonLink";
import { categories, products } from "@/data/mock";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <TileMosaic />

      <section className="mt-16">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display font-bold text-xl">依類別找</h2>
          <NeonLink to="/find" className="text-sm">
            看全部商品 →
          </NeonLink>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <NeonLink
              key={c.id}
              to={`/find?category=${c.slug}`}
              className="verify-badge border-ink/20 text-ink/70"
            >
              {c.name}
            </NeonLink>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display font-bold text-xl mb-4">近期收錄</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mt-16 tile-floor border border-ink/10 rounded-sm p-6 sm:p-8">
        <p className="font-mono text-xs text-tile-red mb-2">法規小知識</p>
        <h2 className="font-display font-bold text-xl mb-3">
          台灣製，不代表原料一定是台灣的
        </h2>
        <p className="text-sm text-ink/70 leading-relaxed max-w-2xl">
          依《原產地證明書及加工證明書管理辦法》，台灣製分為「完全生產」與「加工後
          於台灣境內產生實質轉型」兩種——實質轉型指稅則號列改變，或未改變但附加價值率
          超過35%／符合公告重要製程。這代表進口原料只要加工程度足夠，仍可標示台灣製；
          我們的查核就是把這條界線標清楚，而不是模糊它。
        </p>
        <NeonLink to="/about" className="inline-block mt-4 font-bold text-sm">
          看完整收錄標準 →
        </NeonLink>
      </section>
    </div>
  );
}
