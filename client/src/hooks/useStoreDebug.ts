import { useEffect } from 'react';
import { useCartStore } from '@/lib/store';

export const useStoreDebug = () => {
  const cartState = useCartStore();
  
  useEffect(() => {
    console.log('=== STORE DEBUG ===');
    console.log('Cart items:', cartState.items);
    console.log('Cart item count:', cartState.cartItemCount);
    console.log('Cart total:', cartState.cartTotal);
    console.log('Wishlist:', cartState.wishlist);
    console.log('Wishlist count:', cartState.wishlistCount);
    console.log('LocalStorage cart-storage:', localStorage.getItem('cart-storage'));
    console.log('==================');
  }, [cartState.items, cartState.cartItemCount, cartState.cartTotal, cartState.wishlist, cartState.wishlistCount]);

  return cartState;
};
