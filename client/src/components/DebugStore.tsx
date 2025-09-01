import { useCartStore } from "@/lib/store";
import { useEffect } from "react";

export const DebugStore = () => {
  const store = useCartStore();

  useEffect(() => {
    console.log('DebugStore - Full store state:', store);
    console.log('DebugStore - Items:', store.items);
    console.log('DebugStore - Wishlist:', store.wishlist);
    console.log('DebugStore - Cart total:', store.cartTotal);
    console.log('DebugStore - Cart item count:', store.cartItemCount);
    console.log('DebugStore - Wishlist count:', store.wishlistCount);
  }, [store.items, store.wishlist, store.cartTotal, store.cartItemCount, store.wishlistCount]);

  const testProduct = {
    _id: "test-product-123",
    productName: "Test Product",
    productPrice: 100,
    productImage: "https://via.placeholder.com/300",
    productDescription: "This is a test product",
    category: "test",
    brand: "Test Brand",
    stock: 10,
    averageRating: 4.5,
    totalReviews: 10
  };

  const handleTestAddToCart = () => {
    console.log('DebugStore - Testing add to cart with:', testProduct);
    store.addToCart(testProduct, 1);
  };

  const handleTestAddToWishlist = () => {
    console.log('DebugStore - Testing add to wishlist with:', testProduct);
    store.addToWishlist(testProduct);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 border rounded-lg shadow-lg z-50 max-w-sm">
      <h3 className="font-bold mb-2">Debug Store</h3>
      <div className="text-sm space-y-1 mb-3">
        <div>Cart Items: {store.cartItemCount}</div>
        <div>Wishlist Items: {store.wishlistCount}</div>
        <div>Cart Total: ₹{store.cartTotal}</div>
      </div>
      <div className="space-y-2">
        <button 
          onClick={handleTestAddToCart}
          className="w-full bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          Test Add to Cart
        </button>
        <button 
          onClick={handleTestAddToWishlist}
          className="w-full bg-pink-500 text-white px-3 py-1 rounded text-sm"
        >
          Test Add to Wishlist
        </button>
        <button 
          onClick={() => store.clearCart()}
          className="w-full bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Clear Cart
        </button>
        <button 
          onClick={() => store.clearWishlist()}
          className="w-full bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Clear Wishlist
        </button>
      </div>
    </div>
  );
};