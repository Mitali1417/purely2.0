import React, { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import {
  ShoppingCart,
  Star,
  Calendar,
  Trash2,
  ArrowUpRight,
} from "lucide-react";
import { useAuthStore, useCartStore } from "@/lib/store";
import { useLoginDialogStore } from "@/components/shared/LoginRequiredDialog";
import { motion } from "motion/react";
import type { WishlistItem } from "@/lib/store";

interface WishlistProductCardProps {
  item: WishlistItem;
  index: number;
}

export const WishlistProductCard = React.memo(
  ({ item, index }: WishlistProductCardProps) => {
    const { removeFromWishlist, addToCart, isInCart } = useCartStore();
    const { isAuthenticated } = useAuthStore();
    const { openDialog } = useLoginDialogStore();
    const [isProcessing, setIsProcessing] = useState(false);
    const inCart = isInCart(item.productId);

    const priceDisplay = useMemo(
      () => ({
        current: item.product.discountPrice ?? 0,
        original: item.product.originalPrice ?? undefined,
        onSale: !!item.product.isOnSale,
      }),
      [
        item.product.discountPrice,
        item.product.originalPrice,
        item.product.isOnSale,
      ]
    );

    const handleRemove = useCallback(() => {
      removeFromWishlist(item.productId);
      toast.info("Removed from wishlist");
    }, [removeFromWishlist, item.productId]);

    const handleAddToCart = useCallback(async () => {
      if (isProcessing) return;
      if (!isAuthenticated) {
        openDialog("Login first to add items to your cart.");
        return;
      }
      setIsProcessing(true);
      try {
        await Promise.resolve(addToCart(item.product, 1));
      } finally {
        setTimeout(() => setIsProcessing(false), 250);
      }
    }, [isAuthenticated, openDialog, isProcessing, addToCart, item.product]);

    return (
      <motion.div
        key={item.productId}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Card className="group relative w-full overflow-hidden flex flex-col rounded-2xl border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <motion.div
            className="absolute top-4 right-4 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  className="text-red-500 hover:text-red-700 bg-white/90 hover:bg-white shadow-md rounded-full h-8 w-8 p-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove from wishlist</TooltipContent>
            </Tooltip>
          </motion.div>

          <CardContent className="flex flex-col items-center p-0">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src={
                  item.product.productImage ||
                  "https://via.placeholder.com/400?text=No+Image"
                }
                alt={item.product.productName || "Product"}
                className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 ease-in-out group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/400?text=No+Image";
                }}
              />
              {item.product.isOnSale && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-md">
                  {item.product.salePercentage}% OFF
                </div>
              )}
              {item.product.averageRating && (
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1 shadow-md">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-gray-700">
                    {item.product.averageRating.toFixed(1)}
                  </span>
                </div>
              )}
              {item.addedAt && (
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1 shadow-md">
                  <Calendar className="w-3 h-3 text-gray-600" />
                  <span className="text-xs font-medium text-gray-700">
                    {new Date(item.addedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            <div className="p-5 w-full">
              <div
                className="text-center cursor-pointer"
                onClick={() =>
                  (window.location.href = `/products/${item.productId}`)
                }
              >
                <h6 className="line-clamp-2 mb-2 text-primary transition-colors">
                  {item.product.productName || "Product Name"}
                </h6>
                <p className="text-gray-500 text-sm font-medium mb-2">
                  {item.product.brand || "Unknown Brand"}
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xl font-bold text-muted-foreground">
                    ₹{priceDisplay.current.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹{(priceDisplay.original ?? 0).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col w-full px-5 pb-5 pt-0 space-y-2">
            {inCart ? (
              <Button
                className="w-full bg-black"
                onClick={() => (window.location.href = "/cart")}
              >
                <ArrowUpRight className="w-4 h-4 mr-2" />
                In Cart
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={handleAddToCart}
                disabled={isProcessing}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {isProcessing ? "Adding..." : "Add to Cart"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    );
  }
);
