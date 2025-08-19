// src/hooks/useSingleProduct.js
import { useEffect, useState } from "react";

export const useSingleProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      setError("Product ID is missing.");
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `http://localhost:5003/api/products/${productId}`;
        const res = await fetch(url);

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Product not found.");
          }
          throw new Error("Failed to fetch product details.");
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};