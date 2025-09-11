import api from "./index";

import type { Product } from "@/lib/store";

type WishlistItemPayload = {
  productId: string;
  product?: Product;
  addedAt?: Date;
};

export const wishlistAPI = {
  get: async (): Promise<WishlistItemPayload[]> => {
    const res = await api.get("/users/me/wishlist");
    return res.data?.items ?? [];
  },
  set: async (items: WishlistItemPayload[]): Promise<void> => {
    await api.put("/users/me/wishlist", { items });
  },
  clear: async (): Promise<void> => {
    await api.delete("/users/me/wishlist");
  },
};


