import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";
import {
  HomeIcon,
  SearchIcon,
  MapPinIcon,
  InfoIcon,
  PlusCircleIcon,
  FlagIcon,
} from "./icons";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS: { to: string; label: string; icon: (props: { className?: string }) => ReactNode }[] = [
  { to: "/", label: "首頁", icon: (p) => <HomeIcon {...p} /> },
  { to: "/find", label: "找商品", icon: (p) => <SearchIcon {...p} /> },
  { to: "/regions", label: "找地方", icon: (p) => <MapPinIcon {...p} /> },
  { to: "/about", label: "收錄標準", icon: (p) => <InfoIcon {...p} /> },
  { to: "/submit", label: "推薦品牌", icon: (p) => <PlusCircleIcon {...p} /> },
  { to: "/report", label: "回報爭議", icon: (p) => <FlagIcon {...p} /> },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col items-center justify-between w-20 shrink-0 py-6 sticky top-6 h-[calc(100vh-3rem)] rounded-xl3 bg-sidebar text-white shadow-soft">
      <div className="flex flex-col items-center gap-8">
        <NavLink to="/" aria-label="佇遮 tī-tsia 首頁" className="stamp-text text-2xl">
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
                `flex items-center justify-center w-11 h-11 rounded-xl2 transition-colors duration-150 ${
                  isActive ? "bg-white/20" : "hover:bg-white/10 text-white/75"
                }`
              }
            >
              {item.icon({ className: "w-5 h-5" })}
            </NavLink>
          ))}
        </nav>
      </div>

      <ThemeToggle variant="sidebar" />
    </aside>
  );
}
