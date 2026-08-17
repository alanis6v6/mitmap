import { NeonLink } from "./NeonLink";

/**
 * 首頁 Hero：仿花磚拼貼的不規則格狀排版（大小磚混排），
 * 呼應使用者提供的參考圖（花磚年節拼貼卡）。
 * 這是全站唯一大量用色的區塊，其餘頁面刻意收斂。
 */
export default function TileMosaic() {
  return (
    <div className="grid grid-cols-6 grid-rows-4 gap-2 h-[420px] sm:h-[480px]">
      <div className="col-span-6 sm:col-span-3 row-span-4 bg-tile-cream border border-ink/10 rounded-sm p-6 sm:p-8 flex flex-col justify-between">
        <span className="verify-badge border-tile-red text-tile-red w-fit">
          TAIWAN MADE · 查核所
        </span>
        <div>
          <h1 className="heading-hero text-ink">
            分清楚
            <br />
            原料在哪、
            <br />
            做在哪。
          </h1>
          <p className="mt-4 text-lede max-w-xs">
            台灣製不代表原料一定產自台灣——我們把「原料/製造分類」跟「製造地」
            分開標註，讓每一筆收錄都查得到來源。
          </p>
          <NeonLink
            to="/find"
            className="inline-block mt-5 font-display font-bold text-tile-red"
          >
            開始找台製商品 →
          </NeonLink>
        </div>
      </div>

      <div className="col-span-3 sm:col-span-2 row-span-2 bg-tile-green/80 rounded-sm p-4 flex flex-col justify-end text-paper">
        <span className="stamp-text text-3xl leading-none">完全</span>
        <span className="text-xs mt-1 opacity-80">原料到製造皆台灣境內</span>
      </div>

      <div className="col-span-3 sm:col-span-1 row-span-2 bg-tile-blue/85 rounded-sm p-4 flex flex-col justify-end text-paper">
        <span className="stamp-text text-2xl leading-none">實質轉型</span>
        <span className="text-xs mt-1 opacity-80">稅則變更／附加價值35%+</span>
      </div>

      <div className="hidden sm:block col-span-3 row-span-2 bg-tile-gold/80 rounded-sm p-4 flex flex-col justify-end text-paper">
        <span className="stamp-text text-2xl leading-none">部分工序</span>
        <span className="text-xs mt-1 opacity-80">未達實質轉型門檻，誠實標註</span>
      </div>

      <div className="col-span-6 sm:col-span-3 row-span-2 bg-ink rounded-sm p-4 flex flex-col justify-center items-center text-center">
        <span className="font-mono text-neon-cyan text-xs tracking-widest">
          MIT SMILE CERT
        </span>
        <span className="stamp-text text-paper text-xl mt-1">政府標章資料庫</span>
        <span className="text-paper/50 text-xs mt-1">同步比對，不重複認證</span>
      </div>
    </div>
  );
}
