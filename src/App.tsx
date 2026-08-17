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
    <div className="min-h-screen flex gap-6 px-3 sm:px-6 py-6 max-w-[1600px] mx-auto">
      <Sidebar />
      <div className="flex-1 min-w-0">
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
  );
}
