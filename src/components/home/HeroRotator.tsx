import { useEffect, useMemo, useState } from "react";
import { AccentLink } from "@/components/AccentLink";
import { LocateIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { useGeolocation } from "@/hooks/useGeolocation";
import { haversineDistanceKm } from "@/lib/geo";
import { products, getBrand } from "@/data/mock";
import type { Product } from "@/data/types";

const ROTATE_MS = 6000;

function NearestSlide() {
  const { status, coords, request } = useGeolocation();

  const nearest = useMemo(() => {
    if (!coords) return null;
    let best: { product: Product; distanceKm: number } | null = null;
    for (const product of products) {
      const { lat, lng } = product.location;
      if (lat == null || lng == null) continue;
      const distanceKm = haversineDistanceKm(coords, { lat, lng });
      if (!best || distanceKm < best.distanceKm) best = { product, distanceKm };
    }
    return best;
  }, [coords]);

  if (status === "idle" || status === "loading") {
    return (
      <div className="flex flex-col gap-3">
        <span className="verify-badge border-white/40 text-white w-fit">距離最近</span>
        <h2 className="heading-hero text-white">
          離你最近的
          <br />
          台灣製造在哪？
        </h2>
        <p className="text-sm text-white/70 max-w-xs">
          允許定位，幫你從收錄商品裡找出製造地離你最近的一件。
        </p>
        <button
          type="button"
          onClick={request}
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 mt-2 w-fit rounded-full bg-white/15 hover:bg-white/25 transition-colors px-4 py-2 text-sm text-white disabled:opacity-60"
        >
          <LocateIcon className="w-4 h-4" />
          {status === "loading" ? "定位中…" : "找出最近的商品"}
        </button>
      </div>
    );
  }

  if (status === "denied" || status === "unsupported" || !nearest) {
    return (
      <div className="flex flex-col gap-3">
        <span className="verify-badge border-white/40 text-white w-fit">距離最近</span>
        <h2 className="heading-hero text-white">找不到你的位置</h2>
        <p className="text-sm text-white/70 max-w-xs">
          {status === "unsupported"
            ? "這個瀏覽器不支援定位功能。"
            : "沒有取得定位權限，先去逛逛全部收錄商品吧。"}
        </p>
        <AccentLink
          to="/find"
          className="inline-block mt-2 w-fit rounded-full bg-white/15 px-4 py-2 text-sm text-white"
        >
          看全部商品 →
        </AccentLink>
      </div>
    );
  }

  const brand = getBrand(nearest.product.brandId);
  return (
    <div className="flex flex-col gap-3">
      <span className="verify-badge border-white/40 text-white w-fit">
        距離最近 · {nearest.distanceKm.toFixed(0)} 公里
      </span>
      <h2 className="heading-hero text-white">{nearest.product.name}</h2>
      <p className="text-sm text-white/70 max-w-xs">
        {brand?.name ?? "未知品牌"} · {nearest.product.location.county}
        {nearest.product.location.cluster ? ` · ${nearest.product.location.cluster}` : ""}
      </p>
      <AccentLink
        to={`/products/${nearest.product.slug}`}
        className="inline-block mt-2 w-fit rounded-full bg-white/15 px-4 py-2 text-sm text-white"
      >
        看商品詳情 →
      </AccentLink>
    </div>
  );
}

function SeasonalSlide() {
  const featured = products[0];
  const brand = getBrand(featured.brandId);
  return (
    <div className="flex flex-col gap-3">
      <span className="verify-badge border-white/40 text-white w-fit">本季推薦</span>
      <h2 className="heading-hero text-white">{featured.name}</h2>
      <p className="text-sm text-white/70 max-w-xs">
        {brand?.name ?? "未知品牌"} · {featured.description}
      </p>
      <AccentLink
        to={`/products/${featured.slug}`}
        className="inline-block mt-2 w-fit rounded-full bg-white/15 px-4 py-2 text-sm text-white"
      >
        看商品詳情 →
      </AccentLink>
    </div>
  );
}

function AdSlide() {
  return (
    <div className="flex flex-col gap-3">
      <span className="verify-badge border-white/40 text-white w-fit">廣告</span>
      <h2 className="heading-hero text-white">
        這裡留給
        <br />
        台灣製品牌
      </h2>
      <p className="text-sm text-white/70 max-w-xs">
        [ 廣告位 · AD SLOT ] 之後開放品牌合作曝光，串接真實廣告資料。
      </p>
    </div>
  );
}

const SLIDES = [
  { key: "seasonal", render: () => <SeasonalSlide /> },
  { key: "ad", render: () => <AdSlide /> },
  { key: "nearest", render: () => <NearestSlide /> },
];

export default function HeroRotator({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[index];

  return (
    <div
      className={`relative overflow-hidden rounded-xl3 bg-accent p-6 sm:p-8 min-h-[280px] flex flex-col justify-between shadow-soft ${className}`}
    >
      <div key={slide.key}>{slide.render()}</div>

      <div className="flex items-center gap-3 mt-4">
        <button
          type="button"
          aria-label="上一則"
          onClick={() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)}
          className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.key}
              type="button"
              aria-label={`第 ${i + 1} 則`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="下一則"
          onClick={() => setIndex((i) => (i + 1) % SLIDES.length)}
          className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
