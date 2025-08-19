import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCardMinimal } from "./ProductCardMinimal";


export const SearchDialog = ({ isOpen, onOpenChange }) => {
  const [query, setQuery] = useState("");
  const { data: products = [], isLoading: loading, isError: error } = useProducts({ search: query, enabled: query.length > 0 });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl p-4 md:p-6 border-none bg-white dark:bg-gray-950 rounded-xl shadow-2xl">
        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search for products..."
            className="w-full h-12 pl-12 pr-4 text-lg bg-gray-100 dark:bg-gray-900 border-none rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {loading && query && (
            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-gray-500" />
          )}
        </div>

        {/* Search Results */}
        <div className="overflow-y-auto max-h-[70vh] pr-4 -mr-4">
          {error && (
            <div className="flex justify-center items-center py-10 text-center text-red-500">
              <p>Error loading results</p>
            </div>
          )}

          {loading && query && !error && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
            </div>
          )}

          {!loading && products.length > 0 && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {products.map((product) => (
                <ProductCardMinimal key={product._id} product={product} />
              ))}
            </motion.div>
          )}

          {!loading && products.length === 0 && query && (
            <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
              <p className="text-xl font-semibold">No results found.</p>
              <p className="text-sm mt-2">Try a different search term or browse our catalog.</p>
            </div>
          )}

          {!query && (
            <div className="flex justify-center py-10 text-gray-400">
              <p>Start typing to search for products.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};