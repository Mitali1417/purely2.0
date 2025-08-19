import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5003/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface Product {
  _id: string;
  productName: string;
  productDescription: string;
  productImage: string;
  productImages?: string[];
  productPrice: number;
  originalPrice?: number;
  category: string;
  brand: string;
  stock: number;
  sku: string;
  variants?: ProductVariant[];
  tags?: string[];
  isActive: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  salePercentage?: number;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
  shippingClass: 'standard' | 'express' | 'free';
  reviews?: Review[];
  averageRating: number;
  totalReviews: number;
  totalSold: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  name: string;
  value: string;
  price: number;
  stock: number;
  sku: string;
}

export interface Review {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

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

// Product API functions
export const productAPI = {
  // Get all products with filters
  getProducts: async (filters: ProductFilters = {}): Promise<ProductsResponse> => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/products`);
    return response.data;
  },

  // Get product by ID
  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Get featured products
  getFeaturedProducts: async (): Promise<Product[]> => {
    const response = await api.get('/products/featured');
    return response.data;
  },

  // Get sale products
  getSaleProducts: async (): Promise<Product[]> => {
    const response = await api.get('/products/sale');
    return response.data;
  },

  // Get categories
  getCategories: async (): Promise<string[]> => {
    const response = await api.get('/products/categories');
    return response.data;
  },

  // Get brands
  getBrands: async (): Promise<string[]> => {
    const response = await api.get('/products/brands');
    return response.data;
  },

  // Get tags
  getTags: async (): Promise<string[]> => {
    const response = await api.get('/products/tags');
    return response.data;
  },

  // Add product (admin only)
  addProduct: async (productData: FormData): Promise<Product> => {
    const response = await api.post('/products/add', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update product (admin only)
  updateProduct: async (id: string, productData: FormData): Promise<Product> => {
    const response = await api.put(`/products/${id}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete product (admin only)
  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  // Add review
  addReview: async (productId: string, reviewData: {
    userId: string;
    userName: string;
    rating: number;
    comment: string;
  }): Promise<Product> => {
    const response = await api.post(`/products/${productId}/reviews`, reviewData);
    return response.data;
  },
};

// Attach auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
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
    console.error('API Error:', error.response?.data || error.message);
    if (error?.response?.status === 401) {
      localStorage.removeItem('auth_token');
    }
    return Promise.reject(error);
  }
);

export default api;
