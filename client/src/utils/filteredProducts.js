import { useMemo } from "react";

export const filteredProducts = (products, searchTerm) => {
  return useMemo(() => {
    return products.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);
};
