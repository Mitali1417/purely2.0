const ProductList = require("../models/productListModel");
const { uploadImage } = require("../config/cloudinaryConfig");

const addProduct = async (req, res) => {
  try {
    const result = await uploadImage(req.file.path);
    const imgUrl = result.secure_url;

    const { productName, productDetails, productPrice, category, brand, stock } = req.body;
    const newProduct = new ProductList({
      productName,
      productDetails,
      productImage: imgUrl,
      productPrice,
      category,
      brand,
      stock,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const { category, brand } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (brand) filter.brand = brand;

    const products = await ProductList.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await ProductList.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addProduct, getProducts, getProductById };
