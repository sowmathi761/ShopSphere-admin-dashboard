import express from "express";
import {
  insertManyOrders,
  getRecentOrders,
  getAllOrders,
  updateOrders,
  deleteOrders
} from "../controllers/orderController.js";

import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* SINGLE OR MULTIPLE ORDERS (SAFE) */
router.post("/", verifyToken, verifyAdmin, (req, res, next) => {
  // convert single object to array
  if (!Array.isArray(req.body)) {
    req.body = [req.body];
  }
  next();
}, insertManyOrders);

/* BULK INSERT (OPTIONAL EXPLICIT) */
router.post("/many", verifyToken, verifyAdmin, insertManyOrders);

/* RECENT ORDERS */
router.get("/recent", verifyToken, verifyAdmin, getRecentOrders);

/* ALL ORDERS (WITH MONTH FILTER) */
router.get("/", verifyToken, verifyAdmin, getAllOrders);

/* UPDATE ORDERS */
router.put("/", verifyToken, verifyAdmin, updateOrders);

/* DELETE ORDERS */
router.delete("/", verifyToken, verifyAdmin, deleteOrders);

export default router;
