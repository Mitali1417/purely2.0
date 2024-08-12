const mongoose = require("mongoose");
const connectDB = require("./config/db");
const ProductList = require("./models/productListModel");
const updateProducts = async () => {
  try {
    await connectDB();
    const products = await ProductList.find();

    const updatePromises = products.map((product) =>
      ProductList.findByIdAndUpdate(product._id, {
        category: "defaultCategory",
        brand: "defaultBrand",
        stock: 200,
      })
    );

    await Promise.all(updatePromises);
    console.log("Products updated successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error updating products:", error);
    mongoose.connection.close();
  }
};

updateProducts();
