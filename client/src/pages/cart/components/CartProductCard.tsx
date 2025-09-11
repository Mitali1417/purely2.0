import React, { useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Trash2, Plus, Minus, Star, Package } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { motion } from "motion/react";
import type { CartItem } from "@/lib/store";

interface CartProductCardProps {
  item: CartItem;
  index: number;
}

export const CartProductCard = React.memo(({ item, index }: CartProductCardProps) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  const totalPrice = useMemo(() => (
    ((item.product.productPrice || 0) * item.quantity)
  ), [item.product.productPrice, item.quantity]);

  const handleDecrement = useCallback(() => {
    updateQuantity(item.productId, item.quantity - 1);
  }, [updateQuantity, item.productId, item.quantity]);

  const handleIncrement = useCallback(() => {
    updateQuantity(item.productId, item.quantity + 1);
  }, [updateQuantity, item.productId, item.quantity]);

  const handleRemove = useCallback(() => {
    removeFromCart(item.productId);
    toast.info("Removed from cart");
  }, [removeFromCart, item.productId]);

  return (
    <motion.div
      key={item.productId}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative flex-shrink-0">
              <div className="w-32 h-32 md:w-28 md:h-28 rounded-xl overflow-hidden shadow-md">
                <img
                  src={item.product.productImage || 'https://via.placeholder.com/150?text=No+Image'}
                  alt={item.product.productName || 'Product'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                />
              </div>
              {item.product.isOnSale && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-md">
                  SALE
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 space-y-3">
              <div>
                <h3 className="font-bold text-gray-900 text-xl mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.product.productName || 'Product Name'}
                </h3>
                <p className="text-gray-500 text-sm font-medium">
                  Brand: {item.product.brand || 'Unknown Brand'}
                </p>
              </div>

              <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                {item.product.productDescription || 'No description available'}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {item.product.category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Package className="w-3 h-3 mr-1" />
                    {item.product.category}
                  </span>
                )}
                {item.product.stock !== undefined && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    item.product.stock > 10 ? 'bg-green-100 text-green-800' : 
                    item.product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    Stock: {item.product.stock}
                  </span>
                )}
                {item.product.averageRating && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {item.product.averageRating.toFixed(1)}
                  </span>
                )}
                {item.product.totalReviews && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {item.product.totalReviews} reviews
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                {item.product.isOnSale ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-red-600">
                      ₹{item.product.productPrice?.toLocaleString('en-IN') || '0'}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{item.product.originalPrice?.toLocaleString('en-IN') || '0'}
                    </span>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                      {item.product.salePercentage}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{item.product.productPrice?.toLocaleString('en-IN') || '0'}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end space-y-4 flex-shrink-0">
              <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                <Button variant="ghost" size="sm" onClick={handleDecrement} disabled={item.quantity <= 1} className="h-10 w-10 p-0 hover:bg-gray-100 disabled:opacity-50 rounded-l-lg">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-16 text-center font-bold text-gray-900 bg-white border-x border-gray-200 py-2">
                  {item.quantity}
                </span>
                <Button variant="ghost" size="sm" onClick={handleIncrement} className="h-10 w-10 p-0 hover:bg-gray-100 rounded-r-lg">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </p>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={handleRemove} className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Remove from cart</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});