export interface Product {
  salePercentage: ReactNode;
  isFeatured: any;
  averageRating: any;
  totalReviews: number;
  totalSold: number;
  originalPrice: any;
  variants: boolean;
  stock: string | number | undefined;
  tags: boolean;
  seoDescription: any;
  sku: ReactNode;
  weight: any;
  dimensions: any;
  shippingClass: ReactNode;
  isOnSale: any;
  _id: string;
  productName: string;
  productPrice: number;
  productImage: string;
  productDescription: string;
  category: string;
  brand?: string;
  rating?: number;
  reviews?: number;
}

// export const productsData: Product[] = [
//   {
//     _id: "1",
//     productName: "Organic Face Cream",
//     productPrice: 29.99,
//     productImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
//     productDescription: "Natural face cream made with organic ingredients for all skin types.",
//     category: "skincare",
//     brand: "Purely Natural",
//     rating: 4.5,
//     reviews: 128
//   },
//   {
//     _id: "2",
//     productName: "Vitamin C Serum",
//     productPrice: 24.99,
//     productImage: "https://images.unsplash.com/photo-1570194065650-1e1a9e6e9ce0?w=400&h=400&fit=crop",
//     productDescription: "Brightening serum with 20% Vitamin C for radiant skin.",
//     category: "skincare",
//     brand: "Purely Natural",
//     rating: 4.8,
//     reviews: 95
//   },
//   {
//     _id: "3",
//     productName: "Hyaluronic Acid Moisturizer",
//     productPrice: 19.99,
//     productImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
//     productDescription: "Deeply hydrating moisturizer with hyaluronic acid.",
//     category: "skincare",
//     brand: "Purely Natural",
//     rating: 4.6,
//     reviews: 203
//   },
//   {
//     _id: "4",
//     productName: "Retinol Night Cream",
//     productPrice: 34.99,
//     productImage: "https://images.unsplash.com/photo-1570194065650-1e1a9e6e9ce0?w=400&h=400&fit=crop",
//     productDescription: "Anti-aging night cream with retinol for smoother skin.",
//     category: "skincare",
//     brand: "Purely Natural",
//     rating: 4.7,
//     reviews: 156
//   },
//   {
//     _id: "5",
//     productName: "Gentle Cleanser",
//     productPrice: 16.99,
//     productImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
//     productDescription: "Gentle daily cleanser suitable for sensitive skin.",
//     category: "skincare",
//     brand: "Purely Natural",
//     rating: 4.4,
//     reviews: 89
//   },
//   {
//     _id: "6",
//     productName: "Sunscreen SPF 50",
//     productPrice: 22.99,
//     productImage: "https://images.unsplash.com/photo-1570194065650-1e1a9e6e9ce0?w=400&h=400&fit=crop",
//     productDescription: "Broad spectrum sunscreen with SPF 50 protection.",
//     category: "skincare",
//     brand: "Purely Natural",
//     rating: 4.9,
//     reviews: 234
//   },
//   {
//     _id: "7",
//     productName: "Niacinamide Serum",
//     productPrice: 18.99,
//     productImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
//     productDescription: "Oil control and pore minimizing serum with 10% niacinamide.",
//     category: "skincare",
//     brand: "Purely Natural",
//     rating: 4.6,
//     reviews: 167
//   },
//   {
//     _id: "8",
//     productName: "Peptide Eye Cream",
//     productPrice: 27.99,
//     productImage: "https://images.unsplash.com/photo-1570194065650-1e1a9e6e9ce0?w=400&h=400&fit=crop",
//     productDescription: "Anti-aging eye cream with peptides for firmer skin around eyes.",
//     category: "skincare",
//     brand: "Purely Natural",
//     rating: 4.5,
//     reviews: 142
//   }
// ]; 