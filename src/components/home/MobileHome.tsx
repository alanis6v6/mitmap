import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { AccentLink } from "@/components/AccentLink";
import { useFavorites } from "@/components/FavoritesProvider";
import OriginBadge from "@/components/OriginBadge";
import { useTheme } from "@/components/ThemeProvider";
import PopularCategoryStrip from "@/components/home/PopularCategoryStrip";
import {
  BoxIcon,
  CloseIcon,
  GridIcon,
  HeartIcon,
  MapPinIcon,
  MoonIcon,
  SearchIcon,
  StoreIcon,
  SunIcon,
} from "@/components/icons";
import {
  brands,
  categories,
  getBrand,
  getCategory,
  products,
  regionClusters,
} from "@/data/mock";

type SearchMode = "product" | "brand" | "category" | "region";

const SEARCH_MODES = [
  { key: "product" as const, label: "商品", icon: BoxIcon, tone: "bg-mobile-peach/55" },
  { key: "brand" as const, label: "品牌", icon: StoreIcon, tone: "bg-mobile-sky/55" },
  { key: "category" as const, label: "分類", icon: GridIcon, tone: "bg-mobile-lime/65" },
  { key: "region" as const, label: "地區", icon: MapPinIcon, tone: "bg-mobile-lilac/60" },
];

// 展開動畫：icon 位移 600ms 到位，搜尋列在到位前 0.5 秒（第 100ms～600ms）淡入完成。
const EXPAND_TRANSITION =
  "flex-grow 600ms cubic-bezier(0.22,1,0.36,1) 0ms, flex-basis 600ms cubic-bezier(0.22,1,0.36,1) 0ms, opacity 500ms ease 100ms";
const COLLAPSE_TRANSITION =
  "flex-grow 380ms cubic-bezier(0.22,1,0.36,1) 0ms, flex-basis 380ms cubic-bezier(0.22,1,0.36,1) 0ms, opacity 200ms ease 0ms";

