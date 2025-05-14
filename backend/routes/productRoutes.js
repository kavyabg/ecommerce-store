import express from "express";
import {
  getAllProducts,
  getProductByProductNumber,
} from "../controllers/productController.js";
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:productNumber", getProductByProductNumber);

export default router;
