// src/store/useAppStore.ts
// Centralized Zustand store that composes domain slices (auth, product, cart)
// and exposes stable selector hooks for global usage across the app.

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createAuthSlice, type AuthSlice } from "./authSlice";
import { createProductSlice, type ProductSlice } from "./productSlice";
import { createCartSlice, type CartSlice } from "./cartSlice";

// Aggregate store type
export type AppStore = AuthSlice & ProductSlice & CartSlice;

// Root store: persist everything in a single storage bucket to avoid drift
export const useAppStore = create<AppStore>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createProductSlice(...a),
      ...createCartSlice(...a),
    }),
    { name: "app-storage", version: 1 }
  )
);

// Domain-specific selector hooks
// These replace duplicate standalone stores and ensure a single source of truth

// Auth
export const useAuthStore = () =>
  useAppStore((state) => ({
    user: state.user,
    token: state.token,
    login: state.login,
    logout: state.logout,
  }));

// Products
export const useProductStore = () =>
  useAppStore((state) => ({
    products: state.products,
    featuredProducts: state.featuredProducts,
    categories: state.categories,
    brands: state.brands,
    loading: state.loading,
    error: state.error,

    setProducts: state.setProducts,
    setFeaturedProducts: state.setFeaturedProducts,
    setCategories: state.setCategories,
    setBrands: state.setBrands,
    setLoading: state.setLoading,
    setError: state.setError,

    searchProducts: state.searchProducts,
    getProductsByCategory: state.getProductsByCategory,
    getProductsByBrand: state.getProductsByBrand,
  }));

// Cart + Wishlist
export const useCartStore = () =>
  useAppStore((state) => ({
    items: state.items,
    wishlist: state.wishlist,

    addToCart: state.addToCart,
    removeFromCart: state.removeFromCart,
    updateQuantity: state.updateQuantity,
    clearCart: state.clearCart,

    addToWishlist: state.addToWishlist,
    removeFromWishlist: state.removeFromWishlist,
    clearWishlist: state.clearWishlist,

    cartTotal: state.cartTotal,
    cartItemCount: state.cartItemCount,
    wishlistCount: state.wishlistCount,

    isInCart: state.isInCart,
    isInWishlist: state.isInWishlist,
  }));

// Notes
// - Remove usage of deprecated standalone stores (authStore.ts, productStore.ts, cartStore.ts)
//   across the codebase and import from "@/store/useAppStore" instead.
// - This file becomes the single source of truth for app state.
