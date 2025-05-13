import express from "express";
import {
  getAllProducts,
  getProductByProductNumber,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/:productNumber", getProductByProductNumber);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
