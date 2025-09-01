import { useParams } from "react-router-dom"
import { Loader2, Package } from "lucide-react"
import { useProductsByCategory } from "@/hooks/useCategories"
import { ProductCard } from "@/components/Product/ProductCard"

export default function CategoryProductsPage() {
  const { categoryName } = useParams<{ categoryName: string }>()
  const safeCategory = categoryName ? decodeURIComponent(categoryName) : ""
  const { products, loading, error } = useProductsByCategory(safeCategory)

  if (!safeCategory) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-semibold">Invalid category</h2>
        <p className="text-muted-foreground">Please select a valid category.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center mt-20">
        <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Failed to load products</h2>
        <p className="text-muted-foreground">{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 pt-24">
      <h1 className="text-3xl font-bold mb-6">
        {safeCategory} Products
      </h1>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">
            We couldn't find any products in the {safeCategory} category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
