import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export const ProductCardMinimal = ({ product }) => {
  const { addToCart, isInCart, isInWishlist, addToWishlist, removeFromWishlist } = useCartStore();
  const inCart = isInCart(product._id);
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const toggleWishlist = () => {
    if (inWishlist) removeFromWishlist(product._id);
    else addToWishlist(product);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow relative">
      <motion.div className="absolute top-2 right-2 z-10" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Heart
          onClick={toggleWishlist}
          className={`cursor-pointer w-6 h-6 stroke-2 ${inWishlist ? "fill-rose-600 text-rose-600" : "text-gray-400 hover:text-rose-600"}`}
        />
      </motion.div>
      <Link to={`/products/${product._id}`} className="block relative">
        <img
          src={product.productImage}
          alt={product.productName}
          className="w-full h-48 object-cover"
        />
      </Link>
      
      <CardContent className="p-4">
        <Link to={`/products/${product._id}`} className="no-underline hover:underline">
          <h3 className="font-medium text-lg mb-2 line-clamp-2">{product.productName}</h3>
        </Link>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.productDescription}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">
            ₹{product.productPrice.toLocaleString('en-IN')}
          </p>
          {inCart ? (
            <Button size="sm" asChild>
              <Link to="/cart">Go to Cart</Link>
            </Button>
          ) : (
            <Button size="sm" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};