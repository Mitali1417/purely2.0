import { Button } from "@/components/ui/button";
import { ProductListingCard } from "@/pages/products/ProductCatalog";
import { Sparkles, ExternalLink, AlertCircle, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { RecommendedProductCard } from "./RecommendedProductCard";

interface Product {
  _id: string;
  productName: string;
  productImage: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: string;
  rating: number;
  category: string;
  brand: string;
  stock: number;
  reason?: string;
}

interface ProductRecommendationsProps {
  products: Product[];
  isLoading?: boolean;
}

export const ProductRecommendations = ({
  products,
  isLoading = false,
}: ProductRecommendationsProps) => {
  const displayedProducts = products.slice(0, 2);

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">
            Finding the perfect products for you...
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-muted rounded-lg p-2 text-xs"
            >
              <div className="bg-muted-foreground/20 rounded h-24 mb-2" />
              <div className="h-3 bg-muted-foreground/20 rounded w-3/4 mb-1" />
              <div className="h-3 bg-muted-foreground/20 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-4">
        <AlertCircle className="h-10 w-10 text-muted-foreground mb-3" />
        <h3 className="text-sm font-medium mb-1">No products found</h3>
        <p className="text-xs text-muted-foreground mb-3">
          We couldn't find specific products for your concern yet.
        </p>
        <Button variant="outline" size="sm">
          Browse All Products
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {displayedProducts.map((product) => (
          <RecommendedProductCard key={product._id} product={product} />
        ))}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            View Recommended Products
          </Button>
        </DialogTrigger>

        <DialogContent className="!max-w-5xl w-full h-[80vh]">
          {/* Header */}
          <DialogHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-primary">Recommended for you</h3>
            </div>
          </DialogHeader>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grids-cols-3 gap-4 flex-1 overflow-y-auto pb-4">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductListingCard product={product} />
                {product.reason && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                    <strong>Why this helps:</strong> {product.reason}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" className="flex-1">
              <ExternalLink className="h-4 w-4 mr-2" />
              View All Products
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
