
import Navbar from "../components/Navbar";
import Hero from "../components/Home/Hero";
import Footer from "../components/Footer";
import ProductCatalog from "../components/Product/ProductCatalog";
import Brands from "@/components/Brands";
import CategoriesPage from "@/components/Category";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <CategoriesPage />
      <ProductCatalog />
      <Brands/>
      <Footer />
    </>
  );
};

export default HomePage;
