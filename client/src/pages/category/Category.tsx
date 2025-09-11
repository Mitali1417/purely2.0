import { motion } from "motion/react";
import { ChevronRight, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCategories } from "@/hooks/useCategories";
import { Link } from "react-router-dom";
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoriesPage() {
  const { categories, loading } = useCategories();

  return (
    <div>
      {/* Header Section */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="mb-2">
            Skincare <span className="text-3xl font-dm font-light">&</span> Haircare
          </h2>
          <p>
            Discover products that nourish your skin and hair
          </p>
        </motion.div>

        {/* Categories Grid - Compact for mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-2"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              <Link
                to={`/categories/${encodeURIComponent(
                  category.name.toLowerCase()
                )}`}
                className="block"
              >
                <Card className="flex flex-col h-32 p-3 transition-all duration-300 bg-white border border-slate-100 group-hover:border-primary/20 group-hover:shadow-md overflow-hidden rounded-xl">
                  
                  {/* Product count badge - smaller */}
                  <div className="absolute top-1.5 right-1.5 z-20">
                    <div className="bg-primary text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                      {category.count}
                    </div>
                  </div>

                  {/* Category Image - compact */}
                  <div className="relative z-10 w-full h-16 mb-2 rounded-md overflow-hidden">
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-400"
                    />
                    
                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
                  </div>

                  {/* Category Info - compact */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-300">
                        {category.name}
                      </h5>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1 flex-shrink-0"
                    >
                      <ChevronRight className="h-3 w-3 text-primary" />
                    </motion.div>
                  </div>

                  {/* Hover effect line */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-400 rounded-full" />
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {categories.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 px-4"
          >
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-base font-semibold mb-1">No categories found</h3>
            <p className="text-muted-foreground text-sm">
              We couldn't find any product categories at the moment.
            </p>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 gap-3 px-2"
          >
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-32 p-3 bg-white border border-slate-100 rounded-xl"
              >
                <Skeleton className="w-full h-16 mb-2 rounded-md" />
                <Skeleton className="h-3 w-1/2 rounded" />
              </div>
            ))}
          </motion.div>
        )}
      </div>

    </div>
  );
}