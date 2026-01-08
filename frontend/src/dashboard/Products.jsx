import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/analytics/product-sales", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setProducts(res.data))
      .catch(() => {});
  }, []);

  const data = {
    labels: products.map(p => p._id),
    datasets: [
      {
        label: "Products Sold",
        data: products.map(p => p.totalSold),
        backgroundColor: [
          "#102a56",
          "#1f4fd8",
          "#3b82f6",
          "#60a5fa",
          "#93c5fd",
          "#bfdbfe"
        ]
      }
    ]
  };

  return (
  <div>
    <h1 className="page-title">Products Dashboard</h1>


    <div className="chart-center-wrapper">
      <div className="card chart-card">
        <Pie data={data} />
      </div>
    </div>
  </div>
);
}