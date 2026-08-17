import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { AccentLink } from "@/components/AccentLink";
import { useFavorites } from "@/components/FavoritesProvider";
import OriginBadge from "@/components/OriginBadge";
import {
  HeartIcon,
  InfoIcon,
  MapPinIcon,
  PlusCircleIcon,
  SearchIcon,
} from "@/components/icons";
import { categories, getBrand, getCategory, products } from "@/data/mock";

type MobileHomeProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const QUICK_LINKS = [
  { to: "/find", label: "找商品", icon: SearchIcon, tone: "bg-chip-blue/15 text-chip-blue" },
  { to: "/regions", label: "找地方", icon: MapPinIcon, tone: "bg-chip-green/15 text-chip-green" },
  { to: "/about", label: "看標準", icon: InfoIcon, tone: "bg-chip-gold/15 text-chip-gold" },
  { to: "/submit", label: "推薦品牌", icon: PlusCircleIcon, tone: "bg-chip-rose/15 text-chip-rose" },
];

const CATEGORY_TONES = [
  "bg-chip-rose",
  "bg-chip-blue",
  "bg-chip-green",
  "bg-chip-gold",
];

export default function MobileHome({ query, onQueryChange, onSubmit }: MobileHomeProps) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const displayName = user?.name?.trim().split(/\s+/)[0] || "訪客";

  return (
    <div className="flex flex-col gap-8 pb-4">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-meta mb-1 tracking-[0.16em] text-accent">MIT SELECT</p>
          <h1 className="font-display text-[1.75rem] font-black leading-tight">嗨，{displayName}</h1>
          <p className="mt-1 text-sm text-ink/50">今天想找哪一件台灣製？</p>
        </div>
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-panel font-display text-lg font-black text-accent ring-1 ring-ink/5"
          aria-label={`${displayName}的個人圖示`}
        >
          {displayName.slice(0, 1)}
        </div>
      </header>

      <form
        onSubmit={onSubmit}
        className="flex items-center gap-3 rounded-full border border-ink/10 bg-panel p-2 pl-4 shadow-card focus-within:border-accent/40 focus-within:bg-surface"
      >
        <SearchIcon className="h-5 w-5 shrink-0 text-ink/35" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="搜尋商品、品牌或地方"
          aria-label="搜尋商品、品牌或地方"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-ink/35"
        />
        <button
          type="submit"
          aria-label="搜尋"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-accent"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
      </form>

      <nav className="grid grid-cols-4 gap-2" aria-label="首頁快捷入口">
        {QUICK_LINKS.map(({ to, label, icon: Icon, tone }) => (
          <Link key={to} to={to} className="flex min-w-0 flex-col items-center gap-2 text-center">
            <span className={`flex h-13 w-13 items-center justify-center rounded-2xl ${tone}`}>
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-[11px] font-bold text-ink/65">{label}</span>
          </Link>
        ))}
      </nav>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-meta mb-1 text-accent">POPULAR</p>
            <h2 className="heading-section">熱門分類</h2>
          </div>
          <AccentLink to="/find" className="text-xs font-bold">
            全部分類 →
          </AccentLink>
        </div>
        <div className="mobile-hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1">
          {categories.slice(0, 4).map((category, index) => {
            const count = products.filter((product) => product.categoryId === category.id).length;
            return (
              <Link
                key={category.id}
                to={`/find?category=${category.slug}`}
                className={`flex min-h-[180px] w-[68vw] max-w-[270px] shrink-0 snap-start flex-col justify-between rounded-xl3 p-5 text-white shadow-card ${CATEGORY_TONES[index]}`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-white/65">0{index + 1}</span>
                  <span className="rounded-full border border-white/30 px-2.5 py-1 text-[10px]">
                    {count || "尚無"} 件收錄
                  </span>
                </div>
                <div>
                  <p className="mb-1 text-xs text-white/65">台灣製好物</p>
                  <h3 className="font-display text-3xl font-black">{category.name}</h3>
                  <p className="mt-3 text-xs font-bold">查看分類 →</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="heading-section">近期收錄</h2>
          <AccentLink to="/find" className="text-xs font-bold">
            看全部 →
          </AccentLink>
        </div>
        <div className="flex flex-col gap-3">
          {products.slice(0, 3).map((product) => {
            const category = getCategory(product.categoryId);
            const brand = getBrand(product.brandId);
            const favorited = isFavorite(product.id);
            return (
              <article key={product.id} className="rounded-xl2 border border-ink/10 bg-surface p-4 shadow-card">
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-meta mb-1 text-accent">{category?.name}</p>
                    <h3 className="font-display text-lg font-bold leading-snug">
                      <AccentLink to={`/products/${product.slug}`}>{product.name}</AccentLink>
                    </h3>
                    <p className="mobile-clamp mt-2 text-sm leading-relaxed text-ink/55">
                      {product.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(product.id)}
                    aria-pressed={favorited}
                    aria-label={favorited ? "取消收藏" : "加入收藏"}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-panel ${
                      favorited ? "text-accent" : "text-ink/30"
                    }`}
                  >
                    <HeartIcon filled={favorited} className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-ink/10 pt-3">
                  <span className="truncate text-xs text-ink/45">
                    {brand?.name} · {product.location.county}
                  </span>
                  <OriginBadge classification={product.origin.classification} />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl3 bg-panel p-5">
        <p className="text-meta mb-2 text-accent">30 秒看懂</p>
        <h2 className="font-display text-lg font-bold">台灣製，不一定等於原料全在台灣</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/55">
          我們把完全生產、實質轉型與部分台灣工序分開標示，讓產地資訊更好判斷。
        </p>
        <AccentLink to="/about" className="mt-4 inline-block text-sm font-bold">
          看收錄標準 →
        </AccentLink>
      </section>
    </div>
  );
}
