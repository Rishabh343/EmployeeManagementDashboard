import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../common/ThemeContext";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav
      className={`h-16 px-6 flex justify-between items-center border-b shadow-sm ${
        theme === "light"
          ? "bg-white text-black border-gray-200"
          : "bg-gray-800 text-white border-gray-700"
      }`}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`md:hidden text-2xl px-2 py-1 rounded ${
            theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-700"
          }`}
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>

        <h1 className="font-bold text-2xl">
          <span className="text-yellow-500">Employee</span> Portal
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-lg border font-medium transition ${
            theme === "light"
              ? "border-gray-300 hover:bg-gray-100"
              : "border-gray-600 hover:bg-gray-700"
          }`}
        >
          {theme === "light" ? "🌙 Dark" : "☀ Light"}
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
