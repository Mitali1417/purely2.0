import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import WishlistPage from "../pages/WishlistPage";
import CartPage from "../pages/CartPage";
import ProtectedRoute from "../routes/ProtectedRoute";
import SignupPage from "../auth/auth-pages/SignupPage";
import LoginPage from "../auth/auth-pages/LoginPage";

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
