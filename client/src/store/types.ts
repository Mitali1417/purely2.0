// src/lib/stores/types.ts
export type User = {
  id: string;
  name: string;
  email: string;
};

export type Product = {
  _id: string;
  productName: string;
  productPrice: number;
  productImage: string;
  productBrand?: string;
  productCategory?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
