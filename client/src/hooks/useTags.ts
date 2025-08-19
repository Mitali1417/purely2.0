import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5003/api/products/tags");
      return data;
    },
  });
};