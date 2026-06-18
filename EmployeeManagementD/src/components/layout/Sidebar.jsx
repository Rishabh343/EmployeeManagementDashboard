import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-60 h-screen bg-white border-r border-gray-300 p-5">
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-2 py-2 rounded transition ${
              isActive ? "bg-gray-200" : "hover:bg-gray-100"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/employee"
          className={({ isActive }) =>
            `px-2 py-2 rounded transition ${
              isActive ? "bg-gray-200" : "hover:bg-gray-100"
            }`
          }
        >
          Employees
        </NavLink>
      </nav>
    </div>
  );
}
