const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    preferences: {
      type: Object,
      default: {},
    },
    profile: {
      age: { type: Number, min: 0, max: 120 },
      climate: { type: String, enum: ["humid", "dry", "temperate", "cold", "hot"], default: undefined },
      allergies: { type: [String], default: [] },
      skinType: { type: String, enum: ["oily", "dry", "combination", "normal", "sensitive"], default: undefined },
      hairType: { type: String, enum: ["straight", "wavy", "curly", "coily"], default: undefined },
      routine: {
        type: String,
        enum: ["minimal", "standard", "advanced"],
        default: undefined,
      },
      budget: {
        type: String,
        enum: ["low", "medium", "high"],
        default: undefined,
      },
      ingredientPreferences: {
        avoid: { type: [String], default: [] },
        prefer: { type: [String], default: [] },
      },
      notes: { type: String, maxlength: 1000 },
    },
    cart: {
      type: [
        new mongoose.Schema(
          {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, min: 1, default: 1 },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
    wishlist: {
      type: [
        new mongoose.Schema(
          {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;


