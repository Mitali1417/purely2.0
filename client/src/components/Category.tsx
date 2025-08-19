
import { motion } from "motion/react"
import { ArrowRight, Package, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useCategories } from "@/hooks/useCategories"
import { Link } from "react-router-dom"

export default function CategoriesPage() {
  const { categories, loading, error } = useCategories()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading categories...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Failed to load categories</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header Section */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Shop by Category
          </h1>
          <p className="text-lg text-primary-foreground max-w-2xl mx-auto">
            Discover our curated collection of premium skincare and beauty products organized by category
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/categories/${encodeURIComponent(category.name.toLowerCase())}`}>
                <Card className="group cursor-pointer overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                  <CardContent className="p-0">
                    {/* Category Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Product Count Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                          {category.count} products
                        </div>
                      </div>

                      {/* Hover Arrow */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <ArrowRight className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Category Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Explore {category.count} premium {category.name.toLowerCase()} products
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {categories.length === 0 && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No categories found</h3>
            <p className="text-muted-foreground">We couldn't find any product categories at the moment.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
