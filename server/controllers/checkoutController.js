const Stripe = require("stripe");
const { z } = require("zod");

let stripe = null;
const getStripe = () => {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (key) {
      stripe = new Stripe(key);
    }
  }
  return stripe;
};
const clientUrl = process.env.CLIENT_URL;

// Expect cartItems: [{ id, name, price, quantity, image }]
exports.createCheckoutSession = async (req, res) => {
  try {
    const stripeClient = getStripe();
    if (!process.env.STRIPE_SECRET_KEY || !stripeClient) {
      console.error("Stripe secret key is missing. Set STRIPE_SECRET_KEY in the server .env");
      return res.status(500).json({ message: "Stripe is not configured on the server" });
    }
    if (!clientUrl) {
      console.error("CLIENT_URL is missing. Set CLIENT_URL in the server .env");
      return res.status(500).json({ message: "CLIENT_URL is not configured on the server" });
    }
    const { cartItems, customerEmail } = req.body || {};
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "cartItems required" });
    }

    const CartItemSchema = z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      price: z.union([z.number(), z.string()]).transform((v) => Number(v)),
      quantity: z.union([z.number(), z.string()]).transform((v) => Number(v)).default(1),
      image: z.string().url().optional().or(z.literal("")).optional(),
    });

    const parsedItems = cartItems.map((ci, idx) => {
      const parsed = CartItemSchema.safeParse(ci);
      if (!parsed.success) {
        throw new Error(`Invalid cart item at index ${idx}: ${JSON.stringify(parsed.error.issues)}`);
      }
      const priceInCents = Math.round(parsed.data.price * 100);
      if (!Number.isFinite(priceInCents) || priceInCents <= 0) {
        throw new Error(`Invalid price for item '${parsed.data.name}': ${parsed.data.price}`);
      }
      const qty = parsed.data.quantity;
      if (!Number.isFinite(qty) || qty <= 0) {
        throw new Error(`Invalid quantity for item '${parsed.data.name}': ${parsed.data.quantity}`);
      }
      return {
        id: parsed.data.id,
        name: parsed.data.name,
        priceInCents,
        quantity: qty,
        image: parsed.data.image,
      };
    });

    const line_items = parsedItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : undefined,
          metadata: { productId: String(item.id) },
        },
        unit_amount: item.priceInCents,
      },
      quantity: item.quantity,
      adjustable_quantity: { enabled: true, minimum: 1, maximum: 10 },
    }));

    const session = await stripeClient.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "AU", "IN"] },
      allow_promotion_codes: true,
      phone_number_collection: { enabled: true },
      customer_email: customerEmail,
      line_items,
      success_url: `${clientUrl}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/cart?checkout=cancel`,
      automatic_tax: { enabled: false },
      shipping_options: [
        { shipping_rate_data: { display_name: "Standard", type: "fixed_amount", fixed_amount: { amount: 0, currency: "inr" }, delivery_estimate: { minimum: { unit: "business_day", value: 3 }, maximum: { unit: "business_day", value: 7 } } } },
        { shipping_rate_data: { display_name: "Express", type: "fixed_amount", fixed_amount: { amount: 15000, currency: "inr" }, delivery_estimate: { minimum: { unit: "business_day", value: 1 }, maximum: { unit: "business_day", value: 2 } } } },
      ],
    });

    return res.status(200).json({ id: session.id, url: session.url });
  } catch (err) {
    const stripeErrorMessage = err?.raw?.message || err?.message || "Unknown error";
    console.error("Stripe create session error:", stripeErrorMessage, err);
    return res.status(500).json({ message: "Failed to create checkout session", details: stripeErrorMessage });
  }
};

exports.handleStripeWebhook = async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
      event = require("stripe").webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    } catch (err) {
      console.error("Webhook signature verification failed.", err?.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        // TODO: fulfill order, reduce inventory, send confirmation
        break;
      }
      case "checkout.session.async_payment_succeeded":
      case "payment_intent.succeeded":
        // handle success
        break;
      case "payment_intent.payment_failed":
        // handle failure
        break;
      default:
        break;
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook error", err);
    res.status(500).send("Webhook handler failed");
  }
};


