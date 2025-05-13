import express from "express";
import {
  createOrder,
  getOrdersByEmail,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/:email", getOrdersByEmail);
// router.get('/', getAllOrders);
// router.get('/:id', getOrderById);

export default router;
