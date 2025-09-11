import { Skintype } from "@/components/shared/Skintype";
import CategoriesPage from "@/pages/category/Category";
import { TopPicks } from "@/pages/home/components/TopPicks";
import { SaleBanner } from "@/pages/home/components/SaleBanner";
import { FeaturedProducts } from "@/pages/home/components/FeaturedProducts";
import { Testimonials } from "@/pages/home/components/Testimonials";
import Hero from "./components/Hero";
import { HotPicks } from "@/pages/home/components/HotPicks";
import BrandsBanner from "@/pages/brands/BrandsBanner";

const HomePage = () => {
  return (
    <div className="space-y-10 md:space-y-28">
      <Hero />
      <SaleBanner />
      <CategoriesPage />
      <HotPicks />
      <BrandsBanner />
      <TopPicks />
      <Skintype />
      <FeaturedProducts />
      <Testimonials />
    </div>
  );
};

export default HomePage;
