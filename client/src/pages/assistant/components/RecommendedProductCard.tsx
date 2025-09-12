/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { motion } from "motion/react";
import { useAuthStore, useCartStore } from "@/lib/store";
import { useLoginDialogStore } from "@/components/shared/LoginRequiredDialog";

export const RecommendedProductCard = React.memo(({ product }: { product: any }) => {
  const { addToCart, isInCart, isInWishlist, addToWishlist, removeFromWishlist } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { openDialog } = useLoginDialogStore();
  const inCart = isInCart(product._id);
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = useCallback(() => {
    if (!isAuthenticated) {
      openDialog("Login first to add items to your cart.");
      return;
    }
    addToCart(product, 1);
  }, [isAuthenticated, openDialog, addToCart, product]);

  const toggleWishlist = useCallback(() => {
    if (!isAuthenticated) {
      openDialog("Login first to manage your wishlist.");
      return;
    }
    if (inWishlist) removeFromWishlist(product._id);
    else addToWishlist(product);
  }, [isAuthenticated, openDialog, inWishlist, product, addToWishlist, removeFromWishlist]);


  return (
    <Card className="overflow-hidden group transition-all duration-200 hover:shadow-sm rounded-lg border bg-background p-2 text-xs">
      <div className="flex items-center gap-3">
        <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-muted">
          <Link to={`/products/${product._id}`} className="block w-full h-full">
            <motion.img
              src={product.productImage || "/placeholder-image.jpg"}
              alt={product.productName || "Product image"}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
              }}
            />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-1 right-1 h-5 w-5 p-0 bg-background/80 rounded-full ${
              inWishlist ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
            onClick={toggleWishlist}
          >
            <Heart className={`h-3 w-3 ${inWishlist ? "fill-current" : ""}`} />
          </Button>
        </div>

        <div className="flex-1 min-w-0">
          <Link to={`/products/${product._id}`} className="block mb-1">
            <p className="text-primary">
              {product.productName || "Unnamed Product"}
            </p>
          </Link>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
              />
            ))}
            <span className="text-xs text-muted-foreground">{product.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-muted-foreground">₹{(product.discountPrice || 0).toLocaleString('en-IN')}</p>
              {product.originalPrice && (
                <p className="text-[10px] text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </p>
              )}
            </div>
            {inCart ? (
              <Button size="icon" variant="secondary" className="h-6 w-6 p-1">
                <ShoppingCart className="h-3 w-3" />
              </Button>
            ) : (
              <Button size="icon" variant="default" className="h-6 w-6 p-1" onClick={handleAddToCart}>
                <ShoppingCart className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
});
