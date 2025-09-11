import { useQuery } from "@tanstack/react-query";
import { getProductMetadata } from "@/api/product.api";

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const data = await getProductMetadata('brands');
      return data || [];
    },
  });
};