import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

export { Product };
