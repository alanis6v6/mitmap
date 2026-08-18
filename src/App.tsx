import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import SiteFooter from "@/components/SiteFooter";
import Home from "@/pages/Home";
import Find from "@/pages/Find";
import Regions from "@/pages/Regions";
import ProductDetail from "@/pages/ProductDetail";
import BrandDetail from "@/pages/BrandDetail";
import About from "@/pages/About";
import Submit from "@/pages/Submit";
import Report from "@/pages/Report";

export default function App() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen w-full p-0 md:p-4 lg:p-5">
      <div className="app-shell flex min-h-screen md:min-h-[calc(100vh-2rem)] lg:min-h-[calc(100vh-2.5rem)] w-full overflow-hidden rounded-none bg-surface shadow-none md:rounded-xl3 md:shadow-shell">
        <Sidebar />
        <div
          className={`flex-1 min-w-0 ${
            isHome
              ? "p-0 md:px-6 md:py-5 lg:px-8 xl:px-10 lg:py-8"
              : "px-5 pb-28 pt-7 md:px-6 md:py-5 lg:px-8 xl:px-10 lg:py-8"
          }`}
        >
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/find" element={<Find />} />
              <Route path="/regions" element={<Regions />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/brands/:slug" element={<BrandDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/submit" element={<Submit />} />
              <Route path="/report" element={<Report />} />
            </Routes>
          </main>
          {!isHome && <SiteFooter />}
        </div>
        <MobileNav />
      </div>
    </div>
  );
}
