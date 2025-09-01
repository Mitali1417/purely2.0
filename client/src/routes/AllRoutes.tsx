import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage";
import WishlistPage from "../pages/WishlistPage";
import CartPage from "../pages/CartPage";
import ProtectedRoute from "./ProtectedRoute";
import SignupPage from "../auth/auth-pages/SignupPage";
import LoginPage from "../auth/auth-pages/LoginPage";
import About from "@/components/About";
import Guide from "@/components/Guide";
import CategoriesPage from "@/components/Category";
import CategoryProductsPage from "@/components/Categories";
import ProductDetailsPage from "@/components/ProductDetailsPage";
import AssistantPage from "@/pages/AssistantPage";
import ProductCatalog from "@/components/Product/ProductCatalog";
import AuthLayout from "@/layouts/AuthLayout";
import UserLayout from "@/layouts/UserLayout";
import { AnimatePresence, motion } from "motion/react";

const AnimatedPage = ({ children }: { children: any }) => (
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
    <div>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Auth routes with AuthLayout */}
          <Route path="/login" element={<AuthLayout />}>
            <Route index element={<AnimatedPage><LoginPage /></AnimatedPage>} />
          </Route>
          <Route path="/signup" element={<AuthLayout />}>
            <Route index element={<AnimatedPage><SignupPage /></AnimatedPage>} />
          </Route>

          {/* Home route - separate to maintain its own layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AnimatedPage><HomePage /></AnimatedPage>
              </ProtectedRoute>
            }
          />

          {/* Protected routes with UserLayout */}
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AnimatedPage><About /></AnimatedPage>} />
          </Route>

          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AnimatedPage><CategoriesPage /></AnimatedPage>} />
            <Route path=":categoryName" element={<AnimatedPage><CategoryProductsPage /></AnimatedPage>} />
          </Route>

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AnimatedPage><ProductCatalog /></AnimatedPage>} />
            <Route path=":productId" element={<AnimatedPage><ProductDetailsPage /></AnimatedPage>} />
          </Route>

          <Route
            path="/guide"
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AnimatedPage><Guide /></AnimatedPage>} />
          </Route>

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AnimatedPage><WishlistPage /></AnimatedPage>} />
          </Route>

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AnimatedPage><CartPage /></AnimatedPage>} />
          </Route>

          <Route
            path="/assistant"
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AnimatedPage><AssistantPage /></AnimatedPage>} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default AllRoutes;