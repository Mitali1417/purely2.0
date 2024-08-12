import React from "react";
import { useShop } from "../../context/productContext";
import { styles } from "../../style/tailwindStyles";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Wishlist = () => {
  const { wishlist, cart, handleWishlist, handleCart } = useShop();

  return (
    <Box className={`${styles.flexCenter} flex-col my-[1rem]`}>
      <Box
        className={`${styles.flexCenter} flex-col bg-white/20 min-h-[95vh] w-full rounded-[1rem]`}
      >
        {wishlist.length === 0 ? (
          <Typography variant="h3" component="h3">
            No Items in the wishlist
          </Typography>
        ) : (
          <>
            <Typography
              variant="h3"
              component="h3"
              style={{
                marginTop: "7rem",
                marginBottom: "1.5rem",
              }}
            >
              Wishlist
            </Typography>
            <Grid
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 font-Quicks font-medium mb-32`}
            >
              {wishlist.map((product) => (
                <Card
                  key={product._id}
                  className={`${styles.flexBetween} flex-col w-[20rem] h-[28rem] m-[0.5rem]`}
                >
                  <CardContent className={`w-full`}>
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="w-full h-[12rem] rounded-[1rem] bg-white p-2 object-contain mb-[2rem]"
                    />
                    <Typography variant="h6">{product.productName}</Typography>
                    <Typography variant="body2">
                      Rs. {product.productPrice}
                    </Typography>
                  </CardContent>
                  <CardContent className={`${styles.flexBetween} w-full`}>
                    <IconButton onClick={() => handleWishlist(product)}>
                      <DeleteIcon />
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
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Wishlist;
