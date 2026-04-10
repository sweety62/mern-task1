import express from "express";
import ProductRoutes from "../models/ProductRoutes.js";   

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();   
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);   
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;