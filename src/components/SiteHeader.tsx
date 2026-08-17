import { NeonLink } from "./NeonLink";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="border-b border-ink/10 bg-paper/95 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between gap-4">
        <NeonLink to="/" className="flex items-baseline gap-2">
          <span className="stamp-text text-2xl text-tile-red">台製</span>
          <span className="font-display font-bold text-lg tracking-wide">誌</span>
        </NeonLink>

        <nav className="hidden md:flex items-center gap-7 font-body text-sm">
          <NeonLink to="/find">找商品</NeonLink>
          <NeonLink to="/regions">找地方</NeonLink>
          <NeonLink to="/about">收錄標準</NeonLink>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NeonLink
            to="/find"
            className="md:hidden verify-badge border-tile-red text-tile-red"
          >
            找商品
          </NeonLink>
        </div>
      </div>
    </header>
  );
}
