import express from "express";
import { getAdminOrders, updateAdminOrder } from "../../controllers/admin/adminOrders.js";

const router = express.Router();

router.get("/", getAdminOrders);
router.put("/:id", updateAdminOrder);

export default router;
