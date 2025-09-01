const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/authMiddleware");
const { getPreferences, updatePreferences, getProfile, updateProfile } = require("../controllers/userController");

router.get("/me/preferences", requireAuth, getPreferences);
router.put("/me/preferences", requireAuth, updatePreferences);
router.get("/me/profile", requireAuth, getProfile);
router.put("/me/profile", requireAuth, updateProfile);

module.exports = router;


