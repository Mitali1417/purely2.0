import api from "./index";

import type { Product } from "@/lib/store";

type CartItemPayload = {
  productId: string;
  quantity: number;
  product?: Product;
};

export const cartAPI = {
  get: async (): Promise<CartItemPayload[]> => {
    const res = await api.get("/users/me/cart");
    return res.data?.items ?? [];
  },
  set: async (items: CartItemPayload[]): Promise<void> => {
    await api.put("/users/me/cart", { items });
  },
  clear: async (): Promise<void> => {
    await api.delete("/users/me/cart");
  },
};


