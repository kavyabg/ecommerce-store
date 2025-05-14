import { Product } from "../../models/productModel.js";

// CREATE
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};

// UPDATE
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};

// FETCH PRODUCTS WITH PAGINATION
export const getProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    // Get products with pagination (skip and limit)
    const products = await Product.find()
      .skip(skip)   // Skip to the correct page
      .limit(Number(limit));  // Limit results to the number per page

    // Get the total count of products
    const totalProducts = await Product.countDocuments();

    // Return products and pagination info
    res.json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};