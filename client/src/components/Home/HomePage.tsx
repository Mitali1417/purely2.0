import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFeaturedProducts, useSaleProducts, useCategories, useShoppingCart } from "../../hooks";
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  ArrowRight, 
  TrendingUp,
  Sparkles,
  Award,
  Truck,
  Shield,
  RotateCcw,
  Clock,
  Users,
  Zap
} from "lucide-react";
import { styles } from "../../style/tailwindStyles";

const HomePage = () => {
  const { data: featuredProducts = [], isLoading: featuredLoading } = useFeaturedProducts();
  const { data: saleProducts = [], isLoading: saleLoading } = useSaleProducts();
  const { data: categories = [] } = useCategories();
  const { 
    isInCart, 
    isInWishlist, 
    addProductToCart, 
    toggleWishlist 
  } = useShoppingCart();

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on orders over $50"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure payment processing"
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day return policy"
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Same day shipping available"
    }
  ];

  const stats = [
    { icon: Users, value: "10K+", label: "Happy Customers" },
    { icon: Award, value: "500+", label: "Products" },
    { icon: TrendingUp, value: "99%", label: "Satisfaction Rate" },
    { icon: Zap, value: "24/7", label: "Support" }
  ];

  const ProductCard = ({ product, showSaleBadge = false }: { product: any; showSaleBadge?: boolean }) => (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img
          src={product.productImage}
          alt={product.productName}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
        >
          <Heart 
            className={`w-5 h-5 ${
              isInWishlist(product._id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`} 
          />
        </button>
        {showSaleBadge && product.isOnSale && (
          <Badge variant="sale" className="absolute top-2 left-2">
            {product.salePercentage}% OFF
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold line-clamp-2">{product.productName}</CardTitle>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">
              {product.averageRating?.toFixed(1) || '4.5'} ({product.totalReviews || 0})
            </span>
          </div>
          <div className="text-right">
            {product.isOnSale && product.originalPrice && (
              <p className="text-xs text-gray-500 line-through">
                ${product.originalPrice}
              </p>
            )}
            <p className="text-xl font-bold text-primary">
              ${product.productPrice}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.productDescription}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <Badge variant="outline" className="text-xs capitalize">
              {product.category}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {product.brand}
            </Badge>
          </div>
          <Button
            onClick={() => addProductToCart(product)}
            className={`${
              isInCart(product._id) 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-primary hover:bg-primary/90'
            }`}
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isInCart(product._id) ? 'In Cart' : 'Add to Cart'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Discover Your Perfect
                <span className="block text-yellow-300">Beauty Routine</span>
              </h1>
              <p className="text-xl mb-8 text-purple-100">
                Premium skincare and beauty products curated for your unique needs. 
                Shop the latest trends and timeless classics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <Sparkles className="w-8 h-8 text-yellow-300 mb-2" />
                    <h3 className="font-semibold">Premium Quality</h3>
                    <p className="text-sm text-purple-100">Handpicked ingredients</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <Award className="w-8 h-8 text-yellow-300 mb-2" />
                    <h3 className="font-semibold">Award Winning</h3>
                    <p className="text-sm text-purple-100">Industry recognized</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <TrendingUp className="w-8 h-8 text-yellow-300 mb-2" />
                    <h3 className="font-semibold">Proven Results</h3>
                    <p className="text-sm text-purple-100">Clinically tested</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <Users className="w-8 h-8 text-yellow-300 mb-2" />
                    <h3 className="font-semibold">Loved by Many</h3>
                    <p className="text-sm text-purple-100">10K+ happy customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked products you'll love</p>
            </div>
            <Link to="/products">
              <Button variant="outline">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {featuredLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sale Section */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="sale" className="mb-4 text-lg px-4 py-2">
              Limited Time Offer
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Flash Sale</h2>
            <p className="text-gray-600 text-lg">Up to 70% off on selected items</p>
          </div>

          {saleLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {saleProducts.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} showSaleBadge={true} />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/products?sale=true">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                Shop Sale Items
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category} to={`/products?category=${category}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold capitalize">{category}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Beauty Routine?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of satisfied customers who trust us for their beauty needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" variant="secondary">
                Start Shopping
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
