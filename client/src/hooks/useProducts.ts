import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useProductStore } from "@/lib/store";
import api from "@/api";

type ProductQueryParams = { 
  search?: string; 
  category?: string; 
  brand?: string; 
  enabled?: boolean;
  limit?: number;
};

export const useProducts = (params?: ProductQueryParams) => {
  const queryClient = useQueryClient();
  const { 
    products, 
    setProducts, 
    setLoading, 
    setError,
    searchProducts,
    getProductsByCategory,
    getProductsByBrand
  } = useProductStore();
  
  const query = params?.search || "";
  const category = params?.category || "";
  const brand = params?.brand || "";
  const enabled = params?.enabled ?? true;
  const limit = params?.limit || 50;

  const queryKey = ["products", { query, category, brand, limit }];

  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await api.get("/products", {
          params: {
            ...(query ? { search: query } : {}),
            ...(category ? { category } : {}),
            ...(brand ? { brand } : {}),
            limit,
          },
        });
        
        const fetchedProducts = response.data?.products || response.data || [];
        setProducts(fetchedProducts);
        return fetchedProducts;
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message || "Failed to fetch products";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    enabled: enabled && products.length === 0, // Only fetch if no products in store
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  // Return filtered results from store if available
  if (products.length > 0) {
    let filteredProducts = products;
    
    if (query) {
      filteredProducts = searchProducts(query);
    }
    if (category) {
      filteredProducts = getProductsByCategory(category);
    }
    if (brand) {
      filteredProducts = getProductsByBrand(brand);
    }
    
    return {
      ...queryResult,
      data: filteredProducts,
      isLoading: false,
    };
  }

  return queryResult;
};

// Optimized hook for featured products
export const useFeaturedProducts = () => {
  const { featuredProducts, setFeaturedProducts, setLoading, setError } = useProductStore();
  
  return useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      if (featuredProducts.length > 0) return featuredProducts;
      
      setLoading(true);
      try {
        const response = await api.get('/products/featured');
        const products = response.data || [];
        setFeaturedProducts(products);
        return products;
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message || "Failed to fetch featured products";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    enabled: featuredProducts.length === 0,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Optimized hook for categories
export const useCategories = () => {
  const { categories, setCategories, setLoading, setError } = useProductStore();
  
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      if (categories.length > 0) return categories;
      
      setLoading(true);
      try {
        const response = await api.get('/products/categories');
        const cats = response.data || [];
        setCategories(cats);
        return cats;
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message || "Failed to fetch categories";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    enabled: categories.length === 0,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};

// Optimized hook for brands
export const useBrands = () => {
  const { brands, setBrands, setLoading, setError } = useProductStore();
  
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      if (brands.length > 0) return brands;
      
      setLoading(true);
      try {
        const response = await api.get('/products/brands');
        const brs = response.data || [];
        setBrands(brs);
        return brs;
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message || "Failed to fetch brands";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    enabled: brands.length === 0,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};
