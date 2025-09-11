import api from "../api";
import type { Product } from "@/store/types";

// ---------- Types ----------
export interface ProductFilters {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ProductsResponse {
  products: Product[];
  pagination: PaginationInfo;
}

// ---------- Queries ----------
export const getProducts = async (
  filters: ProductFilters = {}
): Promise<ProductsResponse> => {
  const response = await api.get("/products", { params: filters });
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getSpecialProducts = async (type: 'featured' | 'sale'): Promise<Product[]> => {
  const response = await api.get(`/products/${type}`);
  return response.data;
};

export const getProductMetadata = async (type: 'categories' | 'brands' | 'tags'): Promise<string[]> => {
  const response = await api.get(`/products/${type}`);
  return response.data;
};

// ---------- Mutations ----------
export const productMutations = {
  add: async (productData: FormData): Promise<Product> => {
    const response = await api.post("/products/add", productData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  update: async (id: string, productData: FormData): Promise<Product> => {
    const response = await api.put(`/products/${id}`, productData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};

export const addReview = async (
  productId: string,
  reviewData: { userId: string; userName: string; rating: number; comment: string }
): Promise<Product> => {
  const response = await api.post(`/products/${productId}/reviews`, reviewData);
  return response.data;
};



export const checkoutAPI = {
  createStripeSession: async (payload: {
    cartItems: Array<{ id: string; name: string; price: number; quantity: number; image?: string }>;
    customerEmail?: string;
  }): Promise<{ id: string; url: string }> => {
    const res = await api.post(`/checkout/create-session`, payload);
    return res.data;
  },
};