import { NeonLink } from "./NeonLink";

export default function SiteFooter() {
  return (
    <footer className="tile-floor border-t border-ink/10 mt-24">
      <div className="mx-auto max-w-6xl px-5 py-10 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <p className="stamp-text text-tile-red text-xl mb-2">台製誌</p>
          <p className="text-ink/60 leading-relaxed">
            蒐集、查核、標註台灣製商品與品牌。
            <br />
            不是商城，是查核所。
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-display font-bold mb-1">探索</span>
          <NeonLink to="/find">找商品</NeonLink>
          <NeonLink to="/regions">找地方</NeonLink>
          <NeonLink to="/about">收錄標準與查核狀態</NeonLink>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-display font-bold mb-1">參與</span>
          <NeonLink to="/submit">推薦台灣製品牌</NeonLink>
          <NeonLink to="/report">回報產地爭議</NeonLink>
        </div>
      </div>
      <div className="border-t border-ink/10 py-4 text-center text-xs text-ink/40 font-mono">
        資料為示範用假資料 · SCAFFOLD BUILD
      </div>
    </footer>
  );
}
