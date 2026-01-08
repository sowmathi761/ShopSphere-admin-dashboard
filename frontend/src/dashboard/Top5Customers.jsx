import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket"; // adjust path if needed

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function Top5Customers() {
  const [customers, setCustomers] = useState([]);

  /* 🔹 FETCH TOP CUSTOMERS */
  const fetchCustomers = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/analytics/top-5-customers", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setCustomers(res.data))
      .catch(() => {});
  };

  /* 🔹 INITIAL FETCH */
  useEffect(() => {
    fetchCustomers();
  }, []);

  /* 🔹 SOCKET LISTENER FOR REALTIME REFRESH */
  useEffect(() => {
    socket.on("customers:update", () => {
      console.log("👥 Top 5 customers updated via socket");
      fetchCustomers();
    });

    return () => socket.off("customers:update");
  }, []);

  /* BAR CHART DATA */
  const data = {
    labels: customers.map(c => c._id),
    datasets: [
      {
        label: "Total Amount Spent (₹)",
        data: customers.map(c => c.totalAmount),
        backgroundColor: "#102a56"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div>
      <h1>Top 5 Customers Dashboard</h1>

      {/* BAR CHART */}
      <div className="card">
        <Bar data={data} options={options} />
      </div>

      {/* TABLE */}
      <div className="card">
        <h3>Customer Details</h3>

        <table className="orders-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Total Orders</th>
              <th>Total Amount</th>
              <th>Last Order Date</th>
            </tr>
          </thead>

          <tbody>
            {customers.map(c => (
              <tr key={c._id}>
                <td>{c._id}</td>
                <td>{c.totalOrders}</td>
                <td>₹{c.totalAmount}</td>
                <td>{new Date(c.lastOrderDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
