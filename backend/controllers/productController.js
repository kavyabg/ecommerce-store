// backend/controllers/productController.js
const { Product } = require('../models/productModel');

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const getProductByProductNumber = async (req, res) => {
  try {
      const product = await Product.findOne({ productNumber: req.params.productNumber });
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
  } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Error fetching product' });
  }
};

const createProduct = async (req, res) => {
  const product = new Product(req.body);
  const savedProduct = await product.save();
  res.status(201).json(savedProduct);
};

const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Product not found' });
  res.json(updated);
};

const deleteProduct = async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted successfully' });
};

module.exports = {
  getAllProducts,
  getProductByProductNumber,  // Export the updated method
  createProduct,
  updateProduct,
  deleteProduct
};
