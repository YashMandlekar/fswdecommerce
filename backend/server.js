import cors from "cors";
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");


const app = express();

app.use(cors({
  origin: "*", // Allow all origins (for development only, restrict in production)
}))

// Middleware
app.use(express.json());
app.use(cors());

//routes
app.use(express.json());
app.use("/api/auth", authRoutes);

app.use("/uploads", express.static("uploads"));

const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/products", require("./routes/productRoutes"));

const orderRoutes = require("./routes/orderRoutes");

app.use("/api/orders", orderRoutes);

const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api/payment", paymentRoutes);



app.use("/api/cart", cartRoutes);

app.use("/api/orders", require("./routes/orderRoutes"));

app.use("/api/payment", require("./routes/paymentRoutes"));

app.use("/api/cart", require("./routes/cartRoutes"));

// DEBUG (remove later)
console.log("MONGO_URI:", process.env.MONGO_URI);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: "ecommerce", // 🔥 FORCE correct DB
})
.then(() => {
  console.log("MongoDB Connected");

  // ✅ CHECK WHICH DB
  console.log("🔥 Connected DB:", mongoose.connection.name);

  // START SERVER AFTER DB CONNECTS
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.log("DB Error:", err);
});

// Test route
app.get("/", (req, res) => {
  res.send("API is working");
});