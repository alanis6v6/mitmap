import type { Brand } from "@/data/types";
import { NeonLink } from "./NeonLink";

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <article className="tile-card p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg">
          <NeonLink to={`/brands/${brand.slug}`}>{brand.name}</NeonLink>
        </h3>
        <span
          className={`verify-badge ${
            brand.merchantConfirmed
              ? "border-tile-green text-tile-green bg-tile-green/10"
              : "border-ink/30 text-ink/50 bg-ink/5"
          }`}
        >
          {brand.merchantConfirmed ? "商家已確認" : "待商家確認"}
        </span>
      </div>
      <p className="text-sm text-ink/70 leading-relaxed">{brand.description}</p>
    </article>
  );
}
