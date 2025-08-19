import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProduct, useAddReview, useShoppingCart } from "../../hooks";
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  ArrowLeft,
  Share2,
  Eye,
  Package,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { styles } from "../../style/tailwindStyles";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
    userName: ""
  });

  const { data: product, isLoading, error } = useProduct(id!);
  const addReviewMutation = useAddReview();
  const { 
    isInCart, 
    isInWishlist, 
    addProductToCart, 
    toggleWishlist,
    getCartItemQuantity,
    updateCartItemQuantity
  } = useShoppingCart();

  const handleAddToCart = () => {
    if (product) {
      addProductToCart(product, quantity);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !reviewForm.userName || !reviewForm.comment) return;

    addReviewMutation.mutate({
      productId: product._id,
      reviewData: {
        userId: `user_${Date.now()}`, // In a real app, this would come from auth
        userName: reviewForm.userName,
        rating: reviewForm.rating,
        comment: reviewForm.comment
      }
    });

    setReviewForm({
      rating: 5,
      comment: "",
      userName: ""
    });
  };

  if (isLoading) {
    return (
      <div className={`${styles.flexCenter} min-h-screen`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={`${styles.flexCenter} min-h-screen`}>
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const images = product.productImages && product.productImages.length > 0 
    ? [product.productImage, ...product.productImages]
    : [product.productImage];

  const cartQuantity = getCartItemQuantity(product._id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-gray-900">{product.productName}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={images[activeImage]}
                alt={product.productName}
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 ${
                      activeImage === index ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.productName} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="capitalize">
                  {product.category}
                </Badge>
                <Badge variant="secondary">
                  {product.brand}
                </Badge>
                {product.isOnSale && (
                  <Badge variant="sale">
                    {product.salePercentage}% OFF
                  </Badge>
                )}
                {product.isFeatured && (
                  <Badge variant="success">
                    Featured
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.productName}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">
                    {product.averageRating?.toFixed(1) || '4.5'}
                  </span>
                  <span className="text-gray-500">
                    ({product.totalReviews || 0} reviews)
                  </span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">
                  {product.totalSold || 0} sold
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              {product.isOnSale && product.originalPrice && (
                <p className="text-lg text-gray-500 line-through">
                  ${product.originalPrice}
                </p>
              )}
              <p className="text-3xl font-bold text-primary">
                ${product.productPrice}
              </p>
              {product.isOnSale && product.salePercentage && (
                <p className="text-sm text-green-600">
                  Save ${(product.originalPrice! - product.productPrice).toFixed(2)} ({product.salePercentage}% off)
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.productDescription}
              </p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Options</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((variant: any) => (
                    <button
                      key={variant.sku}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 border rounded-lg text-left ${
                        selectedVariant?.sku === variant.sku
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{variant.name}</div>
                      <div className="text-sm text-gray-600">{variant.value}</div>
                      <div className="text-sm font-semibold">${variant.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <Label htmlFor="quantity" className="font-semibold">Quantity</Label>
              <div className="flex items-center gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center"
                  min="1"
                  max={product.stock}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </Button>
                <span className="text-sm text-gray-500">
                  {product.stock} available
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1"
                size="lg"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {cartQuantity > 0 ? `Update Cart (${cartQuantity})` : 'Add to Cart'}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => toggleWishlist(product)}
              >
                <Heart 
                  className={`w-5 h-5 ${
                    isInWishlist(product._id) ? 'fill-red-500 text-red-500' : ''
                  }`} 
                />
              </Button>
              
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Stock Status */}
            {product.stock === 0 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Out of Stock</span>
                </div>
                <p className="text-red-600 text-sm mt-1">
                  This item is currently unavailable. Check back later!
                </p>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="w-4 h-4 text-green-600" />
                <span>Free shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="w-4 h-4 text-green-600" />
                <span>30-day returns</span>
              </div>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.totalReviews || 0})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {product.productDescription}
                    </p>
                  </div>
                  
                  {product.seoDescription && (
                    <div>
                      <h4 className="font-semibold mb-2">Additional Information</h4>
                      <p className="text-gray-600 leading-relaxed">
                        {product.seoDescription}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-3">Product Information</h4>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-gray-600">SKU</dt>
                          <dd className="font-medium">{product.sku}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Brand</dt>
                          <dd className="font-medium">{product.brand}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Category</dt>
                          <dd className="font-medium capitalize">{product.category}</dd>
                        </div>
                        {product.weight && (
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Weight</dt>
                            <dd className="font-medium">{product.weight}g</dd>
                          </div>
                        )}
                        {product.dimensions && (
                          <>
                            <div className="flex justify-between">
                              <dt className="text-gray-600">Dimensions</dt>
                              <dd className="font-medium">
                                {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} cm
                              </dd>
                            </div>
                          </>
                        )}
                      </dl>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Shipping Information</h4>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Shipping Class</dt>
                          <dd className="font-medium capitalize">{product.shippingClass}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Stock Status</dt>
                          <dd className="font-medium">
                            {product.stock > 0 ? (
                              <span className="text-green-600 flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" />
                                In Stock ({product.stock})
                              </span>
                            ) : (
                              <span className="text-red-600 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                Out of Stock
                              </span>
                            )}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  {product.reviews && product.reviews.length > 0 ? (
                    <div className="space-y-6">
                      {product.reviews.map((review: any, index: number) => (
                        <div key={index} className="border-b pb-6 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{review.userName}</span>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      No reviews yet. Be the first to review this product!
                    </p>
                  )}

                  <Separator className="my-8" />

                  {/* Review Form */}
                  <div>
                    <h4 className="font-semibold mb-4">Write a Review</h4>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="userName">Name</Label>
                        <Input
                          id="userName"
                          value={reviewForm.userName}
                          onChange={(e) => setReviewForm(prev => ({ ...prev, userName: e.target.value }))}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label>Rating</Label>
                        <div className="flex items-center gap-1 mt-2">
                          {Array.from({ length: 5 }, (_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setReviewForm(prev => ({ ...prev, rating: i + 1 }))}
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  i < reviewForm.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="comment">Review</Label>
                        <Textarea
                          id="comment"
                          value={reviewForm.comment}
                          onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                          placeholder="Share your thoughts about this product..."
                          rows={4}
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={addReviewMutation.isPending}
                      >
                        {addReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping & Returns</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="shipping">
                      <AccordionTrigger>Shipping Information</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Truck className="w-5 h-5 text-green-600" />
                            <span className="font-medium">Free Standard Shipping</span>
                          </div>
                          <p className="text-gray-600">
                            Free standard shipping on orders over $50. Delivery typically takes 3-5 business days.
                          </p>
                          <div className="flex items-center gap-2">
                            <Package className="w-5 h-5 text-blue-600" />
                            <span className="font-medium">Express Shipping</span>
                          </div>
                          <p className="text-gray-600">
                            Express shipping available for $9.99. Delivery typically takes 1-2 business days.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="returns">
                      <AccordionTrigger>Returns & Exchanges</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <RotateCcw className="w-5 h-5 text-green-600" />
                            <span className="font-medium">30-Day Returns</span>
                          </div>
                          <p className="text-gray-600">
                            We offer a 30-day return policy for most items. Products must be unused and in original packaging.
                          </p>
                          <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-600" />
                            <span className="font-medium">Easy Returns</span>
                          </div>
                          <p className="text-gray-600">
                            Start your return online and print a prepaid shipping label. Returns are processed within 5-7 business days.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
