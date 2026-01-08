import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket"; // adjust path if needed

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

export default function TotalRevenue() {
  const [fromDate, setFromDate] = useState("2025-01-01");
  const [toDate, setToDate] = useState("2025-12-31");
  const [monthlyRevenue, setMonthlyRevenue] = useState(Array(12).fill(0));
  const [totalRevenue, setTotalRevenue] = useState(0);

  /* 🔹 FETCH REVENUE */
  const fetchRevenue = () => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:3000/api/analytics/total-revenue", {
      headers: { Authorization: `Bearer ${token}` },
      params: { from: fromDate, to: toDate }
    })
    .then(res => {
      const revenue = Array(12).fill(0);

      res.data.forEach(item => {
        revenue[item._id - 1] = item.totalAmount;
      });

      setMonthlyRevenue(revenue);
      setTotalRevenue(revenue.reduce((a, b) => a + b, 0));
    })
    .catch(() => {});
  };

  /* 🔹 INITIAL FETCH */
  useEffect(() => {
    fetchRevenue();
  }, [fromDate, toDate]);

  /* 🔹 SOCKET LISTENER FOR REALTIME REFRESH */
  useEffect(() => {
    socket.on("revenue:update", () => {
      console.log("💰 Revenue updated via socket");
      fetchRevenue();
    });

    return () => socket.off("revenue:update");
  }, [fromDate, toDate]);

  const chartData = {
    labels: MONTHS,
    datasets: [
      {
        label: "Total Revenue",
        data: monthlyRevenue,
        borderColor: "#1f4fd8",
        backgroundColor: "#1f4fd8",
        tension: 0.3
      }
    ]
  };

  return (
    <div>
      <h1 className="page-title">Total Revenue</h1>

      {/* DATE RANGE FILTER */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
        <div>
          <label>From: </label>
          <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
        </div>

        <div>
          <label>To: </label>
          <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
        </div>
      </div>

      {/* TOTAL REVENUE CARD */}
      <div className="revenue-card">
        <h3>Total Revenue</h3>
        <p>₹ {totalRevenue}</p>
      </div>

      {/* LINE CHART */}
      <div className="chart-center-wrapper">
        <div className="card chart-card">
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
}
