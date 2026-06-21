import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../common/ThemeContext";

export default function Sidebar({ sidebarOpen }) {
  const { theme } = useContext(ThemeContext);

  const linkStyle = ({ isActive }) =>
    `px-3 py-3 rounded-md transition ${
      isActive
        ? theme === "light"
          ? "bg-gray-200"
          : "bg-gray-700"
        : theme === "light"
          ? "hover:bg-gray-100"
          : "hover:bg-gray-700"
    }`;

  return (
    <aside
      className={`
        fixed md:static
        top-16 left-0 z-10
        w-60
        h-[calc(100vh-64px)]
        md:h-auto
        md:min-h-[calc(100vh-64px)]
        md:mt-2
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        border-r p-5
        shadow-[0_2px_8px_rgba(0,0,0,0.08)]
        ${
          theme === "light"
            ? "bg-white border-gray-300 text-black"
            : "bg-gray-800 border-gray-600 text-white"
        }
      `}
    >
      <nav className="flex flex-col gap-4">
        <NavLink to="/" className={linkStyle}>
          Dashboard
        </NavLink>

        <NavLink to="/employee" className={linkStyle}>
          Employees
        </NavLink>
      </nav>
    </aside>
  );
}
