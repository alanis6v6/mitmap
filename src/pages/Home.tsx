import { FormEvent, useMemo, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AccentLink } from "@/components/AccentLink";
import OriginBadge from "@/components/OriginBadge";
import ProductCard from "@/components/ProductCard";
import ProfilePanel from "@/components/home/ProfilePanel";
import { useProfilePanel } from "@/components/ProfilePanelProvider";
import { SearchIcon } from "@/components/icons";
import {
  categories,
  getBrand,
  getCategory,
  products,
  regionClusters,
} from "@/data/mock";
import type { Product } from "@/data/types";

const STORY_COPY: Record<
  Product["origin"]["classification"],
  { material: string; process: string; verdict: string }
> = {
  complete: {
    material: "原料與核心材料來自在地供應鏈",
    process: "主要製程皆於台灣完成",
    verdict: "從來源到製造，都能在島內追溯",
  },
  substantial_transformation: {
    material: "部分原料來自海外",
    process: "在台灣完成足以改變產品性質的關鍵製程",
    verdict: "符合實質轉型，清楚標示進口原料",
  },
  partial_process: {
    material: "核心零件或原料來自海外",
    process: "台灣負責組裝、品檢或部分後段工序",
    verdict: "有台灣工序，但不等同完整台灣製造",
  },
  unverified: {
    material: "來源資訊仍待補齊",
    process: "製程尚無足夠公開資料可交叉確認",
    verdict: "保留問號，等待更多證據",
  },
  disputed: {
    material: "現有來源出現互相矛盾的說法",
    process: "查核團隊正在重新確認製造環節",
    verdict: "爭議未釐清前，不先替商品下定論",
  },
};

function padNumber(value: number) {
  return String(value).padStart(2, "0");
}

