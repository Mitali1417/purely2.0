const User = require("../models/userModel");

exports.getPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("preferences");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ preferences: user.preferences || {} });
  } catch (err) {
    console.error("Get preferences error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const { preferences } = req.body;
    if (typeof preferences !== "object" || preferences === null) {
      return res.status(400).json({ message: "Invalid preferences payload" });
    }
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { preferences } },
      { new: true, select: "preferences" }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ preferences: user.preferences || {} });
  } catch (err) {
    console.error("Update preferences error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("profile");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ profile: user.profile || {} });
  } catch (err) {
    console.error("Get profile error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { profile } = req.body;
    if (typeof profile !== "object" || profile === null) {
      return res.status(400).json({ message: "Invalid profile payload" });
    }
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { profile } },
      { new: true, select: "profile" }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ profile: user.profile || {} });
  } catch (err) {
    console.error("Update profile error", err);
    return res.status(500).json({ message: "Server error" });
  }
};


// ========== Cart & Wishlist ==========
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("cart")
      .populate({
        path: "cart.productId",
        model: "ProductList",
        select: "productName productPrice productImage productDescription category brand stock averageRating totalReviews isOnSale salePercentage originalPrice discountPrice"
      });
    if (!user) return res.status(404).json({ message: "User not found" });
    
    // Transform populated data to match client expectations
    const items = user.cart.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity,
      product: item.productId
    }));
    
    return res.json({ items });
  } catch (err) {
    console.error("Get cart error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.setCart = async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ message: "Invalid items payload" });
    const normalized = items.map((i) => ({ productId: i.productId, quantity: Math.max(1, Number(i.quantity) || 1) }));
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { cart: normalized } },
      { new: true, select: "cart" }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ items: user.cart || [] });
  } catch (err) {
    console.error("Set cart error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { cart: [] } },
      { new: true, select: "cart" }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ items: [] });
  } catch (err) {
    console.error("Clear cart error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("wishlist")
      .populate({
        path: "wishlist.productId",
        model: "ProductList",
        select: "productName productPrice productImage productDescription category brand stock averageRating totalReviews isOnSale salePercentage originalPrice discountPrice"
      });
    if (!user) return res.status(404).json({ message: "User not found" });
    
    // Transform populated data to match client expectations
    const items = user.wishlist.map(item => ({
      productId: item.productId._id,
      product: item.productId,
      addedAt: new Date()
    }));
    
    return res.json({ items });
  } catch (err) {
    console.error("Get wishlist error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.setWishlist = async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ message: "Invalid items payload" });
    const normalized = items.map((i) => ({ productId: i.productId }));
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { wishlist: normalized } },
      { new: true, select: "wishlist" }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ items: user.wishlist || [] });
  } catch (err) {
    console.error("Set wishlist error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.clearWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { wishlist: [] } },
      { new: true, select: "wishlist" }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ items: [] });
  } catch (err) {
    console.error("Clear wishlist error", err);
    return res.status(500).json({ message: "Server error" });
  }
};
