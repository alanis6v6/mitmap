import type { Brand } from "@/data/types";
import { AccentLink } from "./AccentLink";

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <article className="panel-card p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="heading-sub">
          <AccentLink to={`/brands/${brand.slug}`}>{brand.name}</AccentLink>
        </h3>
        <span
          className={`verify-badge ${
            brand.merchantConfirmed
              ? "border-chip-green text-chip-green bg-chip-green/10"
              : "border-ink/30 text-ink/50 bg-ink/5"
          }`}
        >
          {brand.merchantConfirmed ? "商家已確認" : "待商家確認"}
        </span>
      </div>
      <p className="text-body">{brand.description}</p>
    </article>
  );
}
