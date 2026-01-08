import express from "express";
import {
  totalRevenue,
  monthlySales,
  topCustomers,
  top5Customers,
  productSalesCount,
  totalRevenueByDateRange,
  getTotalCompletedRevenue
} from "../controllers/analyticsController.js";
import { monthlyOrders } from "../controllers/analyticsController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/revenue", verifyToken, verifyAdmin, totalRevenue);
router.get("/monthly-sales", verifyToken, verifyAdmin, monthlySales);
router.get("/top-customers", verifyToken, verifyAdmin, topCustomers);
router.get("/top-5-customers", verifyToken, verifyAdmin, top5Customers);
router.get("/product-sales", verifyToken, verifyAdmin, productSalesCount);
router.get("/total-revenue", verifyToken, verifyAdmin, totalRevenueByDateRange);
router.get("/monthly-orders", verifyToken, verifyAdmin, monthlyOrders);
router.get("/revenue-total", verifyToken, verifyAdmin, getTotalCompletedRevenue);

export default router;
