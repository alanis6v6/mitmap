import type { OriginClassification } from "@/data/types";

const LABELS: Record<OriginClassification, string> = {
  complete: "完全台灣製",
  substantial_transformation: "台灣製・實質轉型",
  partial_process: "部分台灣工序",
  unverified: "待查核",
  disputed: "爭議待查",
};

const STYLES: Record<OriginClassification, string> = {
  complete: "bg-chip-green/15 border-chip-green text-chip-green",
  substantial_transformation: "bg-chip-blue/15 border-chip-blue text-chip-blue",
  partial_process: "bg-chip-gold/15 border-chip-gold text-chip-gold",
  unverified: "bg-ink/5 border-ink/30 text-ink/60",
  disputed: "bg-accent/15 border-accent text-accent",
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
