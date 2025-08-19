import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5003/api/products/categories");
      return data; // array of categories
    },
  });
};