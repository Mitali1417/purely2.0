import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { Heart, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { WishlistProductCard } from "./WishlistProductCard";

const Wishlist = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    wishlist,
    wishlistCount,
  } = useCartStore();

  console.log('Wishlist Component - wishlistCount:', wishlistCount, 'wishlist:', wishlist);
  const wishlistItemsCount = wishlist.length;

  // Simulate loading for better UX
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (wishlistItemsCount === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12">
            <div className="text-center">
              <div className="mx-auto w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-12 h-12 text-pink-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Start building your wishlist by adding products you love! Save items for later and never lose track of what you want.
              </p>
              <div className="space-y-3">
                <Button className="w-full max-w-xs" size="lg" asChild>
                  <a href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Start Shopping
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-gray-600">You have {wishlistItemsCount} item{wishlistItemsCount !== 1 ? 's' : ''} in your wishlist</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {wishlist.map((item, index) => (
            <WishlistProductCard key={item.productId} item={item} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wishlist;