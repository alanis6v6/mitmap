import HeroRotator from "@/components/home/HeroRotator";
import CategoryChipCarousel from "@/components/home/CategoryChipCarousel";
import ProductCarousel from "@/components/home/ProductCarousel";
import ProfilePanel from "@/components/home/ProfilePanel";
import { AccentLink } from "@/components/AccentLink";
import { useProfilePanel } from "@/components/ProfilePanelProvider";
import { products } from "@/data/mock";

export default function Home() {
  const { collapsed } = useProfilePanel();

  return (
    <div className={`grid gap-6 items-start ${collapsed ? "" : "lg:grid-cols-[1fr_320px]"}`}>
      <div className="flex flex-col gap-8 min-w-0">
        <div className="flex flex-col sm:flex-row gap-3">
          <HeroRotator className="flex-1" />
          <CategoryChipCarousel className="sm:w-20 lg:w-24 shrink-0" />
        </div>

        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="heading-section">近期收錄</h2>
            <AccentLink to="/find" className="text-sm">
              看全部商品 →
            </AccentLink>
          </div>
          <ProductCarousel products={products} />
        </section>

        <section className="panel-card p-6 sm:p-8">
          <p className="text-meta text-accent mb-2">法規小知識</p>
          <h2 className="heading-section mb-3">台灣製，不代表原料一定是台灣的</h2>
          <p className="text-body max-w-2xl">
            依《原產地證明書及加工證明書管理辦法》，台灣製分為「完全生產」與「加工後
            於台灣境內產生實質轉型」兩種——實質轉型指稅則號列改變，或未改變但附加價值率
            超過35%／符合公告重要製程。這代表進口原料只要加工程度足夠，仍可標示台灣製；
            我們的查核就是把這條界線標清楚，而不是模糊它。
          </p>
          <AccentLink to="/about" className="inline-block mt-4 font-bold text-sm">
            看完整收錄標準 →
          </AccentLink>
        </section>
      </div>

      {!collapsed && <ProfilePanel className="lg:sticky lg:top-6" />}
    </div>
  );
}
