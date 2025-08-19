import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Auth Store
interface User {
  id: string
  email: string
  name: string
}

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
    {
      name: 'auth-storage',
    }
  )
)

// Product Store
interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
}

interface CartItem extends Product {
  quantity: number
}

interface WishlistItem extends Product {}

interface ProductState {
  products: Product[]
  cart: CartItem[]
  wishlist: WishlistItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  setProducts: (products: Product[]) => void
  clearCart: () => void
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      cart: [],
      wishlist: [],
      addToCart: (product) => {
        const { cart } = get()
        const existingItem = cart.find(item => item.id === product.id)
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] })
        }
      },
      removeFromCart: (productId) => {
        const { cart } = get()
        set({ cart: cart.filter(item => item.id !== productId) })
      },
      updateCartQuantity: (productId, quantity) => {
        const { cart } = get()
        if (quantity <= 0) {
          set({ cart: cart.filter(item => item.id !== productId) })
        } else {
          set({
            cart: cart.map(item =>
              item.id === productId ? { ...item, quantity } : item
            )
          })
        }
      },
      addToWishlist: (product) => {
        const { wishlist } = get()
        const exists = wishlist.find(item => item.id === product.id)
        if (!exists) {
          set({ wishlist: [...wishlist, product] })
        }
      },
      removeFromWishlist: (productId) => {
        const { wishlist } = get()
        set({ wishlist: wishlist.filter(item => item.id !== productId) })
      },
      setProducts: (products) => set({ products }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'product-storage',
    }
  )
) 