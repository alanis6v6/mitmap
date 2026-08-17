import { useRef } from "react";
import ProductCard from "@/components/ProductCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import type { Product } from "@/data/types";

export default function ProductCarousel({ products }: { products: Product[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>("[data-carousel-item]");
    const step = (card?.offsetWidth ?? 260) + 16;
    scroller.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  if (products.length === 0) {
    return <p className="text-lede">目前沒有可以顯示的商品。</p>;
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div
            key={product.id}
            data-carousel-item
            className="snap-start shrink-0 w-[260px] sm:w-[280px]"
          >
            <ProductCard product={product} className="h-full" />
          </div>
        ))}
      </div>

      {products.length > 1 && (
        <div className="flex items-center gap-2 mt-2">
          <button
            type="button"
            aria-label="往前"
            onClick={() => scrollByCard(-1)}
            className="w-8 h-8 rounded-full bg-surface border border-ink/10 shadow-card flex items-center justify-center hover:text-accent transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="往後"
            onClick={() => scrollByCard(1)}
            className="w-8 h-8 rounded-full bg-surface border border-ink/10 shadow-card flex items-center justify-center hover:text-accent transition-colors"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
