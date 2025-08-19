import { useQuery } from "@tanstack/react-query";
import api from "@/api";

type ProductQueryParams = { search?: string; category?: string; brand?: string; enabled?: boolean };

export const useProducts = (params?: ProductQueryParams) => {
  const query = params?.search || "";
  const category = params?.category || "";
  const brand = params?.brand || "";
  const enabled = params?.enabled ?? true;
  return useQuery({
    queryKey: ["products", { query, category, brand }],
    queryFn: async () => {
      const response = await api.get("/products", {
        params: {
          ...(query ? { search: query } : {}),
          ...(category ? { category } : {}),
          ...(brand ? { brand } : {}),
        },
      });
      return response.data;
    },
    enabled,
  });
};
