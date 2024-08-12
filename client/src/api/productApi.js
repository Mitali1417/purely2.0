import { useEffect, useState } from "react";

export const getProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://backend-ikk2.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return products;
};
