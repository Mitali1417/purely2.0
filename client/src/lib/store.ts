// /lib/store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ========== Types ==========
export interface User {
  id: string
  name: string
  email: string
}

export interface Product {
  _id: string
  productName: string
  productPrice: number
  productImage: string
  productDescription: string
  category: string
  brand: string
  stock: number
  averageRating: number
  totalReviews: number
  isOnSale?: boolean
  salePercentage?: number
  originalPrice?: number
}

export interface CartItem {
  productId: string
  product: Product
  quantity: number
}

export interface WishlistItem {
  productId: string
  product: Product
  addedAt: Date
}


export interface UserProfile {
  age?: number
  climate?: string
  allergies: string[]
  skinType?: string
  hairType?: string
  routine?: string
  budget?: string
  ingredientPreferences: {
    avoid: string[]
    prefer: string[]
  }
  notes?: string
}

export interface UserPreferences {
  assistant?: {
    mode: 'wizard' | 'chat'
    activeTab: string
    answers: Record<string, any>
  }
}

// ========== Auth Store ==========
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
)

// ========== Product Store ==========
interface ProductState {
  products: Product[]
  featuredProducts: Product[]
  categories: string[]
  brands: string[]
  loading: boolean
  error: string | null

  setProducts: (products: Product[]) => void
  setFeaturedProducts: (products: Product[]) => void
  setCategories: (categories: string[]) => void
  setBrands: (brands: string[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  getProductById: (id: string) => Product | undefined
  getProductsByCategory: (category: string) => Product[]
  getProductsByBrand: (brand: string) => Product[]
  searchProducts: (query: string) => Product[]
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      featuredProducts: [],
      categories: [],
      brands: [],
      loading: false,
      error: null,

      setProducts: (products) => set({ products }),
      setFeaturedProducts: (products) => set({ featuredProducts: products }),
      setCategories: (categories) => set({ categories }),
      setBrands: (brands) => set({ brands }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      getProductById: (id) => get().products.find((p) => p._id === id),
      getProductsByCategory: (category) =>
        get().products.filter((p) => p.category === category),
      getProductsByBrand: (brand) =>
        get().products.filter((p) => p.brand === brand),
      searchProducts: (query) => {
        const q = query.toLowerCase()
        return get().products.filter((p) =>
          [p.productName, p.productDescription, p.category, p.brand].some((f) =>
            f.toLowerCase().includes(q)
          )
        )
      },
    }),
    {
      name: 'product-storage',
      partialize: (state) => ({
        products: state.products,
        featuredProducts: state.featuredProducts,
        categories: state.categories,
        brands: state.brands,
      }),
    }
  )
)

// ========== Cart & Wishlist Store ==========
interface CartState {
  items: CartItem[]
  wishlist: WishlistItem[]

  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void

  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  clearWishlist: () => void

  cartTotal: () => number
  cartItemCount: () => number
  wishlistCount: () => number

  isInCart: (productId: string) => boolean
  isInWishlist: (productId: string) => boolean
}
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],

      addToCart: (product, quantity = 1) => {
        const existing = get().items.find((i) => i.productId === product._id)
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === product._id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          })
        } else {
          set({
            items: [
              ...get().items,
              { productId: product._id, product, quantity },
            ],
          })
        }
      },

      removeFromCart: (productId) =>
        set({ items: get().items.filter((i) => i.productId !== productId) }),

      updateQuantity: (productId, quantity) =>
        set({
          items:
            quantity > 0
              ? get().items.map((i) =>
                  i.productId === productId ? { ...i, quantity } : i
                )
              : get().items.filter((i) => i.productId !== productId),
        }),

      clearCart: () => set({ items: [] }),

      addToWishlist: (product) => {
        if (!get().wishlist.some((i) => i.productId === product._id)) {
          set({
            wishlist: [
              ...get().wishlist,
              { productId: product._id, product, addedAt: new Date() },
            ],
          })
        }
      },

      removeFromWishlist: (productId) =>
        set({ wishlist: get().wishlist.filter((i) => i.productId !== productId) }),

      clearWishlist: () => set({ wishlist: [] }),

      cartTotal: () =>
        get().items.reduce(
          (t, i) => t + i.product.productPrice * i.quantity,
          0
        ),
      cartItemCount: () =>
        get().items.reduce((c, i) => c + i.quantity, 0),
      wishlistCount: () => get().wishlist.length,

      // ✅ NEW HELPERS
      isInCart: (productId) =>
        get().items.some((i) => i.productId === productId),

      isInWishlist: (productId) =>
        get().wishlist.some((i) => i.productId === productId),
    }),
    { name: 'cart-storage', version: 1 }
  )
)

// ========== Profile Store ==========
interface ProfileState {
  profile: UserProfile
  preferences: UserPreferences
  loading: boolean
  error: string | null

  updateProfile: (updates: Partial<UserProfile>) => void
  updatePreferences: (updates: Partial<UserPreferences>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  resetProfile: () => void
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: { allergies: [], ingredientPreferences: { avoid: [], prefer: [] } },
      preferences: {},
      loading: false,
      error: null,

      updateProfile: (updates) =>
        set((s) => ({ profile: { ...s.profile, ...updates } })),
      updatePreferences: (updates) =>
        set((s) => ({ preferences: { ...s.preferences, ...updates } })),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      resetProfile: () =>
        set({
          profile: { allergies: [], ingredientPreferences: { avoid: [], prefer: [] } },
          preferences: {},
        }),
    }),
    {
      name: 'profile-storage',
      partialize: (state) => ({
        profile: state.profile,
        preferences: state.preferences,
      }),
    }
  )
)
