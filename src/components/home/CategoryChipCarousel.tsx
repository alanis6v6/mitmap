import { useEffect, useMemo, useState } from "react";
import { AccentLink } from "@/components/AccentLink";
import { categories } from "@/data/mock";

const CHIP_COLORS = ["bg-chip-green", "bg-chip-blue", "bg-chip-gold", "bg-chip-rose"];
const PAGE_SIZE = 4;
const ROTATE_MS = 4500;

export default function CategoryChipCarousel({ className = "" }: { className?: string }) {
  const pages = useMemo(() => {
    const chunks: (typeof categories)[number][][] = [];
    for (let i = 0; i < categories.length; i += PAGE_SIZE) {
      chunks.push(categories.slice(i, i + PAGE_SIZE));
    }
    return chunks;
  }, []);

  const [page, setPage] = useState(0);

  useEffect(() => {
    if (pages.length <= 1) return;
    const timer = setInterval(() => {
      setPage((p) => (p + 1) % pages.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [pages.length]);

  const visible = pages[page] ?? [];

  return (
    <div className={`flex flex-row sm:flex-col gap-2 ${className}`}>
      {visible.map((category, i) => (
        <AccentLink
          key={category.id}
          to={`/find?category=${category.slug}`}
          className={`category-chip flex-1 sm:flex-none sm:h-[63px] min-h-[63px] ${CHIP_COLORS[i % CHIP_COLORS.length]}`}
        >
          <span className="font-display font-bold text-sm leading-tight">
            {category.name}
          </span>
        </AccentLink>
      ))}
    </div>
  );
}
