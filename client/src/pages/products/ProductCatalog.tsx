/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useProducts } from "@/hooks/useProducts";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "../../components/ui/card";
import { useAuthStore, useCartStore } from "@/lib/store";
import { useLoginDialogStore } from "@/components/shared/LoginRequiredDialog";
import { Heart, Star, ShoppingCart, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from "sonner";

const getResizedImageUrl = (url: string, width: number, height: number) => {
  if (!url) return "/placeholder-image.jpg"; 
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}w=${width}&h=${height}&fit=cover`;
};

const ProductCatalog = () => {
  const { data: products, isLoading, isError } = useProducts();
  const { loadCartData, loadWishlistData } = useCartStore();

  // Load cart and wishlist once when this page is mounted
  useEffect(() => {
    loadCartData();
    loadWishlistData();
  }, []);

  const safeProducts = Array.isArray(products)
    ? products.filter((product) => product && typeof product === "object")
    : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };


  const renderLoading = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-48 w-full rounded-lg" />
      ))}
    </div>
  );

  const renderError = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center p-8 rounded-lg bg-muted/30 border border-border mx-auto max-w-md"
    >
      <p className="font-medium">Unable to load products</p>
      <p className="text-muted-foreground text-sm mt-1">
        Please check your connection and try again
      </p>
    </motion.div>
  );

  const renderEmpty = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center p-8 rounded-lg bg-muted/30 border border-border mx-auto max-w-md"
    >
      <p className="font-medium">No products available</p>
      <p className="text-muted-foreground text-sm mt-1">
        Check back later for new arrivals
      </p>
    </motion.div>
  );

  const renderProducts = () => (
    <AnimatePresence>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {safeProducts.map((product: any) => (
          <motion.div
            key={product?._id || Math.random()}
            variants={itemVariants}
          >
            <ProductListingCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="flex flex-col w-full mx-auto px-4 py-8">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-2xl font-medium text-center">Our Products</h1>
        <p className="text-muted-foreground text-sm text-center">
          Discover our curated collection
        </p>
      </div>

      <div className="w-full">
        {isLoading && renderLoading()}
        {isError && renderError()}
        {!isLoading && !isError && safeProducts.length === 0 && renderEmpty()}
        {!isLoading && !isError && safeProducts.length > 0 && renderProducts()}
      </div>
    </div>
  );
};

export const ProductListingCard = ({ product }: { product: any }) => {
  if (!product) {
    return (
      <Card className="overflow-hidden rounded-lg border-0 shadow-sm bg-background">
        <div className="flex">
          <div className="w-24 h-24 bg-muted rounded-l-lg"></div>
          <CardContent className="p-4 flex-1 flex flex-col justify-center">
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-muted rounded w-1/2 mb-3"></div>
            <div className="h-6 bg-muted rounded w-1/3"></div>
          </CardContent>
        </div>
      </Card>
    );
  }

  const { setItems, items, setWishlist, wishlist } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { openDialog } = useLoginDialogStore();

  const inCart = items.some((i) => i.productId === product._id);
  const inWishlist = wishlist.some((i) => i.productId === product._id);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      openDialog("Login first to add items to your cart.");
      return;
    }
    const existing = items.find((i) => i.productId === product._id);
    if (existing) {
      setItems(
        items.map((i) =>
          i.productId === product._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
     toast.success("Increased product quantity in cart");
    } else {
      setItems([...items, { productId: product._id, product, quantity: 1 }]);
      toast.success("Added to cart");
    }
  };

  const toggleWishlist = () => {
    if (!isAuthenticated) {
      openDialog("Login first to manage your wishlist.");
      return;
    }
    if (inWishlist) {
      setWishlist(wishlist.filter((i) => i.productId !== product._id));
      toast.info("Removed from wishlist");
    } else {
      setWishlist([
        ...wishlist,
        { productId: product._id, product, addedAt: new Date() },
      ]);
      toast.success("Added to wishlist");
    }
  };

  return (
    <Card className="group p-2">
      <div className="flex">
        <div className="relative w-24 h-24">
          <Link to={`/products/${product._id}`} className="block">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden w-full h-full"
            >
              <img
                src={getResizedImageUrl(product.productImage, 96, 96)}
                alt={product.productName || "Product image"}
                width={96}
                height={96}
                loading="lazy"
                decoding="async"
                className="w-[96px] h-[96px] object-cover rounded-lg border border-gray-200 shadow-sm"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-image.jpg";
                }}
              />
            </motion.div>
          </Link>

          <motion.div
            className="absolute top-1 right-1 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleWishlist}
              className={`rounded-full h-6 w-6 bg-background/80 ${
                inWishlist
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Heart
                className={`h-3 w-3 ${inWishlist ? "fill-current" : ""}`}
              />
            </Button>
          </motion.div>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col justify-center">
          <div className="flex-1">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">
              {product.category || "Uncategorized"} |{" "}
              {product.brand || "Unknown Brand"}
            </span>
            <Link
              to={`/products/${product._id}`}
              className="no-underline group/title"
            >
              <p className="font-medium text-secondary-foreground mb-1 line-clamp-1 transition-colors">
                {product.productName || "Unnamed Product"}
              </p>
            </Link>
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating || 0)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  {product.rating?.toFixed(1) ?? "-"}
                </span>
              </div>
            </div>
            {product.discountPercentage && (
              <Badge
                variant={"success"}
                className="text-xs font-medium py-0.5 px-1 mr-2"
              >
                {product.discountPercentage}
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-lg font-semibold text-foreground">
                ₹{(product.discountPrice || 0).toLocaleString("en-IN")}
              </p>
              {product.originalPrice && (
                <p className="text-xs text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </p>
              )}
            </div>

            {inCart ? (
              <Button
                size="sm"
                onClick={()=> window.location.href = "/cart"}
                className="bg-black"
                variant="secondary"
              >
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-3 w-3" />
              </Button>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProductCatalog;
