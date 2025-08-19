const ProductList = require("../models/productListModel");
const { uploadImage } = require("../config/cloudinaryConfig");

const addProduct = async (req, res) => {
  try {
    const result = await uploadImage(req.file.path);
    const imgUrl = result.secure_url;

    const { 
      productName, 
      productDescription, 
      productPrice, 
      originalPrice,
      category, 
      brand, 
      stock,
      sku,
      tags,
      isFeatured,
      isOnSale,
      salePercentage,
      weight,
      dimensions,
      shippingClass,
      seoTitle,
      seoDescription,
      seoKeywords
    } = req.body;

    const newProduct = new ProductList({
      productName,
      productDescription,
      productImage: imgUrl,
      productPrice: parseFloat(productPrice),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      category,
      brand,
      stock: parseInt(stock),
      sku,
      tags: tags ? JSON.parse(tags) : [],
      isFeatured: isFeatured === 'true',
      isOnSale: isOnSale === 'true',
      salePercentage: salePercentage ? parseInt(salePercentage) : undefined,
      weight: weight ? parseFloat(weight) : undefined,
      dimensions: dimensions ? JSON.parse(dimensions) : undefined,
      shippingClass,
      seoTitle,
      seoDescription,
      seoKeywords: seoKeywords ? JSON.parse(seoKeywords) : [],
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
    const { 
      category, 
      brand, 
      search,
      minPrice,
      maxPrice,
      rating,
      isOnSale,
      isFeatured,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 12,
      tags
    } = req.query;

    const filter = { isActive: true };

    // Category filter
    if (category && category !== 'all') {
      filter.category = category;
    }

    // Brand filter
    if (brand && brand !== 'all') {
      filter.brand = brand;
    }

    // Search filter
    if (search) {
      filter.$or = [
        { productName: { $regex: search, $options: 'i' } },
        { productDescription: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.productPrice = {};
      if (minPrice) filter.productPrice.$gte = parseFloat(minPrice);
      if (maxPrice) filter.productPrice.$lte = parseFloat(maxPrice);
    }

    // Rating filter
    if (rating) {
      filter.averageRating = { $gte: parseFloat(rating) };
    }

    // Sale filter
    if (isOnSale === 'true') {
      filter.isOnSale = true;
    }

    // Featured filter
    if (isFeatured === 'true') {
      filter.isFeatured = true;
    }

    // Tags filter
    if (tags) {
      const tagArray = tags.split(',');
      filter.tags = { $in: tagArray };
    }

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await ProductList.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-reviews'); // Exclude reviews for performance

    const total = await ProductList.countDocuments(filter);

    res.status(200).json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalProducts: total,
        hasNextPage: skip + products.length < total,
        hasPrevPage: parseInt(page) > 1
      }
    });
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

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Handle image upload if provided
    if (req.file) {
      const result = await uploadImage(req.file.path);
      updateData.productImage = result.secure_url;
    }

    // Parse numeric fields
    if (updateData.productPrice) updateData.productPrice = parseFloat(updateData.productPrice);
    if (updateData.originalPrice) updateData.originalPrice = parseFloat(updateData.originalPrice);
    if (updateData.stock) updateData.stock = parseInt(updateData.stock);
    if (updateData.salePercentage) updateData.salePercentage = parseInt(updateData.salePercentage);
    if (updateData.weight) updateData.weight = parseFloat(updateData.weight);

    // Parse array fields
    if (updateData.tags) updateData.tags = JSON.parse(updateData.tags);
    if (updateData.seoKeywords) updateData.seoKeywords = JSON.parse(updateData.seoKeywords);
    if (updateData.dimensions) updateData.dimensions = JSON.parse(updateData.dimensions);

    const product = await ProductList.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductList.findByIdAndDelete(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, userName, rating, comment } = req.body;

    const product = await ProductList.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user already reviewed this product
    const existingReview = product.reviews.find(review => review.userId === userId);
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this product" });
    }

    product.reviews.push({
      userId,
      userName,
      rating: parseInt(rating),
      comment
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const products = await ProductList.find({ 
      isFeatured: true, 
      isActive: true 
    })
    .sort({ createdAt: -1 })
    .limit(8)
    .select('-reviews');

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSaleProducts = async (req, res) => {
  try {
    const products = await ProductList.find({ 
      isOnSale: true, 
      isActive: true 
    })
    .sort({ salePercentage: -1 })
    .limit(8)
    .select('-reviews');

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await ProductList.distinct('category', { isActive: true });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBrands = async (req, res) => {
  try {
    const brands = await ProductList.distinct('brand', { isActive: true });
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTags = async (req, res) => {
  try {
    const tags = await ProductList.distinct('tags', { isActive: true });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  addProduct, 
  getProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct,
  addReview,
  getFeaturedProducts,
  getSaleProducts,
  getCategories,
  getBrands,
  getTags
};
