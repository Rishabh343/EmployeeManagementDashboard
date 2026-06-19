import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../common/ThemeContext";

export default function Sidebar() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`w-60 h-screen p-5 border-r ${
        theme === "light"
          ? "bg-white border-gray-300 text-black"
          : "bg-gray-800 border-gray-600 text-white"
      }`}
    >
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-2 py-2 rounded transition ${
              isActive
                ? theme === "light"
                  ? "bg-gray-200"
                  : "bg-gray-700"
                : theme === "light"
                ? "hover:bg-gray-100"
                : "hover:bg-gray-700"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/employee"
          className={({ isActive }) =>
            `px-2 py-2 rounded transition ${
              isActive
                ? theme === "light"
                  ? "bg-gray-200"
                  : "bg-gray-700"
                : theme === "light"
                ? "hover:bg-gray-100"
                : "hover:bg-gray-700"
            }`
          }
        >
          Employees
        </NavLink>
      </nav>
    </div>
  );
}