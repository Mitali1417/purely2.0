/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useCallback } from "react";
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
import { getResizedImageUrl } from "@/utils/getResizedImageUrl";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
    userName: "",
  });

  const {
    product,
    loading: isLoading,
    error,
  } = useSingleProduct(productId!) as {
    product: Product | null;
    loading: boolean;
    error: string | null;
  };
  const {
    isInWishlist,
    addToCart,
    addToWishlist,
    removeFromWishlist,
    updateQuantity,
    items,
  } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { openDialog } = useLoginDialogStore();

  const images = useMemo(() => {
    if (!product) return [] as string[];
    const primary = product?.productImage || "";
    const gallery: string[] = (product as any)?.productImages || [];
    return gallery && gallery.length > 0 ? [primary, ...gallery] : [primary];
  }, [product]);

  const getCartItemQuantity = useCallback(
    (productId: string) => {
      const item = items.find((i) => i.productId === productId);
      return item ? item.quantity : 0;
    },
    [items]
  );

  const cartQuantity = useMemo(
    () => (product?._id ? getCartItemQuantity(product._id) : 0),
    [product, getCartItemQuantity]
  );

  const handleAddToCart = useCallback(() => {
    if (!isAuthenticated) {
      openDialog("Login first to add items to your cart.");
      return;
    }
    if (!product) return;
    addToCart(product, quantity);
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
      addToWishlist(product);
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
  // Helper function to append resize parameters safely
  const getResizedImageUrl = (url: string, width: number, height: number) => {
    if (!url) return "/placeholder-image.jpg";
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}w=${width}&h=${height}&fit=cover`;
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={`min-h-screen`}>
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
      <div className="mx-auto py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-white typography mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span>{product.productName}</span>
        </nav>
        <div className="mx-auto space-y-6">
          <Card className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start px-4">
            {/* Product Image */}
            <div className="flex justify-center lg:justify-start">
              <img
                src={getResizedImageUrl(product?.productImage || "", 400, 400)}
                alt={product?.productName || "Product"}
                width={400}
                height={400}
                loading="lazy"
                decoding="async"
                className="w-[400px] h-[400px] object-cover rounded-lg border border-gray-200 shadow-sm"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-image.jpg";
                }}
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product?.productName}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {product?.category}
                  </span>
                  <span className="text-xs text-muted-foreground">|</span>
                  <span className="text-sm text-muted-foreground">
                    {product?.brand}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    Stock: {product?.stock ?? "-"}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product?.rating || 0)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">
                    {product?.rating?.toFixed(1) ?? "-"}
                  </span>
                  {product?.discountPercentage && (
                    <span className="text-xs text-green-600 font-semibold ml-2">
                      {product.discountPercentage}
                    </span>
                  )}
                </div>
              </div>
              {/* Price */}
              <div className="flex items-center gap-4 mt-2">
                <span className="text-2xl font-bold text-primary">
                  ₹{product?.discountPrice?.toLocaleString("en-IN")}
                </span>
                {product?.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleAddToCart}
                      className="flex-1"
                      size="lg"
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {product.stock === 0 ? "Out of stock" : "Add to cart"}
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={toggleWishlist}
                    >
                      <Heart
                        className={`w-5 h-5 ${
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

          <div className="space-y-6 w-full">
            {/* Stock and Date */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-800">Available Stock</h4>
                <p>{product.stock}</p>
              </div>
              {/* <div>
                  <h4 className="font-medium text-gray-800">Date Added</h4>
                  <p>{new Date(product.createdAt).toLocaleDateString()}</p>
                </div> */}
            </div>

            {/* <Separator /> */}

            {/* Description */}
            {/* <div className="text-sm text-gray-600">
              <h4 className="font-medium text-gray-800 mb-1">Description</h4>
              <p>
                {product.productName} is a premium product from {product.brand},
                suitable for daily use. Explore its benefits and enhance your
                skincare routine.
              </p>
            </div> */}

            <Separator />

            {/* Specifications */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">Specifications</h4>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <dt className="font-medium">Brand</dt>
                  <dd>{product.brand}</dd>
                </div>
                <div>
                  <dt className="font-medium">Category</dt>
                  <dd className="capitalize">{product.category}</dd>
                </div>
                <div>
                  <dt className="font-medium">Rating</dt>
                  <dd>{product.rating.toFixed(1)} / 5</dd>
                </div>
                <div>
                  <dt className="font-medium">Stock</dt>
                  <dd>{product.stock}</dd>
                </div>
              </dl>
            </div>

            <Separator />

            {/* Shipping & Returns */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">Shipping & Returns</h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <Truck className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-medium">Free Shipping</p>
                    <p>
                      On orders over ₹1,000. Delivered within 3–5 business days.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Package className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Express Shipping</p>
                    <p>
                      Available for ₹99. Delivered within 1–2 business days.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <RotateCcw className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <p className="font-medium">Returns</p>
                    <p>
                      30-day return policy. Products must be unused and in
                      original packaging.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

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
