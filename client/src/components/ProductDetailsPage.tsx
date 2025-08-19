import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react"; // Use framer-motion, not motion/react
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Loader2,
  Star,
  Truck,
  ShieldCheck,
  Tag,
} from "lucide-react"; // Added more icons
import { cn } from "@/lib/utils";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { useSingleProduct } from "@/hooks/useSingleProduct";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./Product/ProductCard";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { product, loading, error } = useSingleProduct(productId);
  const { data: allProducts = [], isLoading: allProductsLoading } = useProducts();
  const { addProductToCart, toggleWishlist, isInCart, isInWishlist } =
    useShoppingCart();

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [productId]);

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addProductToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        <p className="ml-4 text-lg text-gray-700">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-red-600 p-8 text-center">
        <p className="text-2xl font-bold mb-4">Error Loading Product</p>
        <p className="text-lg">{error}</p>
        <Link to="/" className="mt-6">
          <Button>Go to Home</Button>
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-gray-600 p-8 text-center">
        <p className="text-2xl font-bold mb-4">Product Not Found</p>
        <p className="text-lg">
          The product you are looking for does not exist.
        </p>
        <Link to="/" className="mt-6">
          <Button>Explore Products</Button>
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product._id);
  const inCart = isInCart(product._id);

  // Example hardcoded data for demonstration. You would fetch this from your API.
  const productDetails = {
    brand: "EcoBloom",
    category: "Skincare",
    rating: 4.8,
    reviewCount: 150,
    availability: "In Stock",
    shippingInfo:
      "Ships within 2-3 business days. Free shipping on orders over ₹1000.",
    guarantee: "30-Day Money-Back Guarantee",
    features: [
      "Made with 100% organic ingredients",
      "Cruelty-free and vegan formula",
      "Dermatologist-tested for sensitive skin",
      "Recyclable and eco-friendly packaging",
    ],
  };

  const relatedProducts = allProducts.filter((p) => p._id !== product._id);
  const popularProducts = relatedProducts.slice(0, 4);

  return (
    <motion.div
      className="container mx-auto p-6 md:p-10 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6 md:p-10">
        {/* Product Image Section */}
        <motion.div
          className="relative w-full overflow-hidden rounded-2xl shadow-lg"
          style={{ aspectRatio: "4/3" }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <img
            src={product.productImage}
            alt={product.productName}
            className="w-full h-full object-cover"
          />
          <motion.button
            className="absolute top-4 right-4 z-10 p-3 bg-white/70 dark:bg-gray-800/70 rounded-full shadow-md backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleWishlist(product)}
            aria-label="Add to wishlist"
          >
            <Heart
              className={cn(
                "w-6 h-6 stroke-2 transition-colors duration-300",
                inWishlist
                  ? "fill-rose-500 text-rose-500"
                  : "text-gray-500 hover:text-rose-500 hover:fill-rose-500"
              )}
            />
          </motion.button>
        </motion.div>

        {/* Product Information and Actions */}
        <div className="flex flex-col gap-6">
          <motion.p
            className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {productDetails.brand} - {productDetails.category}
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {product.productName}
          </motion.h1>

          {/* Rating & Reviews */}
          <motion.div
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-5 h-5",
                    i < Math.round(productDetails.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  )}
                />
              ))}
            </div>
            <p className="font-semibold">{productDetails.rating}</p>
            <span className="text-sm">
              ({productDetails.reviewCount} reviews)
            </span>
          </motion.div>

          {/* Price */}
          <motion.p
            className="text-3xl font-bold text-blue-600 dark:text-blue-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            ₹{product.productPrice.toLocaleString("en-IN")}
          </motion.p>

          {/* Availability and Features */}
          <motion.div
            className="mt-2 flex flex-col gap-3 text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-base font-semibold">
              Availability:{" "}
              <span className="text-green-600 font-bold">
                {productDetails.availability}
              </span>
            </p>
            <ul className="list-none space-y-2">
              {productDetails.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-green-500">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                  <p className="text-sm">{feature}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Description */}
          <motion.div
            className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Description
            </h2>
            <p>
              {product.productDescription ||
                "No description available for this product."}
            </p>
          </motion.div>

          {/* Quantity Selector */}
          <motion.div
            className="flex items-center gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange("decrement")}
              disabled={quantity <= 1}
              className="rounded-full w-10 h-10"
              aria-label="Decrease quantity"
            >
              <Minus className="w-5 h-5" />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-20 text-center text-lg font-semibold rounded-full focus-visible:ring-blue-500"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange("increment")}
              className="rounded-full w-10 h-10"
              aria-label="Increase quantity"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Add to Cart Button */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Button
              className="w-full py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-colors"
              size="lg"
              onClick={handleAddToCart}
              disabled={inCart}
            >
              <ShoppingCart className="w-5 h-5 mr-3" />
              {inCart ? "Added to Cart" : `Add ${quantity} to Cart`}
            </Button>
          </motion.div>

          {/* Shipping and Guarantee Info */}
          <motion.div
            className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-6 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
              <Truck className="w-6 h-6 flex-shrink-0 mt-1" />
              <p>{productDetails.shippingInfo}</p>
            </div>
            <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
              <ShieldCheck className="w-6 h-6 flex-shrink-0 mt-1" />
              <p>{productDetails.guarantee}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-20">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-gray-900 dark:text-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          More Products You Might Like
        </motion.h2>
        <div className="w-24 h-1 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-12" />

        {allProductsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-full h-80 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        ) : popularProducts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delay: 1 }}
          >
            {popularProducts.map((p) => (
              <motion.div
                key={p._id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center text-gray-500 text-lg">
            No other products available.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetailsPage;
