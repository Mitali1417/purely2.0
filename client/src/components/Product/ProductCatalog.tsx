import { useState, useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import { styles } from "../../style/tailwindStyles";
import { ProductCard } from "./ProductCard";
import { ProductCardMinimal } from "../ProductCardMinimal";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { List, LayoutGrid } from "lucide-react";

const ProductCatalog = () => {
  const { data: products, isLoading, isError } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "price">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [view, setView] = useState<"grid" | "list">("grid");

  const categories = useMemo(() => {
    const all = (products ?? [])
      .map((p: any) => String(p?.category ?? ""))
      .filter((v: string) => v.length > 0);
    return ["all", ...Array.from(new Set(all))] as string[];
  }, [products]);

  const filteredSorted = useMemo(() => {
    const list = (products ?? []).filter((p: any) => {
      const matchesSearch = (p?.productName ?? "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === "all" || (p?.category ?? "") === category;
      return matchesSearch && matchesCategory;
    });
    const sorted = [...list].sort((a: any, b: any) => {
      let aVal: string | number = sortBy === "name" ? (a?.productName ?? "").toLowerCase() : a?.productPrice ?? 0;
      let bVal: string | number = sortBy === "name" ? (b?.productName ?? "").toLowerCase() : b?.productPrice ?? 0;
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [products, searchTerm, category, sortBy, sortOrder]);

  // Framer Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger animation for each product card
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const skeletonVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
      },
    },
  };

  // --- Render Logic ---
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full p-4">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-full h-80 rounded-xl bg-gray-200 dark:bg-gray-800"
              variants={skeletonVariants}
              animate="animate"
            />
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-center text-red-500 text-lg font-medium p-8 rounded-lg bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 mx-auto max-w-md">
          <p>Failed to load products. Please try again later.</p>
        </div>
      );
    }

    if (products?.length === 0) {
      return (
        <div className="text-center text-gray-500 dark:text-gray-400 text-lg font-medium p-8">
          <p>No products found. Check back soon!</p>
        </div>
      );
    }

    return (
      <motion.div
        className={`${view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : "flex flex-col gap-4"} w-full p-4`}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {filteredSorted.map((product: any) => (
          <motion.div key={product._id} variants={itemVariants}>
            {view === "grid" ? (
              <ProductCard product={product} />
            ) : (
              <ProductCardMinimal product={product} />
            )}
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={`${styles.flexCenter} flex-col w-full px-4`}>
      <div className="flex flex-col gap-6 mb-8 w-full max-w-6xl">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-light tracking-wide text-gray-900 dark:text-gray-100 mb-2">Product Catalog</h2>
          <div className="w-24 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="flex-1">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11"
            />
          </div>
          <div className="flex gap-2 items-center">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-36 h-11">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c: string) => (
                  <SelectItem key={String(c)} value={String(c)}>{String(c)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={`${sortBy}-${sortOrder}`} onValueChange={(v) => {
              const [by, order] = v.split("-") as ["name" | "price", "asc" | "desc"];
              setSortBy(by);
              setSortOrder(order);
            }}>
              <SelectTrigger className="w-40 h-11">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name A→Z</SelectItem>
                <SelectItem value="name-desc">Name Z→A</SelectItem>
                <SelectItem value="price-asc">Price Low→High</SelectItem>
                <SelectItem value="price-desc">Price High→Low</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1">
              <Button variant={view === "grid" ? "default" : "outline"} size="icon" onClick={() => setView("grid")}>
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button variant={view === "list" ? "default" : "outline"} size="icon" onClick={() => setView("list")}>
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default ProductCatalog;