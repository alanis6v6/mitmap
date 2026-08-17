import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroRotator from "@/components/home/HeroRotator";
import CategoryChipCarousel from "@/components/home/CategoryChipCarousel";
import ProductCarousel from "@/components/home/ProductCarousel";
import ProfilePanel from "@/components/home/ProfilePanel";
import { AccentLink } from "@/components/AccentLink";
import { useProfilePanel } from "@/components/ProfilePanelProvider";
import { products } from "@/data/mock";
import { SearchIcon } from "@/components/icons";

export default function Home() {
  const { collapsed } = useProfilePanel();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const keyword = query.trim();
    navigate(keyword ? `/find?q=${encodeURIComponent(keyword)}` : "/find");
  };

  return (
    <div
      className={`grid gap-7 ${
        collapsed
          ? ""
          : "lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px]"
      }`}
    >
      <div className="flex flex-col gap-8 min-w-0">
        <header className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-meta mb-2 tracking-[0.18em] text-accent">CURATED IN TAIWAN</p>
            <h1 className="heading-page max-w-xl">在台灣，找到認真做的好東西。</h1>
          </div>
          <form
            onSubmit={submitSearch}
            className="flex w-full max-w-xl items-center gap-3 rounded-full border border-ink/10 bg-panel px-4 py-3 transition focus-within:border-accent/50 focus-within:bg-surface focus-within:shadow-card"
          >
            <SearchIcon className="h-5 w-5 shrink-0 text-ink/40" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜尋商品、品牌或地方"
              aria-label="搜尋商品、品牌或地方"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-ink/35"
            />
            <button
              type="submit"
              className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-surface transition hover:bg-accent"
            >
              搜尋
            </button>
          </form>
        </header>

        <div className="flex flex-col sm:flex-row gap-3">
          <HeroRotator className="flex-1" />
          <CategoryChipCarousel className="sm:w-24 xl:w-28 shrink-0" />
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

      {!collapsed && <ProfilePanel className="h-fit lg:sticky lg:top-8" />}
    </div>
  );
}
