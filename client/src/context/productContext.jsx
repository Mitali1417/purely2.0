import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const useShop = () => {
  return useContext(ShopContext);
};

export const ShopProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const handleWishlist = (product) => {
    setWishlist((prevWishlist) =>
      prevWishlist.some((item) => item._id === product._id)
        ? prevWishlist.filter((item) => item._id !== product._id)
        : [...prevWishlist, product]
    );
  };

  const handleCart = (product) => {
    setCart((prevCart) =>
      prevCart.some((item) => item._id === product._id)
        ? prevCart.filter((item) => item._id !== product._id)
        : [...prevCart, product]
    );
  };

  return (
    <ShopContext.Provider value={{ wishlist, cart, handleWishlist, handleCart }}>
      {children}
    </ShopContext.Provider>
  );
};
