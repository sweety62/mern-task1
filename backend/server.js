import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";


dotenv.config();

const app = express();
app.use(cors({
  allowedOrigins: "*"
}));


//app.use(cors());
app.use(express.json());

// Routes
app.use("/products", productRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully...");
});

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () => {
      console.log("Server running on port " + process.env.PORT);
    });
  })
  .catch((err) => console.log(err));