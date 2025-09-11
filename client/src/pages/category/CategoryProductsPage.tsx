import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ProductCard } from '@/pages/products/ProductCard';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { useProductStore } from '@/store/useAppStore';
import { getProducts } from '@/api/product.api';
import PageLoader from '@/components/shared/PageLoader';


const CategoryProductsPage = () => {
  const { categoryName, subcategoryName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'name');
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || 'all');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { products } = useProductStore();

  const getCategoryDisplayName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const params: any = {};
        if (subcategoryName) params.subcategory = subcategoryName;
        else if (categoryName) params.category = categoryName;
        if (searchQuery) params.search = searchQuery;
        if (sortBy) params.sort = sortBy;
        if (priceRange !== 'all') {
          const [min, max] = priceRange.split('-').map(Number);
          if (min) params.price_min = min;
          if (max) params.price_max = max;
        }

        const response = await getProducts(params);
        const data = (response as any)?.products || response || [];
        setFilteredProducts(data);
        
      } catch (error) {
        console.error('Error loading products:', error);
        setFilteredProducts([]); // Remove fallback to local products
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoryName, subcategoryName, searchQuery, sortBy, priceRange, products]);

  const productCount = useMemo(() => filteredProducts.length, [filteredProducts]);
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <PageLoader text="Loading products..." />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <h2>
            {subcategoryName 
              ? getCategoryDisplayName(subcategoryName)
              : categoryName 
                ? getCategoryDisplayName(categoryName)
                : 'All Products'
            }
          </h2>
        </div>
        <p>
          {productCount} products found
        </p>
      </div>


      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className={`grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 `}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSortBy('name');
              setPriceRange('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryProductsPage;
