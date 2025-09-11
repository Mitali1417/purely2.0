import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/product.api";
import { ProductCard } from "@/pages/products/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const BrandProductsPage = () => {
  const { brandName } = useParams<{ brandName: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", "brand", brandName],
    queryFn: async () => {
      // The server returns products directly as an array, not wrapped in a response object
      const response = await getProducts({ brand: brandName });
      return response;
    },
    enabled: !!brandName,
  });

  // Handle both array response (from server) and object response (from client API)
  const products = Array.isArray(data) ? data : data?.products || [];
  const pagination = Array.isArray(data) ? null : data?.pagination || null;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Failed to load products
          </h2>
          <p className="text-gray-600 mb-4">
            There was an error loading products for this brand.
          </p>
        </div>
      </div>
    );
  }

  if (!brandName) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Brand not found
          </h2>
          <p className="text-gray-600 mb-4">
            The brand you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2>
              {decodeURIComponent(brandName)} Products
            </h2>
            <p>
              {pagination?.totalProducts || products.length} products available
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No products found
          </h2>
          <p className="text-gray-600 mb-4">
            This brand doesn't have any products available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination Info */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-8 text-center text-gray-600">
          <p>
            Showing page {pagination.currentPage} of {pagination.totalPages}
          </p>
        </div>
      )}
    </div>
  );
};

export default BrandProductsPage;
