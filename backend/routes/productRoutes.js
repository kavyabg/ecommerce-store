// backend/routes/productRoutes.js
const express = require('express');
const {
  getAllProducts,
  getProductByProductNumber,  // Changed to handle productNumber
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/product/:productNumber', getProductByProductNumber);  // Use the correct route for productNumber
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
