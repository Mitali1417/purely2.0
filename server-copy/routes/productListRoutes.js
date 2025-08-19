const express = require("express");
const router = express.Router();
const uploader = require("../middlewares/ImageUpload");

const {
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
} = require("../controllers/productListController");

// Product CRUD operations
router.post("/add", uploader.single("image"), addProduct);
router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/sale", getSaleProducts);
router.get("/categories", getCategories);
router.get("/brands", getBrands);
router.get("/tags", getTags);
router.get("/:id", getProductById);
router.put("/:id", uploader.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

// Review operations
router.post("/:id/reviews", addReview);

module.exports = router;