/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, ShoppingCart, ArrowUpRight } from "lucide-react";
import { useAuthStore, useCartStore } from "@/lib/store";
import { useLoginDialogStore } from "@/components/shared/LoginRequiredDialog";
import { motion } from "motion/react";
import React, { useMemo, useCallback, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  productName: string;
  productImage: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: string;
  rating: number;
  category: string;
  brand: string;
  stock: number;
  createdAt: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = React.memo(({ product }: ProductCardProps) => {
  const {
    isInCart,
    isInWishlist,
    addToCart,
    addToWishlist,
    removeFromWishlist,
  } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { openDialog } = useLoginDialogStore();

  const inCart = isInCart(product._id);
  const inWishlist = isInWishlist(product._id);
  const [isProcessing, setIsProcessing] = useState(false);

  const { savings, isOnSale } = useMemo(() => {
    const s = product.originalPrice - product.discountPrice;
    const sale = product.discountPrice < product.originalPrice;
    return { savings: s, isOnSale: sale };
  }, [product.originalPrice, product.discountPrice]);

  const formatPrice = useCallback(
    (price: number) => `₹${price.toLocaleString("en-IN")}`,
    []
  );

  const renderStars = useCallback((rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  }, []);

  const handleWishlistToggle = useCallback(() => {
    if (!isAuthenticated) {
      openDialog("Login first to add items to your wishlist.");
      return;
    }
    setIsProcessing(true);
    try {
      if (inWishlist) {
        removeFromWishlist(product._id);
      } else {
        addToWishlist(product as any);
      }
    } finally {
      setIsProcessing(false);
    }
  }, [
    isAuthenticated,
    openDialog,
    inWishlist,
    product._id,
    addToWishlist,
    removeFromWishlist,
  ]);

  const handleAddToCart = useCallback(() => {
    if (!isAuthenticated) {
      openDialog("Login first to add items to your cart.");
      return;
    }
    setIsProcessing(true);
    try {
      addToCart(product as any, 1);
    } finally {
      setIsProcessing(false);
    }
  }, [isAuthenticated, openDialog, addToCart, product]);

  return (
    <Card className="group relative w-full overflow-hidden flex flex-col rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-all duration-300">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {isOnSale && (
          <Badge className="bg-destructive text-white text-xs px-2 py-1 font-medium">
            {product.discountPercentage}
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <motion.div
        className="absolute top-3 right-3 z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleWishlistToggle}
              className={`h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm ${
                inWishlist
                  ? "text-rose-600"
                  : "text-gray-400 hover:text-rose-600"
              }`}
            >
              <Heart
                className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          </TooltipContent>
        </Tooltip>
      </motion.div>

      <CardContent className="flex flex-col items-center p-0">
        {/* Product Image Container */}
        <Link to={`/products/${product._id}`} className="block w-full">
          <div className="relative w-full overflow-hidden aspect-video">
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Product Info Section */}
        <div className="p-4 w-full">
          {/* Category */}
          <div className="mb-1">
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              {product.category}
            </span>
          </div>

          {/* Product Name */}
          <Link to={`/products/${product._id}`} className="no-underline">
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
              {product.productName}
            </h3>
          </Link>

          {/* Brand */}
          <span className="text-xs text-gray-600 mb-2 block">
            by {product.brand}
          </span>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-gray-500">({product.rating})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.discountPrice)}
            </span>
            {isOnSale && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Savings */}
          {isOnSale && (
            <div className="text-xs text-green-600 font-medium mb-2">
              You save ₹{savings.toLocaleString("en-IN")}{" "}
              {product.discountPercentage}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {inCart ? (
          // <Button className="w-full rounded-lg text-sm" asChild>
          //   <Link to="/cart">View in Cart</Link>
          // </Button>

          <Button
            size="sm"
            onClick={() => (window.location.href = "/cart")}
            className="bg-black w-full"
            variant="secondary"
          >
            In Cart
            <ArrowUpRight className="h-3 w-3" />
          </Button>
        ) : (
          <Button
            className="w-full rounded-lg text-sm"
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isProcessing}
          >
            {isProcessing ? (
              <>Adding...</>
            ) : product.stock === 0 ? (
              "Out of Stock"
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
});
