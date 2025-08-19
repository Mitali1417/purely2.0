import { useProductStore } from '../lib/store';
import type { Product } from '../api';

export const useShoppingCart = () => {
  const { 
    cart, 
    wishlist, 
    addToCart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    addToWishlist, 
    removeFromWishlist 
  } = useProductStore();

  // Cart calculations
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Check if product is in cart
  const isInCart = (productId: string) => {
    return cart.some(item => item.id === productId);
  };

  // Check if product is in wishlist
  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  // Get cart item quantity
  const getCartItemQuantity = (productId: string) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Add product to cart with quantity
  const addProductToCart = (product: Product, quantity: number = 1) => {
    // Convert Product to CartItem format
    const cartItem = {
      id: product._id,
      name: product.productName,
      price: product.productPrice,
      image: product.productImage,
      description: product.productDescription,
      category: product.category,
      quantity
    };
    
    addToCart(cartItem);
  };

  // Remove product from cart
  const removeProductFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  // Update cart item quantity
  const updateProductQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartQuantity(productId, quantity);
    }
  };

  // Update cart item quantity (alias for consistency)
  const updateCartItemQuantity = (productId: string, quantity: number) => {
    updateProductQuantity(productId, quantity);
  };

  // Add product to wishlist
  const addProductToWishlist = (product: Product) => {
    // Convert Product to WishlistItem format
    const wishlistItem = {
      id: product._id,
      name: product.productName,
      price: product.productPrice,
      image: product.productImage,
      description: product.productDescription,
      category: product.category
    };
    
    addToWishlist(wishlistItem);
  };

  // Remove product from wishlist
  const removeProductFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
  };

  // Toggle product in wishlist
  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addProductToWishlist(product);
    }
  };

  // Move product from wishlist to cart
  const moveToCart = (product: Product) => {
    addProductToCart(product);
    removeFromWishlist(product._id);
  };

  // Get cart subtotal (before tax and shipping)
  const getCartSubtotal = () => {
    return cartTotal;
  };

  // Calculate shipping cost
  const getShippingCost = () => {
    if (cartTotal >= 50) return 0; // Free shipping over $50
    return 5.99; // Standard shipping cost
  };

  // Calculate tax (example: 8.5% tax rate)
  const getTaxAmount = () => {
    return cartTotal * 0.085;
  };

  // Get total with tax and shipping
  const getCartTotalWithTaxAndShipping = () => {
    return cartTotal + getTaxAmount() + getShippingCost();
  };

  // Check if cart is eligible for free shipping
  const isEligibleForFreeShipping = () => {
    return cartTotal >= 50;
  };

  // Get items that are on sale
  const getSaleItems = () => {
    return cart.filter(item => {
      // This would need to be updated based on your product structure
      // For now, we'll return all items
      return true;
    });
  };

  return {
    // State
    cart,
    wishlist,
    cartTotal,
    cartItemCount,
    wishlistCount,
    
    // Checkers
    isInCart,
    isInWishlist,
    getCartItemQuantity,
    
    // Cart actions
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    updateCartItemQuantity,
    clearCart,
    
    // Wishlist actions
    addProductToWishlist,
    removeProductFromWishlist,
    toggleWishlist,
    
    // Utility actions
    moveToCart,
    
    // Calculations
    getCartSubtotal,
    getShippingCost,
    getTaxAmount,
    getCartTotalWithTaxAndShipping,
    isEligibleForFreeShipping,
    getSaleItems,
  };
}; 