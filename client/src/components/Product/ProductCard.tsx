import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  const {
    isInCart,
    isInWishlist,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    items,
    wishlist,
  } = useCartStore();

  const inCart = isInCart(product._id);
  const inWishlist = isInWishlist(product._id);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAdd = async () => {
    if (isProcessing) return;
    console.log('ProductCard - Adding to cart:', product);
    setIsProcessing(true);
    try {
      await Promise.resolve(addToCart(product, 1));
      console.log('ProductCard - Successfully added to cart');
    } catch (error) {
      console.error('ProductCard - Error adding to cart:', error);
    } finally {
      setTimeout(() => setIsProcessing(false), 250);
    }
  };

  const handleRemove = async () => {
    if (isProcessing) return;
    console.log('ProductCard - Removing from cart:', product._id);
    setIsProcessing(true);
    try {
      await Promise.resolve(removeFromCart(product._id));
      console.log('ProductCard - Successfully removed from cart');
    } catch (error) {
      console.error('ProductCard - Error removing from cart:', error);
    } finally {
      setTimeout(() => setIsProcessing(false), 250);
    }
  };

  const toggleWishlist = () => {
    console.log('ProductCard - Toggling wishlist for product:', product._id, 'inWishlist:', inWishlist);
    if (inWishlist) {
      removeFromWishlist(product._id);
      console.log('ProductCard - Removed from wishlist');
    } else {
      addToWishlist(product);
      console.log('ProductCard - Added to wishlist');
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
          onClick={toggleWishlist}
          className={`cursor-pointer w-7 h-7 stroke-2 transition-colors duration-300 
            ${inWishlist ? "fill-rose-600 text-rose-600" : "text-gray-400 hover:text-rose-600"}`}
        />
      </motion.div>

      <CardContent className="flex flex-col items-center p-0">
        {/* Product Image Container with Aspect Ratio */}
        <Link to={`/products/${product._id}`} className="block">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>
        </Link>

        {/* Product Info Section */}
        <div className="p-5 w-full text-center">
          <Link to={`/products/${product._id}`} className="no-underline hover:underline">
            <h3 className="text-xl font-medium tracking-tight text-gray-900 dark:text-gray-100 line-clamp-1 mb-1">
              {product.productName}
            </h3>
          </Link>
          <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
            ₹{product.productPrice.toLocaleString('en-IN')}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex w-full px-5 pb-5 pt-0">
        {inCart ? (
         <Button className="w-full font-semibold rounded-full text-md" asChild>
            <Link to="/cart">Go to Cart</Link>
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