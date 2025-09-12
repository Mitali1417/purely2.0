
import { useEffect, useState } from "react"
import { useProductStore } from "@/lib/store"

export interface Product {
  _id: string
  productName: string
  productImage: string
  productPrice: number
  brand: string
  category: string
  stock: number
  createdAt: string
  __v: number
}

export interface Category {
  name: string
  count: number
  image: string // We'll use the first product's image as category image
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const products = useProductStore((s) => s.products)

  useEffect(() => {
    try {
      setLoading(true)
      const data: any[] = Array.isArray(products) ? products : []
      const categoryMap = new Map<string, { count: number; image: string }>()
      data.forEach((product) => {
        const existing = categoryMap.get(product.category)
        if (existing) {
          existing.count += 1
        } else {
          categoryMap.set(product.category, {
            count: 1,
            image: product.productImage,
          })
        }
      })
      const categoriesArray: Category[] = Array.from(categoryMap.entries()).map(([name, { count, image }]) => ({
        name,
        count,
        image,
      }))
      setCategories(categoriesArray.sort((a, b) => b.count - a.count))
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Error computing categories:", err)
    } finally {
      setLoading(false)
    }
  }, [products])

  return { categories, products, loading, error }
}

export const useProductsByCategory = (categoryName: string) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:5003/api/products")

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data: Product[] = await response.json()
        const filteredProducts = data.filter((product) => product.category.toLowerCase() === categoryName.toLowerCase())

        setProducts(filteredProducts)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("Error fetching products by category:", err)
      } finally {
        setLoading(false)
      }
    }

    if (categoryName) {
      fetchProductsByCategory()
    }
  }, [categoryName])

  return { products, loading, error }
}
