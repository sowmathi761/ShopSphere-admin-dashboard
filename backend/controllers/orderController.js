import Order from "../models/Order.js";

/* INSERT MANY ORDERS (SOCKET ENABLED) */
export const insertManyOrders = async (req, res) => {
  try {
    const orders = await Order.insertMany(req.body);

    // SOCKET EVENTS - Dashboard Refresh Triggers
    const io = req.app.get("io");
    io.emit("orders:update");
    io.emit("customers:update");
    io.emit("revenue:update");

    res.status(201).json({
      message: "Orders inserted successfully",
      orders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL ORDERS (Sorted Newest -> Oldest) */
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // 👈 FIX APPLIED HERE
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE ORDERS */
export const updateOrders = async (req, res) => {
  try {
    const result = await Order.updateMany(
      { status: "pending" },
      { status: "completed" }
    );

    const io = req.app.get("io");
    io.emit("orders:update");
    io.emit("revenue:update");

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE ORDERS */
export const deleteOrders = async (req, res) => {
  try {
    const result = await Order.deleteMany({ status: "cancelled" });

    const io = req.app.get("io");
    io.emit("orders:update");
    io.emit("customers:update");

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* RECENT ORDERS (already sorted correctly) */
export const getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 }) // newest first
      .limit(5);

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ALL ORDERS WITH MONTH FILTER (already sorted correctly) */
export const getAllOrders = async (req, res) => {
  try {
    const { month } = req.query;
    let filter = {};

    if (month) {
      const start = new Date(month + "-01");
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);

      filter.createdAt = { $gte: start, $lt: end };
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
