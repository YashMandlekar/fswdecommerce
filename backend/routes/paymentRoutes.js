const express = require("express");
const router = express.Router();
const { Cashfree } = require("cashfree-pg");
const Order = require("../models/order");

// ✅ USE SAME WORKING INIT
const cashfree = new Cashfree(
  Cashfree.SANDBOX,
  process.env.CASHFREE_APP_ID,
  process.env.CASHFREE_SECRET_KEY
);

// 🔴 CREATE PAYMENT
router.post("/create", async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    console.log("ORDER DATA:", orderId, amount);

    if (!orderId || !amount) {
      return res.status(400).json({ msg: "Missing data" });
    }

    const request = {
      order_amount: amount,
      order_currency: "INR",
      order_id: orderId,

      customer_details: {
        customer_id: "user_" + Date.now(),
        customer_phone: "9999999999",
      },

      order_meta: {
  return_url: `${process.env.CLIENT_URL}/payment-status?order_id={order_id}`,
}
    };

    console.log("FINAL REQUEST:", request);

    // ✅ NO VERSION STRING
    const response = await cashfree.PGCreateOrder(request);

    res.json(response.data);

  } catch (err) {
    console.error("❌ CREATE ERROR FULL:", err.response?.data || err.message);
    res.status(500).json({
      msg: err.response?.data?.message || "Payment failed",
    });
  }
});

// 🔴 CHECK STATUS
router.get("/status/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const response = await cashfree.PGFetchOrder(orderId);
    const paymentData = response.data;

    if (paymentData.order_status === "PAID") {
      await Order.findByIdAndUpdate(orderId, {
        status: "paid",
        isPaid: true,
        paidAt: new Date(),
      });
    }

    res.json({
      status: paymentData.order_status,
      orderId: paymentData.order_id,
    });

  } catch (err) {
    console.error("❌ STATUS ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;