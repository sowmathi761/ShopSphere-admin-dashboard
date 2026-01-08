import Order from "../models/Order.js";

// Total Revenue (Completed Orders)
export const totalRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" }
        }
      }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Monthly Sales Summary
export const monthlySales = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalSales: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Top 5 Customers (Total Spent)
export const topCustomers = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: "$userId",
          totalSpent: { $sum: "$amount" }
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 5 }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Top 5 Detailed Customers (Used in Dashboard)
export const top5Customers = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: "$userId",
          totalOrders: { $sum: 1 },
          totalAmount: { $sum: "$amount" },
          lastOrderDate: { $max: "$createdAt" }
        }
      },
      { $sort: { totalAmount: -1 } },
      { $limit: 5 }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Product Sales Count
export const productSalesCount = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: "$product",
          totalSold: { $sum: 1 }
        }
      },
      { $sort: { totalSold: -1 } }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Total Revenue by Date Range (For Revenue Filter Chart)
export const totalRevenueByDateRange = async (req, res) => {
  try {
    const { from, to } = req.query;

    const startDate = new Date(from);
    const endDate = new Date(to);

    const result = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          status: "completed"
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalAmount: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Total Completed Revenue (For Home Page)
export const getTotalCompletedRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.json({ total: result[0]?.total || 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const monthlyOrders = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalOrders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
