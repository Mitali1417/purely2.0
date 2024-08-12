const mongoose = require("mongoose");

const productListSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  // productDetails: {
  //   type: String,
  //   required: true,
  // },
  productImage: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductList = mongoose.model("ProductList", productListSchema);

module.exports = ProductList;
