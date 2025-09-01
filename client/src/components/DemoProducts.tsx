import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/lib/store";
import { ShoppingCart, Heart, Star, Package, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DemoProducts = () => {
  const { addToCart, addToWishlist, isInCart, isInWishlist } = useCartStore();
  const [isAddingToCart, setIsAddingToCart] = useState<string | null>(null);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState<string | null>(null);

  const demoProducts = [
    {
      _id: 'demo-1',
      productName: 'Organic Face Serum',
      productPrice: 1299,
      productImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      productDescription: 'Revitalizing organic face serum with natural ingredients for glowing skin. Contains hyaluronic acid, vitamin C, and peptides for maximum effectiveness.',
      category: 'Skincare',
      brand: 'PureGlow',
      stock: 50,
      averageRating: 4.8,
      totalReviews: 127,
      isOnSale: true,
      salePercentage: 20,
      originalPrice: 1599
    },
    {
      _id: 'demo-2',
      productName: 'Natural Hair Mask',
      productPrice: 899,
      productImage: 'https://images.unsplash.com/photo-1522338146-4c5d4a0c0c0c?w=400&h=400&fit=crop',
      productDescription: 'Deep conditioning hair mask with argan oil and shea butter. Restores moisture and adds shine to damaged hair.',
      category: 'Hair Care',
      brand: 'NatureLocks',
      stock: 35,
      averageRating: 4.6,
      totalReviews: 89,
      isOnSale: false
    },
    {
      _id: 'demo-3',
      productName: 'Vitamin C Moisturizer',
      productPrice: 1499,
      productImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      productDescription: 'Brightening moisturizer with Vitamin C and hyaluronic acid. Evens skin tone and provides long-lasting hydration.',
      category: 'Skincare',
      brand: 'BrightSkin',
      stock: 25,
      averageRating: 4.9,
      totalReviews: 203,
      isOnSale: true,
      salePercentage: 15,
      originalPrice: 1799
    },
    {
      _id: 'demo-4',
      productName: 'Natural Body Wash',
      productPrice: 699,
      productImage: 'https://images.unsplash.com/photo-1522338146-4c5d4a0c0c0c?w=400&h=400&fit=crop',
      productDescription: 'Gentle body wash with coconut oil and essential oils. Suitable for all skin types, including sensitive skin.',
      category: 'Body Care',
      brand: 'PureBody',
      stock: 60,
      averageRating: 4.5,
      totalReviews: 156,
      isOnSale: false
    }
  ];

  const handleAddToCart = async (product: any) => {
    setIsAddingToCart(product._id);
    try {
      addToCart(product, 1);
      toast.success(`${product.productName} added to cart!`);
    } catch (error) {
      toast.error('Failed to add product to cart');
    } finally {
      setIsAddingToCart(null);
    }
  };

  const handleAddToWishlist = async (product: any) => {
    setIsAddingToWishlist(product._id);
    try {
      addToWishlist(product);
      toast.success(`${product.productName} added to wishlist!`);
    } catch (error) {
      toast.error('Failed to add product to wishlist');
    } finally {
      setIsAddingToWishlist(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">Demo Products</h2>
        </div>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Add these sample products to test your cart and wishlist functionality. These products showcase all the features including ratings, stock levels, sale prices, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {demoProducts.map((product) => {
          const inCart = isInCart(product._id);
          const inWishlist = isInWishlist(product._id);

          return (
            <Card key={product._id} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Sale Badge */}
                {product.isOnSale && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium z-10">
                    {product.salePercentage}% OFF
                  </div>
                )}
                
                {/* Rating */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-gray-700">
                    {product.averageRating}
                  </span>
                </div>

                {/* Stock Indicator */}
                <div className="absolute top-3 right-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    product.stock > 10 ? 'bg-green-100 text-green-800' : 
                    product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.productName}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {product.productDescription}
                  </p>
                </div>

                {/* Product Attributes */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Package className="w-3 h-3 mr-1" />
                    {product.category}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {product.totalReviews} reviews
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  {product.isOnSale ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-red-600">
                        ₹{product.productPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice?.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl font-bold text-gray-900">
                      ₹{product.productPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    onClick={() => handleAddToCart(product)}
                    size="sm"
                    variant={inCart ? "outline" : "default"}
                    disabled={inCart || isAddingToCart === product._id}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {isAddingToCart === product._id ? 'Adding...' : inCart ? 'In Cart' : 'Add to Cart'}
                  </Button>
                  
                  <Button 
                    variant={inWishlist ? "outline" : "outline"}
                    className={`w-full ${inWishlist ? 'text-pink-600 border-pink-200 hover:bg-pink-50' : ''}`}
                    size="sm"
                    onClick={() => handleAddToWishlist(product)}
                    disabled={isAddingToWishlist === product._id}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${inWishlist ? 'fill-pink-600' : ''}`} />
                    {isAddingToWishlist === product._id ? 'Adding...' : inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          💡 Tip: Add products to cart and wishlist to see the number indicators in the navbar!
        </p>
      </div>
    </div>
  );
};

export default DemoProducts;
