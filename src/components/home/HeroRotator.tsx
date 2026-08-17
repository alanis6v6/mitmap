import { useEffect, useState } from "react";
import { AccentLink } from "@/components/AccentLink";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { products, brands, getBrand } from "@/data/mock";

const ROTATE_MS = 6000;

function SeasonalSlide() {
  const featured = products[0];
  const brand = getBrand(featured.brandId);
  return (
    <div className="flex flex-col gap-3">
      <span className="verify-badge border-white/40 text-white w-fit">當季推薦</span>
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

function ManufacturerSlide() {
  const featured = brands[0];
  return (
    <div className="flex flex-col gap-3">
      <span className="verify-badge border-white/40 text-white w-fit">台製廠商</span>
      <h2 className="heading-hero text-white">{featured.name}</h2>
      <p className="text-sm text-white/70 max-w-xs">{featured.description}</p>
      <AccentLink
        to={`/brands/${featured.slug}`}
        className="inline-block mt-2 w-fit rounded-full bg-white/15 px-4 py-2 text-sm text-white"
      >
        看品牌詳情 →
      </AccentLink>
    </div>
  );
}

function ShopeeSlide() {
  return (
    <div className="flex flex-col gap-3">
      <span className="verify-badge border-white/40 text-white w-fit">蝦皮特搜</span>
      <h2 className="heading-hero text-white">
        上架平台的
        <br />
        台製好物特搜
      </h2>
      <p className="text-sm text-white/70 max-w-xs">
        [ 蝦皮特搜位 · SHOPEE SLOT ] 之後串接關聯行銷連結，帶已查核的台製商品去蝦皮。
      </p>
    </div>
  );
}

function MapSlide() {
  return (
    <div className="flex flex-col gap-3">
      <span className="verify-badge border-white/40 text-white w-fit">地圖</span>
      <h2 className="heading-hero text-white">
        避雷還是推薦？
        <br />
        地圖說了算
      </h2>
      <p className="text-sm text-white/70 max-w-xs">
        [ 地圖插槽 · MAP SLOT ] 這個分類還沒做，之後會在地圖上標出避雷店家與推薦店家。
      </p>
    </div>
  );
}

const SLIDES = [
  { key: "seasonal", render: () => <SeasonalSlide /> },
  { key: "manufacturer", render: () => <ManufacturerSlide /> },
  { key: "shopee", render: () => <ShopeeSlide /> },
  { key: "map", render: () => <MapSlide /> },
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
      className={`neon-frame relative overflow-hidden rounded-xl3 bg-accent p-6 sm:p-8 min-h-[280px] flex flex-col justify-between shadow-soft ${className}`}
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
