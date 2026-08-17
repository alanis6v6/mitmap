import { NavLink } from "react-router-dom";
import { HomeIcon, SearchIcon, MapPinIcon, InfoIcon, PlusCircleIcon } from "./icons";

const NAV_ITEMS = [
  { to: "/", label: "首頁", icon: HomeIcon, end: true },
  { to: "/find", label: "找商品", icon: SearchIcon, end: false },
  { to: "/regions", label: "找地方", icon: MapPinIcon, end: false },
  { to: "/about", label: "標準", icon: InfoIcon, end: false },
  { to: "/submit", label: "推薦", icon: PlusCircleIcon, end: false },
];

export default function MobileNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around rounded-t-[1.75rem] border-t border-ink/10 bg-surface/95 px-2 pb-3 pt-2 shadow-soft backdrop-blur md:hidden"
      aria-label="主要導覽"
    >
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className="flex min-w-[56px] flex-col items-center gap-0.5 py-1 text-[10px]"
        >
          {({ isActive }) => (
            <>
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                  isActive ? "bg-ink text-surface" : "text-ink/35"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
              </span>
              <span className={isActive ? "font-bold text-ink" : "text-ink/40"}>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
