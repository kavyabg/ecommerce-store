import express from "express";
import { getAdminOrders } from "../../controllers/admin/adminOrders.js";

const router = express.Router();

router.get("/", getAdminOrders);

export default router;