export default function MobileHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { resolvedTheme, setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<SearchMode>("product");
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const snapRootRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<Array<HTMLElement | null>>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const displayName = user?.name?.trim().split(/\s+/)[0] || "訪客";
  const activeMode = SEARCH_MODES.find((item) => item.key === mode) ?? SEARCH_MODES[0];

  const suggestions = useMemo<Record<SearchMode, string[]>>(
    () => ({
      product: products.map((product) => product.name),
      brand: brands.map((brand) => brand.name),
      category: categories.map((category) => category.name),
      region: regionClusters.map((region) => `${region.county}・${region.clusterName}`),
    }),
    [],
  );
  const currentSuggestions = suggestions[mode];
  const currentSuggestion = currentSuggestions[suggestionIndex % currentSuggestions.length] ?? "台灣製";

  const popularCategories = useMemo(
    () =>
      categories.slice(0, 4).map((category) => ({
        id: category.id,
        slug: category.slug,
        name: category.name,
        count: products.filter((product) => product.categoryId === category.id).length,
      })),
    [],
  );

  useEffect(() => {
    setSuggestionIndex(0);
    if (!searchFocused || currentSuggestions.length < 2) return;
    const timer = window.setInterval(
      () => setSuggestionIndex((index) => (index + 1) % currentSuggestions.length),
      1800,
    );
    return () => window.clearInterval(timer);
  }, [currentSuggestions, mode, searchFocused]);

  useEffect(() => {
    const root = snapRootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const focused = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!focused) return;
        const index = Number((focused.target as HTMLElement).dataset.snapIndex ?? 0);
        setActivePage(index);
      },
      { root, threshold: [0.45, 0.6, 0.75] },
    );
    pageRefs.current.forEach((page) => page && observer.observe(page));
    return () => observer.disconnect();
  }, []);

  const selectMode = (nextMode: SearchMode) => {
    setMode(nextMode);
    setSuggestionIndex(0);
    setSearchExpanded(true);
    window.requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  const collapseSearch = () => {
    setSearchExpanded(false);
    setSearchFocused(false);
    setQuery("");
    searchInputRef.current?.blur();
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const term = query.trim() || currentSuggestion;
    if (mode === "region") {
      navigate(`/regions?q=${encodeURIComponent(term.replace("・", " "))}`);
      return;
    }
    navigate(`/find?q=${encodeURIComponent(term)}&scope=${mode}`);
  };

  const chooseSuggestion = () => {
    setQuery(currentSuggestion);
    searchInputRef.current?.focus();
  };

  const goToPage = (index: number) => {
    pageRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={snapRootRef} className="mobile-home-snap relative bg-mobile-bg">
      <aside className="fixed right-2 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2" aria-label="首頁段落">
        {[0, 1].map((index) => (
          <button
            key={index}
            type="button"
            aria-label={`前往第 ${index + 1} 張卡片`}
            aria-current={activePage === index ? "page" : undefined}
            onClick={() => goToPage(index)}
            className={`rounded-full transition-all ${
              activePage === index ? "h-6 w-2 bg-accent" : "h-2 w-2 bg-ink/20"
            }`}
          />
        ))}
      </aside>

      <section
        ref={(node) => { pageRefs.current[0] = node; }}
        data-snap-index="0"
        data-testid="mobile-snap-intro"
        className={`mobile-snap-page flex flex-col gap-5 px-5 pb-28 pt-[max(1.5rem,env(safe-area-inset-top))] ${
          activePage === 0 ? "is-active" : ""
        }`}
      >
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-meta mb-1 tracking-[0.16em] text-accent">MIT SELECT</p>
            <h1 className="font-display text-[1.75rem] font-black leading-tight">嗨，{displayName}</h1>
            <p className="mt-1 text-sm text-ink/50">今天想從哪裡開始找？</p>
          </div>
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
            aria-label={resolvedTheme === "light" ? "切換暗色主題" : "切換亮色主題"}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mobile-card text-ink shadow-card ring-1 ring-ink/5"
          >
            {resolvedTheme === "light" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
        </header>

        <div
          className={`rounded-[1.65rem] border bg-mobile-card p-2 shadow-card transition-all ${
            searchFocused ? "border-accent/35 shadow-soft" : "border-ink/8"
          }`}
        >
          <div className="flex items-center gap-1.5">
            {SEARCH_MODES.map(({ key, label, icon: Icon, tone }) => {
              const selected = mode === key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={selected}
                  aria-label={searchExpanded ? label : `搜尋${label}`}
                  onClick={() => selectMode(key)}
                  style={{
                    flexGrow: searchExpanded ? 0 : 1,
                    flexBasis: searchExpanded ? "2.75rem" : "0%",
                    transition: searchExpanded ? EXPAND_TRANSITION : COLLAPSE_TRANSITION,
                  }}
                  className="flex min-w-0 flex-col items-center gap-1.5 overflow-hidden text-center"
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all ${tone} ${
                      selected && searchExpanded ? "ring-2 ring-accent/35" : ""
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={`text-[11px] font-bold text-ink/60 transition-opacity duration-200 ${
                      searchExpanded ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              );
            })}

            <div
              style={{
                flexGrow: searchExpanded ? 1 : 0,
                flexBasis: 0,
                opacity: searchExpanded ? 1 : 0,
                pointerEvents: searchExpanded ? "auto" : "none",
                transition: searchExpanded ? EXPAND_TRANSITION : COLLAPSE_TRANSITION,
              }}
              className="min-w-0 overflow-hidden"
            >
              <form
                onSubmit={submitSearch}
                onFocusCapture={() => setSearchFocused(true)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setSearchFocused(false);
                }}
                className="flex items-center gap-2 pl-1"
              >
                <input
                  ref={searchInputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={searchFocused ? `例如：${currentSuggestion}` : `搜尋${activeMode.label}`}
                  aria-label={`搜尋${activeMode.label}`}
                  tabIndex={searchExpanded ? 0 : -1}
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-ink/35"
                />
                <button
                  type="button"
                  aria-label="收起搜尋"
                  tabIndex={searchExpanded ? 0 : -1}
                  onClick={collapseSearch}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink/40"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
                <button
                  type="submit"
                  aria-label="搜尋"
                  tabIndex={searchExpanded ? 0 : -1}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-accent"
                >
                  <SearchIcon className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>

          <button
            type="button"
            onClick={chooseSuggestion}
            tabIndex={searchExpanded && searchFocused ? 0 : -1}
            className={`grid w-full transition-all duration-300 ${
              searchExpanded && searchFocused ? "mt-1 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <span className="overflow-hidden">
              <span className="flex items-center justify-between border-t border-ink/8 px-3 pb-1 pt-2 text-left text-xs text-ink/45">
                <span>推薦搜尋</span>
                <strong className="font-bold text-accent" aria-live="polite">{currentSuggestion} ↗</strong>
              </span>
            </span>
          </button>
        </div>

        <section className="mt-auto">
          <div className="mb-3 flex items-end justify-between pr-3">
            <div>
              <p className="text-meta mb-1 text-accent">POPULAR</p>
              <h2 className="heading-section">熱門分類</h2>
            </div>
            <AccentLink to="/find" className="text-xs font-bold">全部分類 →</AccentLink>
          </div>
          <PopularCategoryStrip
            items={popularCategories}
          />
        </section>
      </section>

      <section
        ref={(node) => { pageRefs.current[1] = node; }}
        data-snap-index="1"
        data-testid="mobile-snap-recent"
        className={`mobile-snap-page flex flex-col bg-mobile-card px-5 pb-28 pt-[max(1.75rem,env(safe-area-inset-top))] ${
          activePage === 1 ? "is-active" : ""
        }`}
      >
        <header className="mb-5 flex items-end justify-between pr-3">
          <div>
            <p className="text-meta mb-1 text-accent">JUST IN</p>
            <h2 className="font-display text-[1.65rem] font-black">近期收錄</h2>
            <p className="mt-1 text-sm text-ink/45">一張一張，慢慢認識它們。</p>
          </div>
          <AccentLink to="/find" className="text-xs font-bold">看全部 →</AccentLink>
        </header>

        <div className="mobile-horizontal-snap -mx-5 flex flex-1 items-center gap-4 overflow-x-auto px-5 pb-4 pr-12">
          {products.map((product, index) => {
            const category = getCategory(product.categoryId);
            const brand = getBrand(product.brandId);
            const favorited = isFavorite(product.id);
            const isFeatured = index === 0;
            return (
              <article
                key={product.id}
                className={`flex shrink-0 snap-center snap-always flex-col justify-between rounded-[2rem] border border-ink/8 p-5 shadow-card ${
                  isFeatured
                    ? "h-[55vh] max-h-[440px] min-h-[340px] w-[78vw] max-w-[320px] bg-mobile-peach/70"
                    : "h-[43vh] max-h-[350px] min-h-[280px] w-[65vw] max-w-[280px] bg-mobile-bg"
                }`}
              >
                <div>
                  <div className="mb-8 flex items-start justify-between gap-3">
                    <span className="rounded-full bg-mobile-card/70 px-3 py-1.5 font-mono text-[10px] text-ink/55">{category?.name}</span>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(product.id)}
                      aria-pressed={favorited}
                      aria-label={favorited ? "取消收藏" : "加入收藏"}
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-mobile-card/70 ${favorited ? "text-accent" : "text-ink/35"}`}
                    >
                      <HeartIcon filled={favorited} className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mb-2 font-mono text-xs text-ink/40">0{index + 1} / 0{products.length}</p>
                  <h3 className={`font-display font-black leading-tight ${isFeatured ? "text-3xl" : "text-2xl"}`}>
                    <AccentLink to={`/products/${product.slug}`}>{product.name}</AccentLink>
                  </h3>
                  <p className="mobile-clamp mt-4 text-sm leading-relaxed text-ink/60">{product.description}</p>
                </div>
                <div>
                  <div className="mb-4 flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
                    <span className="truncate text-xs text-ink/45">{brand?.name} · {product.location.county}</span>
                    <OriginBadge classification={product.origin.classification} />
                  </div>
                  <AccentLink to={`/products/${product.slug}`} className="text-sm font-bold">查看商品詳情 →</AccentLink>
                </div>
              </article>
            );
          })}
        </div>

        <p className="pb-1 text-center font-mono text-[10px] tracking-[0.14em] text-ink/30">左右滑動看更多 · 向上滑回熱門分類</p>
      </section>
    </div>
  );
}
