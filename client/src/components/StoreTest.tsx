import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

const StoreTest = () => {
  const [storeState, setStoreState] = useState<any>(null);
  const {
    items: cart,
    wishlist,
    cartItemCount,
    wishlistCount,
    addToCart,
    addToWishlist,
    clearCart,
    clearWishlist,
  } = useCartStore();

  // Check store state on mount
  useEffect(() => {
    const checkStore = () => {
      try {
        const stored = localStorage.getItem('cart-storage');
        console.log('Raw localStorage cart-storage:', stored);
        if (stored) {
          const parsed = JSON.parse(stored);
          console.log('Parsed localStorage:', parsed);
          setStoreState(parsed);
        }
      } catch (error) {
        console.error('Error checking store:', error);
      }
    };

    checkStore();
    const interval = setInterval(checkStore, 1000);
    return () => clearInterval(interval);
  }, []);

  const testProduct = {
    _id: 'test-product-1',
    productName: 'Test Product',
    productPrice: 100,
    productImage: 'https://via.placeholder.com/150',
    productDescription: 'This is a test product',
    category: 'test',
    brand: 'test',
    stock: 10,
    averageRating: 4.5,
    totalReviews: 10
  };

  const testWishlistProduct = {
    _id: 'test-wishlist-1',
    productName: 'Test Wishlist Product',
    productPrice: 200,
    productImage: 'https://via.placeholder.com/150',
    productDescription: 'This is a test wishlist product',
    category: 'test',
    brand: 'test',
    stock: 5,
    averageRating: 4.8,
    totalReviews: 15
  };

  const resetStore = () => {
    localStorage.removeItem('cart-storage');
    window.location.reload();
  };

  const forceUpdate = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Store Test Component</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Cart</h3>
                <p>Items: {cartItemCount}</p>
                <p>Items array length: {cart?.length || 0}</p>
                <div className="space-y-2 mt-2">
                  <Button onClick={() => addToCart(testProduct, 1)} className="w-full">
                    Add to Cart
                  </Button>
                  <Button onClick={clearCart} variant="outline" className="w-full">
                    Clear Cart
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Wishlist</h3>
                <p>Items: {wishlistCount}</p>
                <p>Items array length: {wishlist?.length || 0}</p>
                <div className="space-y-2 mt-2">
                  <Button onClick={() => addToWishlist(testWishlistProduct)} className="w-full">
                    Add to Wishlist
                  </Button>
                  <Button onClick={clearWishlist} variant="outline" className="w-full">
                    Clear Wishlist
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Debug Info</h3>
              <div className="text-sm space-y-1">
                <p>Cart items: {JSON.stringify(cart, null, 2)}</p>
                <p>Wishlist items: {JSON.stringify(wishlist, null, 2)}</p>
                <p>LocalStorage: {localStorage.getItem('cart-storage')}</p>
                <p>Store State: {JSON.stringify(storeState, null, 2)}</p>
              </div>
              <div className="mt-4 space-x-2">
                <Button onClick={resetStore} variant="destructive">
                  Reset Store
                </Button>
                <Button onClick={forceUpdate} variant="outline">
                  Force Update
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreTest;
