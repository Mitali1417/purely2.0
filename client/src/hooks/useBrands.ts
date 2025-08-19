import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5003/api/products/brands");
      return data;
    },
  });
};