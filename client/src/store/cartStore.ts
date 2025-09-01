import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  _id: string;
  productName: string;
  productPrice: number;
  productImage: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  wishlist: Product[];

  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;

  cartTotal: () => number;
  cartItemCount: () => number;
  wishlistCount: () => number;

  isInCart: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],

      addToCart: (product, quantity = 1) => {
        const existing = get().items.find((i) => i.product._id === product._id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.product._id === product._id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, { product, quantity }] });
        }
      },

      removeFromCart: (productId) =>
        set({ items: get().items.filter((i) => i.product._id !== productId) }),

      updateQuantity: (productId, quantity) =>
        set({
          items: get().items.map((i) =>
            i.product._id === productId ? { ...i, quantity } : i
          ),
        }),

      clearCart: () => set({ items: [] }),

      addToWishlist: (product) => {
        if (!get().wishlist.find((p) => p._id === product._id)) {
          set({ wishlist: [...get().wishlist, product] });
        }
      },

      removeFromWishlist: (productId) =>
        set({ wishlist: get().wishlist.filter((p) => p._id !== productId) }),

      clearWishlist: () => set({ wishlist: [] }),

      cartTotal: () =>
        get().items.reduce(
          (t, i) => t + i.product.productPrice * i.quantity,
          0
        ),

      cartItemCount: () =>
        get().items.reduce((c, i) => c + i.quantity, 0),

      wishlistCount: () => get().wishlist.length,

      isInCart: (productId) =>
        get().items.some((i) => i.product._id === productId),
      isInWishlist: (productId) =>
        get().wishlist.some((i) => i._id === productId),
    }),
    { name: "cart-storage", version: 1 }
  )
);
