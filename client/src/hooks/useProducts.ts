import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useProductStore } from "@/lib/store";
import {
  getProducts as apiGetProducts,
  getSpecialProducts,
  getProductMetadata,
} from "@/api/product.api";
import type { ProductsResponse } from "@/api/product.api";

type ProductQueryParams = {
  search?: string;
  category?: string;
  brand?: string;
  enabled?: boolean;
  limit?: number;
};

export const useProducts = (
  params?: ProductQueryParams & { useInfinite?: boolean }
) => {
  const queryClient = useQueryClient();
  const {
    products,
    setProducts,
    setLoading,
    setError,
    searchProducts,
    getProductsByCategory,
    getProductsByBrand,
  } = useProductStore();

  const query = params?.search || "";
  const category = params?.category || "";
  const brand = params?.brand || "";
  const enabled = params?.enabled ?? true;
  const limit = params?.limit || 50;

  // Normalize query key for unfiltered requests so multiple components share one cache entry
  // Separate query keys for search vs other filters to optimize caching
  const queryKey = query
    ? ["products", "search", query, limit]
    : !category && !brand
    ? ["products", "base"]
    : ["products", "filtered", { category, brand, limit }];

  // Only use Zustand for the global, unfiltered product list
  const isUnfiltered = !query && !category && !brand;

  // Use infinite query when specified
  if (params?.useInfinite) {
    return useInfiniteQuery({
      queryKey: [...queryKey, "infinite"],
      queryFn: async ({ pageParam = 1 }) => {
        setLoading(true);
        setError(null);
        try {
          console.log("Fetching products with params:", {
            search: query,
            category,
            brand,
            limit,
            page: pageParam,
          });
          const response = await apiGetProducts({
            ...(query ? { search: query } : {}),
            ...(category ? { category } : {}),
            ...(brand ? { brand } : {}),
            limit,
            page: pageParam,
          });

          console.log("API Response:", response);

          // If response is an array, wrap it
          if (Array.isArray(response)) {
            return {
              products: response,
              pagination: {
                currentPage: pageParam,
                hasNextPage: false, // or true if you handle this elsewhere
              },
            };
          }

          // Existing validation for wrapped response
          if (!response || !response.products || !response.pagination) {
            console.error("Invalid API response:", response);
            throw new Error("Invalid response format from API");
          }

          return response;
        } catch (error: any) {
          console.error("API Error:", error);
          const errorMessage =
            error?.response?.data?.message ||
            error.message ||
            "Failed to fetch products";
          setError(errorMessage);
          throw new Error(errorMessage);
        } finally {
          setLoading(false);
        }
      },

      getNextPageParam: (lastPage) => {
        if (!lastPage?.pagination) return undefined;
        return lastPage.pagination.hasNextPage
          ? lastPage.pagination.currentPage + 1
          : undefined;
      },
      staleTime: query ? 1000 * 60 * 2 : 1000 * 60 * 5,
      gcTime: query ? 1000 * 60 * 5 : 1000 * 60 * 10,
      refetchOnWindowFocus: !query,
      keepPreviousData: true,
    });
  }

  // Regular query for non-infinite cases
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      setLoading(true);
      setError(null);
      try {
        const fetched = await apiGetProducts({
          ...(query ? { search: query } : {}),
          ...(category ? { category } : {}),
          ...(brand ? { brand } : {}),
          limit,
        } as any);
        const data = (fetched as any)?.products || fetched || [];
        if (isUnfiltered) setProducts(data); // Only update Zustand for unfiltered
        return data;
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || "Failed to fetch products";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    // Avoid network request if unfiltered data already exists in store
    enabled: isUnfiltered ? enabled && products.length === 0 : enabled,
    staleTime: query ? 1000 * 60 * 2 : 1000 * 60 * 5, // 2 minutes for search, 5 for others
    gcTime: query ? 1000 * 60 * 5 : 1000 * 60 * 10, // 5 minutes for search, 10 for others
    refetchOnWindowFocus: !query, // Disable refetch on focus for search queries
    keepPreviousData: true, // Keep showing previous results while fetching new ones
  });

  // For unfiltered, return Zustand products if available
  if (isUnfiltered && products.length > 0) {
    return {
      ...queryResult,
      data: products,
      isLoading: false,
    };
  }

  // For filtered, always use React Query result
  return queryResult;
};

// Optimized hook for special products (featured/sale)
export const useSpecialProducts = (type: "featured" | "sale") => {
  const { featuredProducts, setFeaturedProducts, setLoading, setError } =
    useProductStore();

  return useQuery({
    queryKey: ["specialProducts", type],
    queryFn: async () => {
      if (type === "featured" && featuredProducts.length > 0)
        return featuredProducts;

      setLoading(true);
      try {
        const products = await getSpecialProducts(type);
        if (type === "featured") setFeaturedProducts(products || []);
        return products || [];
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || `Failed to fetch ${type} products`;
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    enabled: type !== "featured" || featuredProducts.length === 0,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Optimized hook for product metadata (categories/brands/tags)
export const useProductMetadata = (type: "categories" | "brands" | "tags") => {
  const { categories, brands, setCategories, setBrands, setLoading, setError } =
    useProductStore();

  return useQuery({
    queryKey: ["productMetadata", type],
    queryFn: async () => {
      // Return cached data if available
      if (type === "categories" && categories.length > 0) return categories;
      if (type === "brands" && brands.length > 0) return brands;

      setLoading(true);
      try {
        const data = await getProductMetadata(type);
        // Update store based on type
        if (type === "categories") setCategories(data || []);
        if (type === "brands") setBrands(data || []);
        return data || [];
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || `Failed to fetch ${type}`;
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    enabled:
      (type === "categories" && categories.length === 0) ||
      (type === "brands" && brands.length === 0) ||
      type === "tags",
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};
