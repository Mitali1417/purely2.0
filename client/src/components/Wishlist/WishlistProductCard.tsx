import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star, Package, Calendar, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { motion } from "motion/react";
import { useState } from "react";
import type { WishlistItem } from "@/lib/store";

interface WishlistProductCardProps {
  item: WishlistItem;
  index: number;
}

export const WishlistProductCard = ({ item, index }: WishlistProductCardProps) => {
  const { removeFromWishlist, addToCart, isInCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const inCart = isInCart(item.productId);

  const handleAddToCart = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      await Promise.resolve(addToCart(item.product, 1));
    } finally {
      setTimeout(() => setIsProcessing(false), 250);
    }
  };

  return (
    <motion.div
      key={item.productId}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="group relative w-full overflow-hidden flex flex-col rounded-2xl border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Remove from Wishlist Button */}
        <motion.div
          className="absolute top-4 right-4 z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeFromWishlist(item.productId)}
            className="text-red-500 hover:text-red-700 bg-white/90 hover:bg-white shadow-md rounded-full h-8 w-8 p-0"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </motion.div>

        <CardContent className="flex flex-col items-center p-0">
          {/* Product Image Container with Aspect Ratio */}
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <img
              src={item.product.productImage || 'https://via.placeholder.com/400?text=No+Image'}
              alt={item.product.productName || 'Product'}
              className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 ease-in-out group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/400?text=No+Image';
              }}
            />
            
            {/* Sale Badge */}
            {item.product.isOnSale && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-md">
                {item.product.salePercentage}% OFF
              </div>
            )}
            
            {/* Rating Badge */}
            {item.product.averageRating && (
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1 shadow-md">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-gray-700">
                  {item.product.averageRating.toFixed(1)}
                </span>
              </div>
            )}

            {/* Added Date */}
            {item.addedAt && (
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1 shadow-md">
                <Calendar className="w-3 h-3 text-gray-600" />
                <span className="text-xs font-medium text-gray-700">
                  {new Date(item.addedAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="p-5 w-full">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                {item.product.productName || 'Product Name'}
              </h3>
              <p className="text-gray-500 text-sm font-medium mb-2">
                {item.product.brand || 'Unknown Brand'}
              </p>
              <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-3">
                {item.product.productDescription || 'No description available'}
              </p>
            </div>

            {/* Product Attributes */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {item.product.category && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <Package className="w-3 h-3 mr-1" />
                  {item.product.category}
                </span>
              )}
              {item.product.stock !== undefined && (
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  item.product.stock > 10 ? 'bg-green-100 text-green-800' : 
                  item.product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  Stock: {item.product.stock}
                </span>
              )}
              {item.product.totalReviews && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {item.product.totalReviews} reviews
                </span>
              )}
            </div>

            {/* Price Display */}
            <div className="text-center mb-4">
              {item.product.isOnSale ? (
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xl font-bold text-red-600">
                    ₹{item.product.productPrice?.toLocaleString('en-IN') || '0'}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹{item.product.originalPrice?.toLocaleString('en-IN') || '0'}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold text-gray-900">
                  ₹{item.product.productPrice?.toLocaleString('en-IN') || '0'}
                </span>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col w-full px-5 pb-5 pt-0 space-y-2">
          {/* Add to Cart Button */}
          {inCart ? (
            <Button className="w-full font-semibold rounded-full text-md" asChild>
              <a href="/cart">Go to Cart</a>
            </Button>
          ) : (
            <Button
              className="w-full font-semibold rounded-full text-md"
              onClick={handleAddToCart}
              disabled={isProcessing}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {isProcessing ? "Adding..." : "Add to Cart"}
            </Button>
          )}
          
          {/* View Details Button */}
          <Button 
            variant="outline" 
            className="w-full font-semibold rounded-full text-md" 
            asChild
          >
            <a href={`/products/${item.product._id}`}>
              View Details
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};