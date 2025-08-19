import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { useState } from "react";

export const ProductCardMinimal = ({ product }) => {
  const { addProductToCart } = useShoppingCart();
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <motion.div
      className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/products/${product._id}`} className="flex-shrink-0">
        <div className="relative w-16 h-16 rounded-md overflow-hidden">
          <img
            src={product.productImage}
            alt={product.productName}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/products/${product._id}`} className="block">
          <h4 className="text-sm font-medium truncate text-gray-900 dark:text-gray-100">{product.productName}</h4>
        </Link>
        <p className="text-xs text-muted-foreground dark:text-gray-400 mt-0.5">₹{product.productPrice.toLocaleString('en-IN')}</p>
      </div>
      <Button
        size="icon"
        className="flex-shrink-0"
        onClick={async () => {
          if (isProcessing) return;
          setIsProcessing(true);
          try { await Promise.resolve(addProductToCart(product, 1)); }
          finally { setTimeout(() => setIsProcessing(false), 250); }
        }}
        isLoading={isProcessing}
        aria-label="Add to cart"
      >
        <ShoppingCart className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};