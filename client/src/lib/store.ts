/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cartAPI } from "@/api/cart.api";
import { wishlistAPI } from "@/api/wishlist.api";
import { toast } from "sonner";

// ========== Types ==========
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  discountPrice: number;
  _id: string;
  productName: string;
  productPrice: number;
  productImage: string;
  productDescription: string;
  category: string;
  brand: string;
  stock: number;
  averageRating: number;
  totalReviews: number;
  isOnSale?: boolean;
  salePercentage?: number;
  originalPrice?: number;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: Date;
}

export interface UserProfile {
  age?: number;
  climate?: string;
  allergies: string[];
  skinType?: string;
  hairType?: string;
  routine?: string;
  budget?: string;
  ingredientPreferences: {
    avoid: string[];
    prefer: string[];
  };
  notes?: string;
}

export interface UserPreferences {
  assistant?: {
    mode: "wizard" | "chat";
    activeTab: string;
    answers: Record<string, any>;
  };
}

// ========== Auth Store ==========
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  auth_token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       isAuthenticated: false,
//       auth_token: null,
//       login: (user, token) => {
//         set({ user, isAuthenticated: true, auth_token: token });
//         localStorage.setItem("auth_token", token);
//       },
//       logout: () => {
//         set({ user: null, isAuthenticated: false, auth_token: null });
//         localStorage.removeItem("auth_token");
//         localStorage.removeItem("cart-storage");
//         localStorage.removeItem("profile-storage");
//         useCartStore.getState().clearCart();
//         useCartStore.getState().clearWishlist();
//         useProfileStore.getState().resetProfile();
//       },
//     }),
//     { name: "auth-storage" }
//   )
// );

// ========== Product Store ==========



export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      auth_token: null,
      login: (user, token) => {
        set({ user, isAuthenticated: true, auth_token: token });
        localStorage.setItem("auth_token", token);
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, auth_token: null });
        localStorage.removeItem("auth_token");
        localStorage.removeItem("cart-storage");
        localStorage.removeItem("profile-storage");
        localStorage.removeItem("auth-storage"); // Remove persisted auth state
        useCartStore.getState().clearCart();
        useCartStore.getState().clearWishlist();
        useProfileStore.getState().resetProfile();
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        const token = localStorage.getItem("auth_token");
        if (token && state) {
          state.isAuthenticated = true;
          state.auth_token = token;
        }
      },
    }
  )
);




interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getProductsByBrand: (brand: string) => Product[];
  searchProducts: (query: string) => Product[];
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      loading: false,
      error: null,
      setProducts: (products) => set({ products }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      getProductById: (id) => get().products.find((p) => p._id === id),
      getProductsByCategory: (category) =>
        get().products.filter((p) => p.category === category),
      getProductsByBrand: (brand) =>
        get().products.filter((p) => p.brand === brand),
      searchProducts: (query) => {
        if (!query) return [];
        const q = query.toLowerCase();
        return get().products.filter((p) =>
          [p.productName, p.productDescription, p.category, p.brand].some(
            (f) => f && f.toLowerCase().includes(q)
          )
        );
      },
    }),
    {
      name: "product-storage",
      partialize: (state) => ({
        products: state.products,
      }),
    }
  )
);



interface CartState {
  items: CartItem[];
  wishlist: WishlistItem[];
  setItems: (items: CartItem[]) => void;
  setWishlist: (wishlist: WishlistItem[]) => void;
  loadCartData: () => Promise<void>;
  loadWishlistData: () => Promise<void>;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  cartTotal: () => number;
  cartItemCount: () => number;
  wishlistCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  wishlist: [],
  
  setItems: (items) => set({ items }),
  setWishlist: (wishlist) => set({ wishlist }),

  loadCartData: async () => {
    try {
      const data = await cartAPI.get();
      // API now returns items with populated product data
      const cartItems: CartItem[] = data.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        product: item.product!
      }));
      set({ items: cartItems });
    } catch (error) {
      console.error("Failed to load cart data", error);
      toast.error("Failed to load cart");
    }
  },

  loadWishlistData: async () => {
    try {
      const data = await wishlistAPI.get();
      // API now returns items with populated product data
      const wishlistItems: WishlistItem[] = data.map(item => ({
        productId: item.productId,
        product: item.product!,
        addedAt: item.addedAt || new Date()
      }));
      set({ wishlist: wishlistItems });
    } catch (error) {
      console.error("Failed to load wishlist data", error);
      toast.error("Failed to load wishlist");
    }
  },

  addToCart: (product, quantity = 1) => {
    const items = get().items;
    const existing = items.find((i) => i.productId === product._id);
    if (existing) {
      set({
        items: items.map((i) =>
          i.productId === product._id ? { ...i, quantity: i.quantity + quantity } : i
        ),
      });
    } else {
      set({
        items: [...items, { productId: product._id, product, quantity }],
      });
    }
    toast.success("Added to cart");
  },

  removeFromCart: (productId) => {
    set({
      items: get().items.filter((i) => i.productId !== productId),
    });
    toast.info("Removed from cart");
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set({
      items: get().items.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      ),
    });
  },

  clearCart: () => {
    set({ items: [] });
  },

  isInCart: (productId) => {
    return get().items.some((i) => i.productId === productId);
  },

  addToWishlist: (product) => {
    const wishlist = get().wishlist;
    if (!wishlist.some((i) => i.productId === product._id)) {
      set({
        wishlist: [
          ...wishlist,
          { productId: product._id, product, addedAt: new Date() },
        ],
      });
      toast.success("Added to wishlist");
    }
  },

  removeFromWishlist: (productId) => {
    set({
      wishlist: get().wishlist.filter((i) => i.productId !== productId),
    });
    toast.info("Removed from wishlist");
  },

  clearWishlist: () => {
    set({ wishlist: [] });
  },

  isInWishlist: (productId) => {
    return get().wishlist.some((i) => i.productId === productId);
  },

  cartTotal: () =>
    get().items.reduce((total, item) => {
      const price = item.product.discountPrice || item.product.productPrice || 0;
      return total + price * item.quantity;
    }, 0),

  cartItemCount: () =>
    get().items.reduce((count, item) => count + item.quantity, 0),

  wishlistCount: () => get().wishlist.length,
}));


interface ProfileState {
  profile: UserProfile;
  preferences: UserPreferences;
  loading: boolean;
  error: string | null;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: {
        allergies: [],
        ingredientPreferences: { avoid: [], prefer: [] },
      },
      preferences: {},
      loading: false,
      error: null,
      updateProfile: (updates) =>
        set((state) => ({ profile: { ...state.profile, ...updates } })),
      updatePreferences: (updates) =>
        set((state) => ({ preferences: { ...state.preferences, ...updates } })),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      resetProfile: () =>
        set({
          profile: {
            allergies: [],
            ingredientPreferences: { avoid: [], prefer: [] },
          },
          preferences: {},
        }),
    }),
    {
      name: "profile-storage",
      partialize: (state) => ({
        profile: state.profile,
        preferences: state.preferences,
      }),
    }
  )
);

// ========== Cross-store effects ==========
useAuthStore.subscribe((state) => {
  if (!state.isAuthenticated) {
    const cartStore = useCartStore.getState();
    cartStore.clearCart();
    cartStore.clearWishlist();
    useProfileStore.getState().resetProfile();
  }
});
