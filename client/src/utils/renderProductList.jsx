import React from "react";
import { useShop } from "../context/productContext";
import WishlistIcon from "../assets/wishlist.svg";
import WishlistIconFilled from "../assets/wishlist-2.svg";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { styles } from "../style/tailwindStyles";

export const renderProductList = (products) => {
  const { wishlist, cart, handleWishlist, handleCart } = useShop();

  return products.map((product) => (
    <Card
      key={product._id}
      className={`${styles.flexBetween} flex-col w-[20rem] h-[25rem] m-[0.5rem]`}
      style={{ padding: "0rem" }}
    >
      <CardContent className="w-full">
        <img
          src={product.productImage}
          alt={product.productName}
          className="w-full h-[12rem] rounded-[1rem] bg-white p-2 object-contain mb-[2rem]"
        />
        <Typography variant="h6">{product.productName}</Typography>
        <Typography variant="body2">Rs. {product.productPrice}</Typography>
      </CardContent>
      <CardActions className="flex justify-between w-full">
        <IconButton
          className="w-[3rem] h-[3rem]"
          onClick={() => handleWishlist(product)}
        >
          {wishlist.find((item) => item._id === product._id) ? (
            <img src={WishlistIconFilled} alt="Wishlist" />
          ) : (
            <img src={WishlistIcon} alt="Not in Wishlist" />
          )}
        </IconButton>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => handleCart(product)}
        >
          {cart.find((item) => item._id === product._id) ? (
            <p>Remove from Cart</p>
          ) : (
            <p>Add to Cart</p>
          )}
        </Button>
      </CardActions>
    </Card>
  ));
};
