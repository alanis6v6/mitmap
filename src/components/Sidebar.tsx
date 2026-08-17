import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";
import {
  HomeIcon,
  SearchIcon,
  MapPinIcon,
  InfoIcon,
  PlusCircleIcon,
  FlagIcon,
  PanelRightIcon,
} from "./icons";
import ThemeToggle from "./ThemeToggle";
import { useProfilePanel } from "./ProfilePanelProvider";

const NAV_ITEMS: { to: string; label: string; icon: (props: { className?: string }) => ReactNode }[] = [
  { to: "/", label: "首頁", icon: (p) => <HomeIcon {...p} /> },
  { to: "/find", label: "找商品", icon: (p) => <SearchIcon {...p} /> },
  { to: "/regions", label: "找地方", icon: (p) => <MapPinIcon {...p} /> },
  { to: "/about", label: "收錄標準", icon: (p) => <InfoIcon {...p} /> },
  { to: "/submit", label: "推薦品牌", icon: (p) => <PlusCircleIcon {...p} /> },
  { to: "/report", label: "回報爭議", icon: (p) => <FlagIcon {...p} /> },
];

export default function Sidebar() {
  const { collapsed, toggle } = useProfilePanel();

  return (
    <aside className="neon-frame hidden md:flex flex-col items-center justify-between w-20 lg:w-24 shrink-0 py-7 sticky top-0 h-[calc(100vh-2rem)] lg:h-[calc(100vh-2.5rem)] bg-sidebar text-white">
      {/* 網站名稱永遠固定在最上面，不受下方收合功能影響 */}
      <NavLink
        to="/"
        aria-label="佇遮 tī-tsia 首頁"
        className="stamp-text flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl text-sidebar shadow-card"
      >
        佇
      </NavLink>

      <nav className="flex flex-col items-center gap-1" aria-label="主要導覽">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            aria-label={item.label}
            title={item.label}
            className={({ isActive }) =>
              `group relative flex items-center justify-center w-11 h-11 rounded-xl2 transition-all duration-150 ${
                isActive ? "bg-white text-sidebar shadow-card" : "hover:bg-white/10 text-white/70 hover:text-white"
              }`
            }
          >
            {item.icon({ className: "w-5 h-5" })}
          </NavLink>
        ))}
      </nav>

      <div className="flex flex-col items-center gap-3">
        <ThemeToggle variant="sidebar" />
        <button
          type="button"
          onClick={toggle}
          aria-pressed={collapsed}
          aria-label={collapsed ? "展開個人面板" : "收合個人面板"}
          title={collapsed ? "展開個人面板" : "收合個人面板"}
          className={`flex items-center justify-center w-9 h-9 rounded-xl2 transition-colors duration-150 ${
            collapsed ? "bg-white/25 text-white" : "text-white/60 hover:bg-white/10"
          }`}
        >
          <PanelRightIcon className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
