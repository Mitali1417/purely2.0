import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

import HomePage from "@/pages/home";
import WishlistPage from "@/pages/wishlist";
import CartPage from "@/pages/cart";
import CategoryProductsPage from "../pages/category/CategoryProductsPage";
import BrandProductsPage from "../pages/brands/components/BrandProductsListing";
import SalePage from "@/pages/SalePage";

import About from "@/pages/about/About";
import CategoriesPage from "@/pages/category/Category";
import ProductDetail from "@/pages/products/ProductDetail";
import ProductCatalog from "@/pages/products/ProductCatalog";

import AuthLayout from "@/layouts/AuthLayout";
import UserLayout from "@/layouts/UserLayout";

import ProtectedRoute from "./ProtectedRoute";
import Login from "@/pages/auth/login/Login";
import Signup from "@/pages/auth/signup/Signup";
import { BrandsListingPage } from "@/pages/brands/components/BrandsListingPage";
import AssistantPage from "@/pages/assistant/AssistantPage";

const AnimatedPage = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.div>
);

const AllRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Auth Routes */}
        <Route path="/login" element={<AuthLayout />}>
          <Route
            index
            element={
              <AnimatedPage>
                <Login />
              </AnimatedPage>
            }
          />
        </Route>

        <Route path="/signup" element={<AuthLayout />}>
          <Route
            index
            element={
              <AnimatedPage>
                <Signup />
              </AnimatedPage>
            }
          />
        </Route>

        {/* Public UserLayout for home and public pages */}
        <Route path="/" element={<UserLayout />}>
          <Route
            index
            element={
              <AnimatedPage>
                <HomePage />
              </AnimatedPage>
            }
          />

          <Route
            path="about"
            element={
              <AnimatedPage>
                <About />
              </AnimatedPage>
            }
          />

          <Route
            path="mira"
            element={
              <ProtectedRoute>
                <AnimatedPage>
                  <AssistantPage />
                </AnimatedPage>
              </ProtectedRoute>
            }
          />

          <Route
            path="wishlist"
            element={
              <ProtectedRoute>
                <AnimatedPage>
                  <WishlistPage />
                </AnimatedPage>
              </ProtectedRoute>
            }
          />

          <Route
            path="cart"
            element={
              <ProtectedRoute>
                <AnimatedPage>
                  <CartPage />
                </AnimatedPage>
              </ProtectedRoute>
            }
          />

          <Route path="categories">
            <Route
              index
              element={
                <AnimatedPage>
                  <CategoriesPage />
                </AnimatedPage>
              }
            />
            <Route
              path=":categoryName"
              element={
                <AnimatedPage>
                  <CategoryProductsPage />
                </AnimatedPage>
              }
            />
            <Route
              path=":categoryName/:subcategoryName"
              element={
                <AnimatedPage>
                  <CategoryProductsPage />
                </AnimatedPage>
              }
            />
          </Route>

          <Route path="products">
            <Route
              index
              element={
                <AnimatedPage>
                  <ProductCatalog />
                </AnimatedPage>
              }
            />
            <Route
              path=":productId"
              element={
                <AnimatedPage>
                  <ProductDetail />
                </AnimatedPage>
              }
            />
          </Route>

          <Route
            path="sale"
            element={
              <AnimatedPage>
                <SalePage />
              </AnimatedPage>
            }
          />

          <Route path="brands">
            <Route
              index
              element={
                <AnimatedPage>
                  <BrandsListingPage />
                </AnimatedPage>
              }
            />
            <Route
              path=":brandName"
              element={
                <AnimatedPage>
                  <BrandProductsPage />
                </AnimatedPage>
              }
            />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AllRoutes;
