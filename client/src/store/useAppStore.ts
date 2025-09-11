// src/store/useAppStore.ts
// Re-export the consolidated store from lib/store.ts
// This provides a single source of truth for all app state

export {
  useAuthStore,
  useProductStore,
  useCartStore,
  useProfileStore,
  type User,
  type Product,
  type CartItem,
  type WishlistItem,
  type UserProfile,
  type UserPreferences,
} from '../lib/store';
