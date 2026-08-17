import { AccentLink } from "./AccentLink";

export default function SiteFooter() {
  return (
    <footer className="mt-16 mb-6 hidden flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left md:flex">
      <div>
        <p className="stamp-text text-accent">佇遮 tī-tsia</p>
        <p className="text-lede">台灣囡仔、台灣製造，就在這裡。</p>
      </div>
      <div className="flex items-center gap-5 text-sm">
        <AccentLink to="/about">收錄標準</AccentLink>
        <AccentLink to="/submit">推薦品牌</AccentLink>
        <AccentLink to="/report">回報爭議</AccentLink>
      </div>
      <p className="text-hint">資料為示範用假資料 · SCAFFOLD BUILD</p>
    </footer>
  );
}
