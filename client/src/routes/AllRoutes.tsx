import { Routes, Route } from "react-router-dom";
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

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/:categoryName"
          element={
            <ProtectedRoute>
              <CategoryProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:productId"
          element={
            <ProtectedRoute>
              <ProductDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/guide"
          element={
            <ProtectedRoute>
              <Guide />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AllRoutes;