export default function Home() {
  const navigate = useNavigate();
  const { collapsed } = useProfilePanel();
  const [query, setQuery] = useState("");
  const [activeProductId, setActiveProductId] = useState(products[0]?.id ?? "");

  const activeProduct = useMemo(
    () => products.find((product) => product.id === activeProductId) ?? products[0],
    [activeProductId],
  );

  if (!activeProduct) return null;

  const activeBrand = getBrand(activeProduct.brandId);
  const activeCategory = getCategory(activeProduct.categoryId);
  const story = STORY_COPY[activeProduct.origin.classification];
  const verifiedCount = products.filter(
    (product) =>
      product.origin.classification === "complete" ||
      product.origin.classification === "substantial_transformation",
  ).length;

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const keyword = query.trim();
    navigate(keyword ? `/find?q=${encodeURIComponent(keyword)}` : "/find");
  };

  const moveProductTab = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const isNext = event.key === "ArrowRight" || event.key === "ArrowDown";
    const isPrevious = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!isNext && !isPrevious && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? products.length - 1
        : (index + (isNext ? 1 : -1) + products.length) % products.length;
    setActiveProductId(products[nextIndex].id);
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("[role='tab']");
    tabs?.[nextIndex]?.focus();
  };

  return (
    <div className="story-home">
      <nav className="story-chapter-nav" aria-label="首頁章節">
        <a href="#opening"><span>00</span><b>起點</b></a>
        <a href="#journey"><span>01</span><b>路徑</b></a>
        <a href="#places"><span>02</span><b>地方</b></a>
        <a href="#collection"><span>03</span><b>目錄</b></a>
      </nav>

      <section id="opening" className="story-opening story-reveal" aria-labelledby="story-title">
        <div className="story-topline">
          <p>佇遮 TĪ-TSIA · TAIWAN MADE INDEX</p>
          <p>{padNumber(products.length)} 件商品，{padNumber(regionClusters.length)} 個地方故事</p>
        </div>

        <div className="story-opening-grid">
          <div>
            <p className="story-kicker"><span /> 從一件日常用品開始</p>
            <h1 id="story-title" className="story-title">
              每一件台灣製，
              <br />
              都有一條<span>回家的路。</span>
            </h1>
            <p className="story-intro">
              我們不只貼上一枚 MIT 標籤。沿著原料、工序與地方，
              把一件商品如何成為「台灣製」的過程，說清楚。
            </p>
          </div>

          <div className="story-opening-aside" aria-label="收錄摘要">
            <p className="story-vertical-note">SCROLL TO TRACE THE STORY</p>
            <div className="story-stat">
              <strong>{verifiedCount}</strong>
              <span>件已確認<br />台灣製程</span>
            </div>
            <div className="story-stat">
              <strong>{categories.length}</strong>
              <span>種日常<br />用品分類</span>
            </div>
          </div>
        </div>

        <div className="story-search-wrap">
          <form onSubmit={submitSearch} className="story-search">
            <SearchIcon className="h-5 w-5" />
            <label htmlFor="home-search" className="sr-only">搜尋商品、品牌或地方</label>
            <input
              id="home-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="輸入一件你正在找的東西"
            />
            <button type="submit">開始追溯 <span>↗</span></button>
          </form>
          <div className="story-quick-links" aria-label="熱門搜尋">
            <span>或從這裡開始</span>
            {categories.slice(0, 4).map((category) => (
              <Link key={category.id} to={`/find?category=${category.slug}`}>{category.name}</Link>
            ))}
          </div>
        </div>

        <a href="#journey" className="story-scroll-cue" aria-label="閱讀下一章">
          <span>下一章</span><i />
        </a>
      </section>

      <section id="journey" className="story-section story-journey" aria-labelledby="journey-title">
        <header className="story-section-header">
          <p><span>01</span> 一件商品的路徑</p>
          <div>
            <h2 id="journey-title">標籤只是一個答案，<br />過程才是故事。</h2>
            <p>點選一件商品，看看我們如何把製造資訊拆成四個可閱讀、可核對的環節。</p>
          </div>
        </header>

        <div className="story-product-tabs" role="tablist" aria-label="選擇商品故事">
          {products.map((product, index) => {
            const selected = product.id === activeProduct.id;
            return (
              <button
                key={product.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="product-story"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveProductId(product.id)}
                onKeyDown={(event) => moveProductTab(event, index)}
                className={selected ? "is-active" : ""}
              >
                <span>{padNumber(index + 1)}</span>
                <b>{product.name}</b>
              </button>
            );
          })}
        </div>

        <article id="product-story" className="story-trace" role="tabpanel">
          <div className="story-trace-lead">
            <p>{activeCategory?.name} · {activeBrand?.name}</p>
            <h3>{activeProduct.name}</h3>
            <p>{activeProduct.description}</p>
            <OriginBadge classification={activeProduct.origin.classification} />
          </div>

          <ol className="story-trace-steps">
            <li>
              <span>01</span>
              <div><small>材料 MATERIAL</small><p>{story.material}</p></div>
            </li>
            <li>
              <span>02</span>
              <div><small>製程 PROCESS</small><p>{story.process}</p></div>
            </li>
            <li>
              <span>03</span>
              <div>
                <small>地方 PLACE</small>
                <p>{activeProduct.location.county}{activeProduct.location.cluster ? `，${activeProduct.location.cluster}` : ""}</p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div><small>結論 VERDICT</small><p>{story.verdict}</p></div>
            </li>
          </ol>

          <Link className="story-round-link" to={`/products/${activeProduct.slug}`} aria-label={`查看${activeProduct.name}完整查核`}>
            完整<br />查核 <span aria-hidden="true">↗</span>
          </Link>
        </article>
      </section>

      <section id="places" className="story-section story-places" aria-labelledby="places-title">
        <header className="story-section-header story-section-header-light">
          <p><span>02</span> 製造發生的地方</p>
          <div>
            <h2 id="places-title">產業不是散落的點，<br />而是地方累積的手藝。</h2>
            <p>沒有地圖圖片，也能用距離、節奏與文字，讀出台灣製造的地景。</p>
          </div>
        </header>

        <div className="story-region-list">
          {regionClusters.map((region, index) => {
            const relatedCount = products.filter((product) => product.location.cluster === region.clusterName).length;
            return (
              <Link key={region.id} to={`/regions?q=${encodeURIComponent(region.clusterName)}`} className="story-region-row">
                <span className="story-region-index">{padNumber(index + 1)}</span>
                <div>
                  <small>{region.county}</small>
                  <h3>{region.clusterName}</h3>
                </div>
                <p>{region.description}</p>
                <div className="story-region-meter" aria-label={`目前收錄 ${relatedCount} 件`}>
                  <i style={{ "--meter": `${Math.max(24, relatedCount * 30)}%` } as CSSProperties} />
                  <span>{padNumber(relatedCount)} 件收錄</span>
                </div>
                <b>↗</b>
              </Link>
            );
          })}
        </div>

        <div className="story-place-footer">
          <p>從北到南，下一個值得被記住的地方，由你補上。</p>
          <AccentLink to="/submit">推薦一個品牌或聚落 →</AccentLink>
        </div>
      </section>

      <section id="collection" className="story-section story-collection" aria-labelledby="collection-title">
        <header className="story-section-header">
          <p><span>03</span> 把選擇帶回日常</p>
          <div>
            <h2 id="collection-title">知道從哪裡來，<br />才知道為什麼選。</h2>
            <p>每筆收錄都保留查核狀態；看得懂，也能繼續追問。</p>
          </div>
        </header>

        <div className={collapsed ? "story-collection-layout is-wide" : "story-collection-layout"}>
          <div className="story-product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} className="story-product-card" />
            ))}
            <Link to="/find" className="story-all-products">
              <span>完整目錄</span>
              <strong>{padNumber(products.length)}</strong>
              <p>依商品、原料分類或製造地區繼續探索 <b>↗</b></p>
            </Link>
          </div>
          {!collapsed && <ProfilePanel className="story-profile-panel" />}
        </div>
      </section>

      <footer className="story-endnote">
        <p>MADE HERE, TOLD CLEARLY.</p>
        <h2>台灣製，不該只是一句話。</h2>
        <AccentLink to="/about">閱讀我們的收錄與查核標準 →</AccentLink>
      </footer>
    </div>
  );
}
