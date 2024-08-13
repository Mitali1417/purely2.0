import { useEffect, useState } from "react";

export const getProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://purely2-0-backend.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return products;
};
