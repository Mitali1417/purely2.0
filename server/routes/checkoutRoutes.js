const express = require("express");
const router = express.Router();

const {
  createCheckoutSession,
  handleStripeWebhook,
} = require("../controllers/checkoutController");

// Create Stripe Checkout Session
router.post("/create-session", createCheckoutSession);

// Stripe webhook (must be raw body parsing configured at app level or here)
router.post("/webhook", handleStripeWebhook);

module.exports = router;


