import type { StateCreator } from "zustand";
import type { Product } from "./types";


export type ProductSlice = {
  products: Product[];
  featuredProducts: Product[];
  categories: string[];
  brands: string[];
  loading: boolean;
  error: string | null;

  setProducts: (products: Product[]) => void;
  setFeaturedProducts: (products: Product[]) => void;
  setCategories: (categories: string[]) => void;
  setBrands: (brands: string[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  searchProducts: (query: string) => Product[];
  getProductsByCategory: (category: string) => Product[];
  getProductsByBrand: (brand: string) => Product[];
};

export const createProductSlice: StateCreator<ProductSlice> = (set, get) => ({
  products: [],
  featuredProducts: [],
  categories: [],
  brands: [],
  loading: false,
  error: null,

  setProducts: (products) => set({ products }),
  setFeaturedProducts: (products) => set({ featuredProducts: products }),
  setCategories: (categories) => set({ categories }),
  setBrands: (brands) => set({ brands }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  searchProducts: (query) =>
    get().products.filter((p) =>
      p.productName.toLowerCase().includes(query.toLowerCase())
    ),

  getProductsByCategory: (category) =>
    get().products.filter((p) => p.productCategory === category),

  getProductsByBrand: (brand) =>
    get().products.filter((p) => p.productBrand === brand),
});
