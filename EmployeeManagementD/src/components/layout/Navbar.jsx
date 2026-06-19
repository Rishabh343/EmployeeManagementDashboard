import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../common/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav
      className={`h-16 px-5 flex justify-between items-center shadow-md ${
        theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
      }`}
    >
      <h2 className="text-xl font-semibold">Employee Portal</h2>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded border border-gray-400"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>

        <span>Welcome, Admin</span>

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
