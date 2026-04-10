import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

// Fixed: origin not allowedOrigins
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("✅ MERN Backend Running Successfully!");
});

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));