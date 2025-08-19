const express = require("express");
const router = express.Router();
const { register, login, me, guestLogin } = require("../controllers/authController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth, me);
router.post("/guest", guestLogin);

module.exports = router;


