import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { motion } from "motion/react";
import { useState } from "react";

export const ProductCard = ({ product }) => {
  const {
    isInCart,
    isInWishlist,
    toggleWishlist,
    addProductToCart,
    removeProductFromCart,
  } = useShoppingCart();

  const inCart = isInCart(product._id);
  const inWishlist = isInWishlist(product._id);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAdd = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      await Promise.resolve(addProductToCart(product, 1));
    } finally {
      setTimeout(() => setIsProcessing(false), 250);
    }
  };

  const handleRemove = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      await Promise.resolve(removeProductFromCart(product._id));
    } finally {
      setTimeout(() => setIsProcessing(false), 250);
    }
  };

  return (
    <Card className="group relative w-full overflow-hidden flex flex-col rounded-2xl border-none shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
      {/* Wishlist Button with Motion */}
      <motion.div
        className="absolute top-4 right-4 z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Heart
          onClick={() => toggleWishlist(product)}
          className={`cursor-pointer w-7 h-7 stroke-2 transition-colors duration-300 
            ${inWishlist ? "fill-rose-600 text-rose-600" : "text-gray-400 hover:text-rose-600"}`}
        />
      </motion.div>

      <CardContent className="flex flex-col items-center p-0">
        {/* Product Image Container with Aspect Ratio */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
          <img
            src={product.productImage}
            alt={product.productName}
            className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>

        {/* Product Info Section */}
        <div className="p-5 w-full text-center">
          <h3 className="text-xl font-medium tracking-tight text-gray-900 dark:text-gray-100 line-clamp-1 mb-1">
            {product.productName}
          </h3>
          <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
            ₹{product.productPrice.toLocaleString('en-IN')}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex w-full px-5 pb-5 pt-0">
        {inCart ? (
          <Button
            className="w-full font-semibold rounded-full text-md"
            variant="outline"
            onClick={handleRemove}
            isLoading={isProcessing}
            loadingText="Removing..."
          >
            Remove from Cart
          </Button>
        ) : (
          <Button
            className="w-full font-semibold rounded-full text-md"
            onClick={handleAdd}
            isLoading={isProcessing}
            loadingText="Adding..."
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};