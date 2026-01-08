import { Link, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket"; 
import "./Dashboard.css";

import Top5Customers from "./Top5Customers";
import Orders from "./Orders";
import Products from "./Products";
import TotalRevenue from "./TotalRevenue";
import MonthlyDashboard from "./MonthlyDashboard";
import Settings from "./Settings";


export default function DashboardLayout() {
  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  /* 🔹 FETCH HOME DATA (Recent orders + Total revenue) */
  const fetchHomeData = () => {
    const token = localStorage.getItem("token");

    // Recent Orders
    axios
      .get("http://localhost:3000/api/orders/recent", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch(() => {});

    // Total Revenue (Completed Orders Only)
    axios
      .get("http://localhost:3000/api/analytics/revenue", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        const total = res.data[0]?.totalRevenue || 0;
        setTotalRevenue(total);
      })
      .catch(() => {});
  };

  /* 🔹 INITIAL FETCH */
  useEffect(() => {
    fetchHomeData();
  }, []);

  /* 🔹 SOCKET LISTENER (Realtime Updates) */
  useEffect(() => {
    const refresh = () => {
      fetchHomeData();
    };

    socket.on("orders:update", refresh);
    socket.on("revenue:update", refresh);

    return () => {
      socket.off("orders:update", refresh);
      socket.off("revenue:update", refresh);
    };
  }, []);

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">ShopSphere</h2>

        <nav className="menu">
          <Link to="/dashboard">Home</Link>
          <Link to="/dashboard/orders">Orders</Link>
          <Link to="/dashboard/products">Products</Link>

          <div className="menu-section">Analytics</div>
          <Link to="/dashboard/top-customers">Top 5 Customer Dashboard</Link>
          <Link to="/dashboard/monthly-dashboard">Monthly Dashboard</Link>

          <Link to="/dashboard/total-revenue">Total Revenue</Link>

          <div className="menu-section">System</div>
          <Link to="/dashboard/settings">Settings</Link>

        </nav>
      </aside>

      {/* CONTENT */}
      <main className="content">
        <Routes>
          {/* HOME PAGE */}
          <Route
            path="/"
            element={
              <>
                <h1>Dashboard</h1>

                {/* TOTAL REVENUE CARD */}
                <div className="card">
                  <h3>Total Revenue (Completed Orders)</h3>
                  <h2>₹ {totalRevenue.toLocaleString()}</h2>
                </div>

                {/* RECENT ORDERS */}
                <div className="card">
                  <h3>Recent Orders</h3>

                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th>User ID</th>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Amount</th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order.userId}</td>
                          <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td>{order.product}</td>
                          <td>₹{order.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            }
          />

          {/* OTHER ROUTES */}
          <Route path="orders" element={<Orders />} />
          <Route path="top-customers" element={<Top5Customers />} />
          <Route path="products" element={<Products />} />
          <Route path="total-revenue" element={<TotalRevenue />} />
          <Route path="monthly-dashboard" element={<MonthlyDashboard />} />
           <Route path="settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}
