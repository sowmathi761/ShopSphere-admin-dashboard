import { useState, useEffect } from "react";

export default function Settings() {
  const [theme, setTheme] = useState("light");
  const [adminName, setAdminName] = useState("Sowmathi"); 
  const [adminEmail, setAdminEmail] = useState("sowmathi@shopsphere.com");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const applyTheme = (newTheme) => {
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    applyTheme(theme);
  }, []);

  return (
    <div>
      <h1>Settings</h1>

      {/* THEME SWITCH */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <h3>Theme</h3>

        <button onClick={() => applyTheme("light")} style={{ marginRight: "10px" }}>
          Light Theme
        </button>
        <button onClick={() => applyTheme("dark")}>
          Dark Theme
        </button>
      </div>

      {/* ADMIN INFO */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <h3>Admin Details</h3>
        <p><strong>Name:</strong> {adminName}</p>
        <p><strong>Email:</strong> {adminEmail}</p>
      </div>

      {/* LOGOUT */}
      <div className="card">
        <button style={{ background: "red", color: "white" }} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
