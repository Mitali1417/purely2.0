/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Sections/HotPicks.tsx
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { ProductListingCard } from "@/pages/products/ProductCatalog";

interface HotPicksProps {
  products?: any[];
}

export const HotPicks = ({ products }: HotPicksProps) => {
  const { data: fetched = [], isLoading } = useProducts({
    limit: 9,
    enabled: !products || products.length === 0,
  });
  const safeFetched: any[] = Array.isArray(fetched) ? fetched : [];
  const list = (products && products.length > 0 ? products : safeFetched).slice(
    0,
    3
  );

  return (
    <section className="bg-muted/20 rounded-lg mt-20">
      <div className="px-4">
        <div className="flex items-center gap-3 mb-4 md:mb-10">
          <div>
            <div className="flex items-center gap-3 -mt-10">
            <h1 className="font-light">
              {" "}
              <span className="text-6xl uppercase font-dm">
                Hot
              </span>{" "}
              Picks
            </h1>
            <span className="bg-black h-12 w-12 inline-flex items-center justify-center rounded-full text-white ml-2">
              <ArrowRight className="h-8 w-8 inline-block" />
            </span>
            </div>
            <p>Trending products everyone's talking about</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
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

        <div className="text-center pb-4">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              window.location.href = "/sale";
            }}
          >
            View All Trending
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
