import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/store';

export const useCartData = () => {
  const store = useCartStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Check if we're in the browser and wait for hydration
    if (typeof window !== 'undefined') {
      // Set a small delay to ensure hydration is complete
      const timer = setTimeout(() => {
        setIsHydrated(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  // Return computed values using functions to ensure fresh data
  const cartTotal = store.getCartTotal();
  const cartItemCount = store.getCartItemCount();
  const wishlistCount = store.getWishlistCount();

  console.log('useCartData hook - cartTotal:', cartTotal, 'cartItemCount:', cartItemCount, 'wishlistCount:', wishlistCount);

  return {
    ...store,
    cartTotal,
    cartItemCount,
    wishlistCount,
    isHydrated,
  };
};