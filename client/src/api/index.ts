// import type { Product } from '@/store/types';
// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5003/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });



// export interface ProductVariant {
//   name: string;
//   value: string;
//   price: number;
//   stock: number;
//   sku: string;
// }

// export interface Review {
//   userId: string;
//   userName: string;
//   rating: number;
//   comment: string;
//   createdAt: string;
// }

// export interface ProductFilters {
//   page?: number;
//   limit?: number;
//   sortBy?: string;
//   sortOrder?: "asc" | "desc";
//   search?: string;
//   category?: string;
//   brand?: string;
//   minPrice?: number;
//   maxPrice?: number;
//   tags?: string;
// }


// export interface PaginationInfo {
//   currentPage: number;
//   totalPages: number;
//   totalProducts: number;
//   hasNextPage: boolean;
//   hasPrevPage: boolean;
// }

// export interface ProductsResponse {
//   products: Product[];
//   pagination: PaginationInfo;
// }

// // Product API functions
// export const productAPI = {
//   // Get all products with filters
//   getProducts: async (filters: ProductFilters = {}): Promise<ProductsResponse> => {
//     const params = new URLSearchParams();
    
//     Object.entries(filters).forEach(([key, value]) => {
//       if (value !== undefined && value !== null && value !== '') {
//         params.append(key, value.toString());
//       }
//     });

//     const response = await api.get(`/products`);
//     return response.data;
//   },

//   // Get product by ID
//   getProductById: async (id: string): Promise<Product> => {
//     const response = await api.get(`/products/${id}`);
//     return response.data;
//   },

//   // Get featured products
//   getFeaturedProducts: async (): Promise<Product[]> => {
//     const response = await api.get('/products/featured');
//     return response.data;
//   },

//   // Get sale products
//   getSaleProducts: async (): Promise<Product[]> => {
//     const response = await api.get('/products/sale');
//     return response.data;
//   },

//   // Get categories
//   getCategories: async (): Promise<string[]> => {
//     const response = await api.get('/products/categories');
//     return response.data;
//   },

//   // Get brands
//   getBrands: async (): Promise<string[]> => {
//     const response = await api.get('/products/brands');
//     return response.data;
//   },

//   // Get tags
//   getTags: async (): Promise<string[]> => {
//     const response = await api.get('/products/tags');
//     return response.data;
//   },

//   // Add product (admin only)
//   addProduct: async (productData: FormData): Promise<Product> => {
//     const response = await api.post('/products/add', productData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   },

//   // Update product (admin only)
//   updateProduct: async (id: string, productData: FormData): Promise<Product> => {
//     const response = await api.put(`/products/${id}`, productData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   },

//   // Delete product (admin only)
//   deleteProduct: async (id: string): Promise<void> => {
//     await api.delete(`/products/${id}`);
//   },

//   // Add review
//   addReview: async (productId: string, reviewData: {
//     userId: string;
//     userName: string;
//     rating: number;
//     comment: string;
//   }): Promise<Product> => {
//     const response = await api.post(`/products/${productId}/reviews`, reviewData);
//     return response.data;
//   },
// };

// export const userAPI = {
//   getPreferences: async (): Promise<any> => {
//     const response = await api.get('/users/me/preferences');
//     return response.data?.preferences ?? {};
//   },
//   updatePreferences: async (preferences: any): Promise<any> => {
//     const response = await api.put('/users/me/preferences', { preferences });
//     return response.data?.preferences ?? {};
//   },
//   getProfile: async (): Promise<any> => {
//     const response = await api.get('/users/me/profile');
//     return response.data?.profile ?? {};
//   },
//   updateProfile: async (profile: any): Promise<any> => {
//     const response = await api.put('/users/me/profile', { profile });
//     return response.data?.profile ?? {};
//   },
// };

// export const assistantAPI = {
//   suggest: async (payload: { messages?: any[]; filters?: any }) => {
//     const response = await api.post('/assistant/suggest', payload);
//     return response.data;
//   },
// };

// // Attach auth token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('auth_token');
//   if (token) {
//     config.headers = config.headers || {};
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error.response?.data || error.message);
//     if (error?.response?.status === 401) {
//       localStorage.removeItem('auth_token');
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;

// // Checkout API
// export const checkoutAPI = {
//   createStripeSession: async (payload: {
//     cartItems: Array<{ id: string; name: string; price: number; quantity: number; image?: string }>;
//     customerEmail?: string;
//   }): Promise<{ id: string; url: string }> => {
//     const res = await api.post(`/checkout/create-session`, payload);
//     return res.data;
//   },
// };




import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5003/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    if (error?.response?.status === 401) {
      localStorage.removeItem("auth_token");
    }
    return Promise.reject(error);
  }
);

export default api;
