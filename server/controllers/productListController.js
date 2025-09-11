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
    const { category, subcategory, brand, search, sort, price_min, price_max } = req.query;
    let filter = {};

    // Filter by category
    if (category) {
      filter.category = new RegExp(`^${category}$`, "i");
    }

    // Filter by subcategory (if it's a specific subcategory)
    if (subcategory) {
      filter.category = subcategory;
    }

    if (brand) filter.brand = brand;

    // Search functionality
    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { productName: regex },
        { brand: regex }
      ];
    }

    // Price range filter
    if (price_min || price_max) {
      filter.discountPrice = {};
      if (price_min) filter.discountPrice.$gte = Number(price_min);
      if (price_max) filter.discountPrice.$lte = Number(price_max);
    }

    let products = await ProductList.find(filter);

    // Sorting
    if (sort) {
      switch (sort) {
        case 'price-low':
          products.sort((a, b) => a.discountPrice - b.discountPrice);
          break;
        case 'price-high':
          products.sort((a, b) => b.discountPrice - a.discountPrice);
          break;
        case 'name':
          products.sort((a, b) => a.productName.localeCompare(b.productName));
          break;
        case 'newest':
          products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        default:
          break;
      }
    }

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

const getCategories = async (req, res) => {
  try {
    const categories = await ProductList.distinct('category');
    const categoryData = categories.map(category => ({
      name: category,
      count: 0 // Will be populated below
    }));

    // Get count for each category
    for (let category of categoryData) {
      const count = await ProductList.countDocuments({ category: category.name });
      category.count = count;
    }

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBrands = async (req, res) => {
  try {
    const brands = await ProductList.distinct('brand');
    const brandData = brands.map(brand => ({
      name: brand,
      count: 0 // Will be populated below
    }));

    // Get count for each brand
    for (let brand of brandData) {
      const count = await ProductList.countDocuments({ brand: brand.name });
      brand.count = count;
    }

    res.status(200).json(brandData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addProduct, getProducts, getProductById, getCategories, getBrands };
