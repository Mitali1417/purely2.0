const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/authMiddleware");
const { suggest } = require("../controllers/assistantController");

router.post("/suggest", requireAuth, suggest);

module.exports = router;


