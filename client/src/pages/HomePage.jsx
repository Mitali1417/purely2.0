import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Home/Hero";
import Footer from "../components/Footer";
import ProductCatalog from "../components/Product/ProductCatalog";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductCatalog />
      <Footer />
    </>
  );
};

export default HomePage;
