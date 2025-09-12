// components/Sections/FeaturedProducts.tsx
import { motion } from "motion/react";
import { useProducts } from "@/hooks/useProducts";
import { ProductListingCard } from "@/pages/products/ProductCatalog";
import type { Product } from "@/lib/store";

interface FeaturedProductsProps {
  products?: Product[];
  title?: string;
  subtitle?: string;
}

export const FeaturedProducts = ({ 
  products, 
  title = "🤍 Pure Bliss", 
  subtitle = "Carefully selected items that we love" 
}: FeaturedProductsProps) => {
  const { data: fetched = [], isLoading } = useProducts({ limit: 12, enabled: !products || products.length === 0 });
  const list = (Array.isArray(products) && products.length > 0 ? products : Array.isArray(fetched) ? fetched : []).slice(0, 6);

  return (
    <section>
      <div>
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading && Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />
          ))}
          {!isLoading && list.map((product: Product, index: number) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ProductListingCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};