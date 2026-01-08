import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import DashboardLayout from "./dashboard/DashboardLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" element={<DashboardLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
