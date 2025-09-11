const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/authMiddleware");
const {
  getPreferences,
  updatePreferences,
  getProfile,
  updateProfile,
  getCart,
  setCart,
  clearCart,
  getWishlist,
  setWishlist,
  clearWishlist,
} = require("../controllers/userController");

router.get("/me/preferences", requireAuth, getPreferences);
router.put("/me/preferences", requireAuth, updatePreferences);
router.get("/me/profile", requireAuth, getProfile);
router.put("/me/profile", requireAuth, updateProfile);

// Cart
router.get("/me/cart", requireAuth, getCart);
router.put("/me/cart", requireAuth, setCart);
router.delete("/me/cart", requireAuth, clearCart);

// Wishlist
router.get("/me/wishlist", requireAuth, getWishlist);
router.put("/me/wishlist", requireAuth, setWishlist);
router.delete("/me/wishlist", requireAuth, clearWishlist);

module.exports = router;


