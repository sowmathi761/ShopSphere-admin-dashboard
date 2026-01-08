import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function MonthlyDashboard() {
  const [sales, setSales] = useState(Array(12).fill(0));
  const [orders, setOrders] = useState(Array(12).fill(0));

  const token = localStorage.getItem("token");

  const fetchData = () => {
    // Monthly Revenue
    axios.get("http://localhost:3000/api/analytics/monthly-sales", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const arr = Array(12).fill(0);
      res.data.forEach(item => {
        arr[item._id - 1] = item.totalSales;
      });
      setSales(arr);
    });

    // Monthly Orders
    axios.get("http://localhost:3000/api/analytics/monthly-orders", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const arr = Array(12).fill(0);
      res.data.forEach(item => {
        arr[item._id - 1] = item.totalOrders;
      });
      setOrders(arr);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    socket.on("orders:update", fetchData);
    socket.on("revenue:update", fetchData);

    return () => {
      socket.off("orders:update", fetchData);
      socket.off("revenue:update", fetchData);
    };
  }, []);

  const totalRevenue = sales.reduce((a,b) => a+b, 0);
  const totalOrders = orders.reduce((a,b) => a+b, 0);

  const revenueChart = {
    labels: MONTHS,
    datasets: [
      {
        label: "Revenue (₹)",
        data: sales,
        backgroundColor: "#102a56"
      }
    ]
  };

  const ordersChart = {
    labels: MONTHS,
    datasets: [
      {
        label: "Orders",
        data: orders,
        borderColor: "#1f4fd8"
      }
    ]
  };

  return (
    <div>
      <h1>Monthly Dashboard</h1>

      {/* Summary Cards */}
      <div style={{ display:"flex", gap:"20px", marginBottom:"20px" }}>
        <div className="card">
          <h3>Total Revenue (YTD)</h3>
          <h2>₹ {totalRevenue.toLocaleString()}</h2>
        </div>

        <div className="card">
          <h3>Total Orders (YTD)</h3>
          <h2>{totalOrders}</h2>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="card">
        <Bar data={revenueChart} />
      </div>

      {/* Orders Chart */}
      <div className="card" style={{ marginTop: "20px" }}>
        <Line data={ordersChart} />
      </div>
    </div>
  );
}
