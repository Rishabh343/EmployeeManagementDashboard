import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../common/ThemeContext";
import { Moon, Sun, LogOut, Menu, X } from "lucide-react";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav
      className={`sticky top-0 z-30 h-16 px-4 md:px-8 flex justify-between items-center border-b backdrop-blur-md ${
        theme === "light"
          ? "bg-white/90 text-black border-gray-200"
          : "bg-gray-800/90 text-white border-gray-700"
      }`}
    >
     
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`md:hidden p-2 rounded-lg transition ${
            theme === "light"
              ? "hover:bg-gray-100"
              : "hover:bg-gray-700"
          }`}
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <h1 className="font-bold text-lg md:text-2xl tracking-tight">
          <span className="text-yellow-500">Employee</span> Portal
        </h1>
      </div>

      
      <div className="flex items-center gap-2 md:gap-3">
      
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl border font-medium transition ${
            theme === "light"
              ? "border-gray-300 hover:bg-gray-100"
              : "border-gray-600 hover:bg-gray-700"
          }`}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          <span className="hidden md:inline">
            {theme === "light" ? "Dark" : "Light"}
          </span>
        </button>

      
        <button
          onClick={handleLogout}
          className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl font-medium transition ${
            theme === "light"
              ? "bg-yellow-500 hover:bg-yellow-600 text-white"
              : "bg-yellow-600 hover:bg-yellow-500 text-white"
          }`}
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
}