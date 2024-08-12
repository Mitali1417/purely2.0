import { useMemo, useState } from "react";

export const useSortedProducts = (filteredProducts) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("name");

  const sortedProducts = useMemo(() => {
    return filteredProducts.sort((a, b) => {
      let valueA, valueB;

      if (sortBy === "name") {
        valueA = a.productName.toLowerCase();
        valueB = b.productName.toLowerCase();
      } else if (sortBy === "price") {
        valueA = a.productPrice;
        valueB = b.productPrice;
      }

      if (sortOrder === "asc") {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });
  }, [filteredProducts, sortBy, sortOrder]);

  return { sortedProducts, setSortBy, setSortOrder };
};
