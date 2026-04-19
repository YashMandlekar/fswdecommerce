const mongoose = require("mongoose");

/* 🔴 SHIPPING ADDRESS SCHEMA */
const shippingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
});

/* 🔴 ORDER ITEM SCHEMA */
const itemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

/* 🔴 MAIN ORDER SCHEMA */
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [itemSchema], // ✅ structured items

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "pending",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,

    shippingAddress: {
      type: shippingSchema,
      required: true, // ✅ forces validation
    },
  },
  { timestamps: true }
);

/* 🔴 EXPORT SAFE MODEL */
module.exports =
  mongoose.models.Order || mongoose.model("Order", orderSchema, "orders");