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
      className={`h-16 px-5 flex justify-between items-center shadow ${
        theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
      }`}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden text-2xl"
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>

        <h1 className="font-bold text-xl">Employee Portal</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded border border-gray-400"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded bg-red-500 text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
