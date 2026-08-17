import { Routes, Route } from "react-router-dom";
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
  return (
    <div className="min-h-screen w-full p-2.5 sm:p-4 lg:p-5">
      <div className="app-shell flex min-h-[calc(100vh-1.25rem)] sm:min-h-[calc(100vh-2rem)] lg:min-h-[calc(100vh-2.5rem)] w-full overflow-hidden rounded-xl3 bg-surface shadow-shell">
        <Sidebar />
        <div className="flex-1 min-w-0 px-4 py-5 sm:px-6 lg:px-8 xl:px-10 lg:py-8">
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
          <SiteFooter />
        </div>
        <MobileNav />
      </div>
    </div>
  );
}
