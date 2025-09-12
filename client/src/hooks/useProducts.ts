/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  useQuery,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useProductStore } from "@/lib/store";
import {
  getProducts as apiGetProducts,
  getSpecialProducts,
  getProductMetadata,
} from "@/api/product.api";

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
  const {
    products,
    setProducts,
    setLoading,
    setError,
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
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
        setLoading(true);
        setError(null);
        try {
          // console.log("Fetching products with params:", {
          //   search: query,
          //   category,
          //   brand,
          //   limit,
          //   page: pageParam as number,
          // });
          const response = await apiGetProducts({
            ...(query ? { search: query } : {}),
            ...(category ? { category } : {}),
            ...(brand ? { brand } : {}),
            limit,
            page: pageParam as number,
          });

          // console.log("API Response:", response);

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
        if (!lastPage || typeof lastPage !== 'object' || !('pagination' in lastPage)) return undefined;
        const pagination = (lastPage as any).pagination;
        return pagination?.hasNextPage
          ? pagination.currentPage + 1
          : undefined;
      },
      staleTime: query ? 1000 * 60 * 2 : 1000 * 60 * 5,
      gcTime: query ? 1000 * 60 * 5 : 1000 * 60 * 10,
      refetchOnWindowFocus: !query,
      placeholderData: (previousData) => previousData,
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
    placeholderData: (previousData) => previousData,
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
  const { setLoading, setError } = useProductStore();

  return useQuery({
    queryKey: ["specialProducts", type],
    queryFn: async () => {
      // Always fetch from API for special products

      setLoading(true);
      try {
        const products = await getSpecialProducts(type);
        // Store products if needed
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
    enabled: true,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Optimized hook for product metadata (categories/brands/tags)
export const useProductMetadata = (type: "categories" | "brands" | "tags") => {
  const { setLoading, setError } = useProductStore();

  return useQuery({
    queryKey: ["productMetadata", type],
    queryFn: async () => {
      // Always fetch from API for metadata

      setLoading(true);
      try {
        const data = await getProductMetadata(type);
        // Store metadata if needed
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
      true ||
      type === "tags",
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};
