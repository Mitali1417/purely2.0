/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { ProductListingCard } from "@/pages/products/ProductCatalog";

interface TopPicksProps {
  products?: any[];
}

export const TopPicks = ({ products }: TopPicksProps) => {
  const { data: fetched = [], isLoading } = useProducts({
    limit: 12,
    enabled: !products || products.length === 0,
  });
  const list = (products && products.length > 0 ? products : fetched).slice(
    0,
    6
  );

  return (
    <section>
      <div className="flex items-center">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-5xl font-light font-dm">
              Top <span className="text-4xl font-extrabold">Shelf</span>{" "}
            </h2>
            <Button
              variant="ghost"
              className="gap-2 rounded-full bg-transparent p-0 hover:bg-transparent hover:text-white"
              onClick={() => {
                window.location.href = "/products";
              }}
            >
              <ArrowRight className="h-10 w-10" />
            </Button>
          </div>
          <p>Curated selection of our best products</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />
          ))}
        {!isLoading &&
          list.map((product: any, index: number) => (
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
    </section>
  );
};
