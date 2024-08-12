export const handleWishlist = (product, wishlist, dispatch) => {
  if (wishlist.find((item) => item._id === product._id)) {
    dispatch(removeFromWishlist(product._id));
  } else {
    dispatch(addToWishlist(product));
  }
};

export const handleCart = (product, cart, dispatch) => {
  if (cart.find((item) => item._id === product._id)) {
    dispatch(removeFromCart(product._id));
  } else {
    dispatch(addToCart(product));
  }
};

export const handleAddProductQuantity = (productId) => {
  setProductQuantity((prevQuantities) => ({
    ...prevQuantities,
    [productId]: prevQuantities[productId] + 1,
  }));
};
export const handleSubProductQuantity = (productId) => {
  setProductQuantity((prevQuantities) => {
    if (prevQuantities[productId] === 1) {
      handleCart(cart.find((product) => product._id === productId));
      return prevQuantities;
    } else {
      return {
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      };
    }
  });
};
