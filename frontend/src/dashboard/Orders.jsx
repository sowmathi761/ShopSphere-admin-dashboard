import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [month, setMonth] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [month]);

  const fetchOrders = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
        params: month ? { month } : {}
      })
      .then(res => {
        const sorted = [...res.data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sorted);
      })
      .catch(() => {});
  };

  useEffect(() => {
    socket.on("orders:update", () => {
      console.log("📦 SOCKET EVENT: Refreshing orders list");
      fetchOrders();
    });

    return () => {
      socket.off("orders:update");
    };
  }, []);

  return (
    <div>
      <h1>All Orders</h1>

      {/* MONTH FILTER */}
      <div style={{ marginBottom: "20px" }}>
        <label>Select Month: </label>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>

      {/* ORDERS TABLE */}
      <div className="card">
        <table className="orders-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.userId}</td>
                <td>{order.product}</td>
                <td>₹{order.amount}</td>
                <td>{order.status}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
