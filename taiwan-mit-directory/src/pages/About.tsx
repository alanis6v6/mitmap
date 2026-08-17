const STATUS_LEGEND = [
  { label: "完全台灣製", desc: "原料到製造皆在台灣境內取得或完成。" },
  { label: "台灣製・實質轉型", desc: "進口原料，但稅則號列改變／附加價值率逾35%／符合公告重要製程。" },
  { label: "部分台灣工序", desc: "僅部分工序在台灣完成，未達法定實質轉型門檻，誠實標註不算數。" },
  { label: "待查核", desc: "社群線索或商家自述，尚未完成查核。" },
  { label: "爭議待查", desc: "收到具體產地爭議回報，查核期間僅供參考。" },
];

export default function About() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <h1 className="heading-page mb-6">收錄標準</h1>

      <section className="mb-10">
        <h2 className="heading-sub mb-3">查核狀態怎麼讀</h2>
        <ul className="flex flex-col gap-3">
          {STATUS_LEGEND.map((s) => (
            <li key={s.label} className="tile-card p-3">
              <p className="font-bold text-sm">{s.label}</p>
              <p className="text-xs text-ink/60 mt-1">{s.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="heading-sub mb-3">法規依據</h2>
        <p className="text-body">
          依《原產地證明書及加工證明書管理辦法》第3條、第5條，輸出貨品以台灣為原產地，
          須符合「完全取得或完全生產」，或「原材料涉及台灣與其他國家共同參與、且在台灣
          境內產生最終實質轉型」。實質轉型指原材料加工後的貨品與原材料歸屬之海關進口稅則
          前六位碼號列相異；若號列未改變，則需附加價值率超過35%，或符合貿易署公告之重要
          製程。
        </p>
      </section>
    </div>
  );
}
