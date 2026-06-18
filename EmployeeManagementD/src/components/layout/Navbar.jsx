import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <nav
      style={{
        height: "60px",
        backgroundColor: "gray",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      <h2 style={{ margin: 0 }}>Employee Portal</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <span>Welcome, Admin</span>

        <button
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#ef4444",
            color: "white",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
