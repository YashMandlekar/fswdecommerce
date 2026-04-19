const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// 🔴 CREATE PRODUCT
router.post("/add", async (req, res) => {
  try {
    const { name, price, description, image, category, countInStock } = req.body;

    const product = new Product({
      name,
      price,
      description,
      image,
      category,
      countInStock,
    });

    await product.save();

    res.json(product);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// 🔴 GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// 🔴 GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log("DELETE HIT"); // debug

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    await product.deleteOne();

    res.json({ msg: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;