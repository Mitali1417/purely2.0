/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Sparkles } from "lucide-react";
import { ProductListingCard } from "./products/ProductCatalog";
import { Skeleton } from '@/components/ui/skeleton';

const SalePage = () => {
  const { data: products = [], isLoading } = useProducts();

  const saleProducts = useMemo(() => (
    (products || []).filter((p: any) => (p?.originalPrice || 0) > 0 && (p?.salePercentage || Math.round(((p?.originalPrice - (p?.discountPrice || p?.productPrice || 0)) / p?.originalPrice) * 100)) >= 20)
  ), [products]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <div>
          <h3>Big Sale</h3>
          <p>Products with 30%+ discount</p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl w-full" />
          ))}
        </div>
      ) : saleProducts.length === 0 ? (
        <div className="text-center text-muted-foreground py-20">No sale items right now.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {saleProducts.map((product: any) => (
            <div key={product._id} className="relative">
              <div className="absolute top-2 left-2 z-10">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-600">
                  <Sparkles className="h-3 w-3" />
                  {product.salePercentage || Math.round(((product.originalPrice - (product.discountPrice || product.productPrice || 0)) / product.originalPrice) * 100)}% OFF
                </span>
              </div>
              <ProductListingCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SalePage;
