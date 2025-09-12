// Option 1: Update your useCartSync hook to load products first
import { useEffect, useRef } from 'react';
import { useCartStore, useAuthStore } from '@/lib/store';

export const useCartSync = () => {
  const { loadCartData, loadWishlistData } = useCartStore();
  // const { products, setProducts } = useProductStore();
  const { isAuthenticated } = useAuthStore();
  const hasInitialized = useRef(false);
  const loadingRef = useRef(false);

  useEffect(() => {
    const loadData = async () => {
      if (isAuthenticated && !hasInitialized.current && !loadingRef.current) {
        loadingRef.current = true;
        hasInitialized.current = true;
        
        try {
          // If products aren't loaded yet, you might need to load them first
          // You'll need to add a method to load products from your API
          // await loadProducts(); // Add this method to your product store
          
          // Then load cart and wishlist data
          await Promise.all([
            loadCartData(),
            loadWishlistData() // This now depends on products being available
          ]);
        } catch (error) {
          console.error('Failed to sync cart data:', error);
        } finally {
          loadingRef.current = false;
        }
      }
    };

    loadData();
  }, [isAuthenticated, loadCartData, loadWishlistData]);

  // Reset initialization flag when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      hasInitialized.current = false;
      loadingRef.current = false;
    }
  }, [isAuthenticated]);
};

// Option 2: Alternative loadWishlistData that fetches individual products if needed
// Add this to your cart store instead of the previous loadWishlistData:

/*
loadWishlistData: async () => {
  try {
    const data = await wishlistAPI.get();
    const productStore = useProductStore.getState();
    
    const wishlistWithProducts: WishlistItem[] = [];
    
    for (const item of data) {
      let product = productStore.getProductById(item.productId);
      
      // If product not found in store, fetch it individually
      if (!product) {
        try {
          // You'll need to create this API call
          product = await productAPI.getById(item.productId);
          if (product) {
            // Optionally add it to the product store
            productStore.setProducts([...productStore.products, product]);
          }
        } catch (error) {
          console.warn(`Failed to fetch product ${item.productId}:`, error);
          continue; // Skip this item if product can't be fetched
        }
      }
      
      if (product) {
        wishlistWithProducts.push({
          productId: item.productId,
          product,
          addedAt: new Date(),
        });
      }
    }
    
    set({ wishlist: wishlistWithProducts });
  } catch (error) {
    console.error("Failed to load wishlist data", error);
    toast.error("Failed to load wishlist");
  }
},
*/