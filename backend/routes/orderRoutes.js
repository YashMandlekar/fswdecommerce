const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Cart = require("../models/cart");
const auth = require("../middleware/authMiddleware");

//
// 🔴 CREATE ORDER (WITH ADDRESS)
//
router.post("/create", auth, async (req, res) => {
  try {
    const { shippingAddress } = req.body;

if (
  !shippingAddress ||
  !shippingAddress.name ||
  !shippingAddress.phone ||
  !shippingAddress.address ||
  !shippingAddress.city ||
  !shippingAddress.pincode
) {
  return res.status(400).json({ msg: "Complete address required" });
}

    const cart = await Cart.findOne({ user: req.user.id })
      .populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    // ✅ calculate total
    let total = 0;
    cart.items.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    // ✅ create order
    const order = new Order({
  user: req.user.id,
  items: cart.items,
  totalAmount: total,
  status: "pending",
  isPaid: false,
  shippingAddress: shippingAddress, // ✅ ADD THIS
});

    await order.save();

    // ✅ clear cart
    cart.items = [];
    await cart.save();

    res.json(order);

  } catch (err) {
    console.error("ORDER CREATE ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
});


//
// 🔴 UPDATE PAYMENT STATUS (IMPORTANT)
//
router.post("/mark-paid", async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    order.isPaid = true;
    order.status = "paid";
    order.paidAt = new Date();

    await order.save();

    res.json({ msg: "Payment updated" });

  } catch (err) {
    console.error("PAYMENT UPDATE ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
});


//
// 🔴 GET USER ORDERS (ONLY PAID)
//
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
      isPaid: true, // ✅ better than status check
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    console.error("ORDER FETCH ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;