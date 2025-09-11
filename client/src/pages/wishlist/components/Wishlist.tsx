import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { Heart } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { AnimatePresence } from "motion/react";
import { WishlistProductCard } from "./WishlistProductCard";
import PageLoader from '@/components/shared/PageLoader';

const Wishlist = () => {
  const [isLoading, setIsLoading] = useState(true);
  const wishlist = useCartStore((state) => state.wishlist);

  const wishlistItemsCount = useMemo(() => wishlist.length, [wishlist]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <PageLoader text="Loading your wishlist..." />
      </div>
    );
  }

  if (wishlistItemsCount === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <Heart className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
        <p className="mb-6">Start adding products you love!</p>
        <Button asChild>
          <a href="/products">Browse Products</a>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">🤍 Your Wishlist</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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