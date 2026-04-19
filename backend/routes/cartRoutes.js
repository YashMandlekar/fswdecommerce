const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const auth = require("../middleware/authMiddleware");

// ADD TO CART
// cartRoutes.js
router.post("/add", auth, async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = new Cart({ user: req.user.id, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    // ✅ SET quantity (not add)
    cart.items[itemIndex].quantity = quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.json(cart);
});

router.post("/remove", auth, async (req, res) => {
  try {
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    await cart.save();
    res.json(cart);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});



router.post("/update", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const item = cart.items.find(
      item => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    item.quantity = quantity;

    await cart.save();
    res.json(cart);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate("items.product");

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;