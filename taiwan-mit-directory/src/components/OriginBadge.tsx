import type { OriginClassification } from "@/data/types";

const LABELS: Record<OriginClassification, string> = {
  complete: "完全台灣製",
  substantial_transformation: "台灣製・實質轉型",
  partial_process: "部分台灣工序",
  unverified: "待查核",
  disputed: "爭議待查",
};

const STYLES: Record<OriginClassification, string> = {
  complete: "bg-tile-green/15 border-tile-green text-tile-green",
  substantial_transformation: "bg-tile-blue/15 border-tile-blue text-tile-blue",
  partial_process: "bg-tile-gold/15 border-tile-gold text-tile-gold",
  unverified: "bg-ink/5 border-ink/30 text-ink/60",
  disputed: "bg-tile-red/15 border-tile-red text-tile-red",
};

export default function OriginBadge({
  classification,
}: {
  classification: OriginClassification;
}) {
  return (
    <span className={`verify-badge ${STYLES[classification]}`}>
      {LABELS[classification]}
    </span>
  );
}
