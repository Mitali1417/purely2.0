const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const variantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  sku: {
    type: String,
    required: true,
  },
});

const productListSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  productImages: [{
    type: String,
  }],
  productPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  originalPrice: {
    type: Number,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['skincare', 'makeup', 'haircare', 'bodycare', 'fragrance', 'tools', 'accessories'],
  },
  brand: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  variants: [variantSchema],
  tags: [{
    type: String,
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isOnSale: {
    type: Boolean,
    default: false,
  },
  salePercentage: {
    type: Number,
    min: 0,
    max: 100,
  },
  weight: {
    type: Number,
    min: 0,
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
  },
  shippingClass: {
    type: String,
    enum: ['standard', 'express', 'free'],
    default: 'standard',
  },
  reviews: [reviewSchema],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  totalSold: {
    type: Number,
    default: 0,
  },
  seoTitle: {
    type: String,
  },
  seoDescription: {
    type: String,
  },
  seoKeywords: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
productListSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate average rating when reviews are added/updated
productListSchema.pre('save', function(next) {
  if (this.reviews && this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = totalRating / this.reviews.length;
    this.totalReviews = this.reviews.length;
  }
  next();
});

const ProductList = mongoose.model("ProductList", productListSchema);

module.exports = ProductList;
