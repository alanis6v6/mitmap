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
      className="neon-frame md:hidden fixed bottom-3 left-3 right-3 z-30 flex items-center justify-around rounded-xl3 bg-sidebar text-white shadow-soft px-2 py-2"
      aria-label="主要導覽"
    >
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl2 text-[10px] ${
              isActive ? "bg-white/20" : "text-white/75"
            }`
          }
        >
          <Icon className="w-5 h-5" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
