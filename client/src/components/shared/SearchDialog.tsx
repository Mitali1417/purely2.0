import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useProducts } from "@/hooks/useProducts";
import { useState, useEffect, useCallback, useRef } from "react";
import { ProductListingCard } from "@/pages/products/ProductCatalog";
import type { Product } from "@/lib/store";
import { useDebounce, useDebouncedCallback } from "@/hooks/useDebounce";

interface SearchDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const SearchDialog = ({ isOpen, onOpenChange }: SearchDialogProps) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500); // Increased debounce time for better performance
  const observerTarget = useRef<HTMLDivElement>(null);
  const { data, isLoading: loading, isError: error } = useProducts({ 
    search: debouncedQuery, 
    enabled: true,
    limit: 10,
    useInfinite: true
  });

  const products = Array.isArray(data) ? data : data?.products || [];
  
  // Throttled intersection observer callback
  const handleIntersection = useCallback((_entries: IntersectionObserverEntry[]) => {
    // Handle pagination if needed
  }, []);

  const throttledHandleIntersection = useDebouncedCallback(handleIntersection, 500);

  useEffect(() => {
    const observer = new IntersectionObserver(throttledHandleIntersection, {
      rootMargin: '100px',
    });

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      observer.disconnect();
    };
  }, [throttledHandleIntersection]);

  const handleOpenChange = useCallback((open: boolean) => {
    onOpenChange(open);
  }, [onOpenChange]);

  useEffect(() => {
    if (!isOpen) {
      const id = setTimeout(() => setQuery(""), 300);
      return () => clearTimeout(id);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl lg:max-w-6xl p-0 overflow-hidden border-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 rounded-xl shadow-2xl">
        <div className="relative p-4 border-b bg-background/80 backdrop-blur">
          <DialogHeader className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for products, brands, or categories..."
              className="w-full h-12 pl-10 pr-4 text-muted-foreground"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {loading && debouncedQuery && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            )}
          </DialogHeader>
        </div>

        {/* Search Results */}
        <div className="overflow-y-auto max-h-[60vh] p-4 md:p-6 overscroll-contain">
          <AnimatePresence>
            {error && (
              <motion.div
              key={'error'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground"
              >
                <div className="rounded-full bg-destructive/10 p-3 mb-3">
                  <X className="h-6 w-6 text-destructive" />
                </div>
                <p className="font-medium text-destructive">Failed to load results</p>
                <p className="text-sm mt-1">Please try again later</p>
              </motion.div>
            )}

            {debouncedQuery && !loading && products.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try different keywords or browse our categories
                </p>
              </motion.div>
            )}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">{debouncedQuery ? 'Searching products...' : 'Loading products...'}</p>
              </motion.div>
            )}

            {!loading && products.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Array.isArray(products) && products.map((product: Product, index: number) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="w-full"
                    >
                      <ProductListingCard product={product} />
                    </motion.div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Infinite Scroll Loader */}
            {false && (
              <div ref={observerTarget} className="mt-4 flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};