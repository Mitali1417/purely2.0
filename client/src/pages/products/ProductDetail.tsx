/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { useSingleProduct } from "@/hooks/useSingleProduct";
import { useAuthStore, useCartStore } from "@/lib/store";
import { useLoginDialogStore } from "@/components/shared/LoginRequiredDialog";
import {
  Heart,
  ShoppingCart,
  Star,
  Truck,
  RotateCcw,
  ArrowLeft,
  Package,
  AlertCircle,
} from "lucide-react";
import type { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity] = useState(1);

  const {
    product,
    loading: isLoading,
    error,
  } = useSingleProduct(productId!) as {
    product: Product | null;
    loading: boolean;
    error: string | null;
  };
  const { isInWishlist, addToCart, addToWishlist, removeFromWishlist } =
    useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { openDialog } = useLoginDialogStore();

  const handleAddToCart = useCallback(() => {
    if (!isAuthenticated) {
      openDialog("Login first to add items to your cart.");
      return;
    }
    if (!product) return;
    addToCart(product as any, quantity);
    toast.success("Added to cart");
  }, [isAuthenticated, openDialog, addToCart, product, quantity]);

  const toggleWishlist = useCallback(() => {
    if (!isAuthenticated) {
      openDialog("Login first to add items to your wishlist.");
      return;
    }
    if (!product) return;
    const pid = product?._id;
    if (!pid) return;
    if (isInWishlist(pid)) {
      removeFromWishlist(pid);
      toast.info("Removed from wishlist");
    } else {
      addToWishlist(product as any);
      toast.success("Added to wishlist");
    }
  }, [
    isAuthenticated,
    openDialog,
    product,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
  ]);

  // Helper function to append resize parameters safely
  const getResizedImageUrl = (url: string, width: number, height: number) => {
    if (!url) return "/placeholder-image.jpg";
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}w=${width}&h=${height}&fit=cover`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The product you're looking for doesn't exist.
          </p>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto py-4 px-2 sm:px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm sm:text-xs text-white typography mb-4 px-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="px-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="truncate max-w-[120px] sm:max-w-none">
            {product.productName}
          </span>
        </nav>

        <div className="space-y-6">
          <Card className="w-full mx-auto flex flex-col lg:flex-row gap-6 items-start p-4 sm:p-6">
            {/* Product Image */}
            <div className="w-full flex justify-center lg:block lg:w-auto">
              <img
                src={getResizedImageUrl(product?.productImage || "", 400, 400)}
                alt={product?.productName || "Product"}
                width={400}
                height={400}
                loading="lazy"
                decoding="async"
                className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] h-auto aspect-square object-cover rounded-lg border border-gray-200 shadow-sm"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-image.jpg";
                }}
              />
            </div>

            {/* Product Details */}
            <div className="w-full space-y-4 sm:space-y-6">
              {/* Header */}
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-primary mb-1 sm:mb-2">
                  {product?.productName}
                </h4>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <span className="text-muted-foreground bg-muted/30 px-2 py-1 rounded-md">
                    {product?.category}
                  </span>
                  <span className="text-muted-foreground hidden sm:inline">
                    |
                  </span>
                  <span className="text-muted-foreground bg-muted/30 px-2 py-1 rounded-md">
                    {product?.brand}
                  </span>
                  <span className="text-muted-foreground ml-1 sm:ml-2 bg-muted/30 px-2 py-1 rounded-md">
                    Stock: {product?.stock ?? "-"}
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${
                        i < Math.floor(product?.rating || 0)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                  <span className="text-xs sm:text-sm text-muted-foreground ml-1">
                    {product?.rating?.toFixed(1) ?? "-"}
                  </span>
                  {(product as any)?.discountPercentage && (
                    <span className="text-xs sm:text-sm text-green-600 font-semibold ml-2 bg-green-100 px-2 py-0.5 rounded-full">
                      {(product as any).discountPercentage}
                    </span>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xl sm:text-2xl font-bold text-primary">
                  ₹{(product as any)?.discountPrice?.toLocaleString("en-IN")}
                </span>
                {product?.originalPrice && (
                  <span className="text-base sm:text-lg text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {/* Stock and Date */}
              <Badge variant={'secondary'} className="bg-amber-600/20 hover:bg-amber-600/20">
                  Available Stock:
                <span className="text-amber-600 ml-1">
                  {product.stock}
                </span>
              </Badge>

              <Separator />

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 sm:py-4 text-sm sm:text-base"
                  size="lg"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Add to Cart
                </Button>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={toggleWishlist}
                      className="p-3 sm:p-4"
                    >
                      <Heart
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          isInWishlist(product._id)
                            ? "fill-red-500 text-red-500"
                            : ""
                        }`}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isInWishlist(product._id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"}
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </Card>

          <div className="space-y-6 w-full px-2 sm:px-0">
            {/* Specifications */}
            <div className="space-y-4">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b">
                  <dt className="font-bold">Brand:</dt>
                  <dd>{product.brand}</dd>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <dt className="font-bold">Category:</dt>
                  <dd className="capitalize">{product.category}</dd>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <dt className="font-bold">Rating:</dt>
                  <dd>{product.rating?.toFixed(1) ?? "0.0"} / 5</dd>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <dt className="font-bold">Stock:</dt>
                  <dd>{product.stock}</dd>
                </div>
              </dl>
            </div>


            {/* Shipping & Returns */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg">Shipping & Returns</h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3 p-3 bg-muted/10 rounded-lg">
                  <Truck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Free Shipping</p>
                    <p className="text-xs sm:text-sm">
                      On orders over ₹1,000. Delivered within 3–5 business days.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/10 rounded-lg">
                  <Package className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Express Shipping</p>
                    <p className="text-xs sm:text-sm">
                      Available for ₹99. Delivered within 1–2 business days.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/10 rounded-lg">
                  <RotateCcw className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Returns</p>
                    <p className="text-xs sm:text-sm">
                      30-day return policy. Products must be unused and in
                      original packaging.
                    </p>
                  </div>
                </div>
              </div>
            </div>


            {product.stock === 0 && (
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex justify-center items-center gap-2 text-red-700 mb-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Out of Stock</span>
                </div>
                <p className="text-sm text-red-600">
                  This item is currently unavailable.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
