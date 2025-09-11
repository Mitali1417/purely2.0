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
   originalPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: false,
  },
  discountPercentage: {
    type: String, 
    required: false,
  },
  rating: {
    type: Number,
    default: 0,
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
