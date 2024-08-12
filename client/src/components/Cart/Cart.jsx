import React, { useState, useEffect } from "react";
import { useShop } from "../../context/productContext";
import { styles } from "../../style/tailwindStyles";
import Cross from "../../assets/Nav/close.svg";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import {
  handleAddProductQuantity,
  handleSubProductQuantity,
} from "../../utils/productHandlers";

const Cart = () => {
  const { cart, handleCart } = useShop();
  const [productQuantity, setProductQuantity] = useState({});

  useEffect(() => {
    const initialQuantities = {};
    cart.forEach((product) => {
      initialQuantities[product._id] = 1;
    });
    setProductQuantity(initialQuantities);
  }, [cart]);

  let totalPrice = 0;
  cart.forEach((product) => {
    totalPrice += product.productPrice * (productQuantity[product._id] || 1);
  });

  return (
    <Box className={`${styles.flexCenter} flex-col my-[1rem]`}>
      <Box
        className={`${styles.flexCenter} flex-col bg-white/20 min-h-[95vh] w-full p-[2rem] rounded-[1rem]`}
      >
        {cart.length === 0 ? (
          <Typography variant="h3" component="h3">
            No Items in the cart
          </Typography>
        ) : (
          <>
            <Grid
              container
              spacing={3}
              className={`${styles.flexStart} pt-[5rem] w-full h-full`}
            >
              <Grid item xs={12} md={8}>
                <Box>
                  {cart.map((product) => (
                    <Card
                      style={{
                        overflow: "visible",
                        borderRadius: "1rem",
                        padding: "0rem",
                      }}
                      key={product._id}
                      className={`relative w-full mb-2 overflow-visible`}
                    >
                      <CardContent
                        style={{ padding: "0.4rem" }}
                        className={`${styles.flexStart} items-center w-full`}
                      >
                        <div>
                          <img
                            src={product.productImage}
                            alt={product.productName}
                            className="w-[6rem] h-[6rem] object-contain bg-white rounded-[0.5rem] p-[0.3rem]"
                          />
                        </div>
                        <div className={`ml-[2rem]`}>
                          <Typography
                            variant="h6"
                            className={`${styles.text3}`}
                          >
                            {product.productName}
                          </Typography>
                          <Typography
                            variant="body2"
                            className={`${styles.text2}`}
                          >
                            Rs. {product.productPrice}
                          </Typography>
                          <div
                            className={`${styles.flexCenter} w-fit mt-[0.5rem]`}
                          >
                            <AddIcon
                              onClick={() =>
                                handleAddProductQuantity(product._id)
                              }
                              className={`cursor-pointer`}
                            />
                            <span
                              className={`bg-primary px-[1rem] py-[0.2rem] rounded-[0.5rem] `}
                            >
                              {productQuantity[product._id] || 1}
                            </span>
                            <RemoveIcon
                              onClick={() =>
                                handleSubProductQuantity(product._id)
                              }
                              className={`cursor-pointer`}
                            />
                          </div>
                        </div>
                      </CardContent>

                      <img
                        onClick={() => handleCart(product)}
                        src={Cross}
                        className="w-[1.5rem] absolute -left-[0.5rem] -top-[0.5rem] bg-black rounded-full"
                        alt="Remove"
                      />
                    </Card>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box className="bg-white text-primary p-4 rounded-lg h-full lg:min-h-[70vh]">
                  <Typography
                    variant="h5"
                    style={{
                      color: "#a97bc5",
                    }}
                  >
                    Order Summary
                  </Typography>
                  {cart.map((product) => (
                    <Box
                      key={product._id}
                      className={`${styles.flexBetween}`}
                      mt={2}
                    >
                      <Typography variant="body5" className={`w-[80%]`}>
                        {product.productName}
                        <br />
                        <span>Qty: {productQuantity[product._id] || 1}</span>
                      </Typography>

                      <Typography variant="body5" className={`w-[20%]`}>
                        Rs.
                        {product.productPrice *
                          (productQuantity[product._id] || 1)}
                      </Typography>
                    </Box>
                  ))}
                  <Box mt={4} borderTop="1px solid #a97bc5" pt={2}>
                    <Typography variant="h6">
                      Total Amount: Rs. {totalPrice}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Cart;
