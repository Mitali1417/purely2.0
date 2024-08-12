const express = require("express");
const router = express.Router();
const uploader = require("../middlewares/ImageUpload");

const {
  addProduct,
  getProducts,
  getProductById,
} = require("../controllers/productListController");

router.post("/add", uploader.single("image"), addProduct);

router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;