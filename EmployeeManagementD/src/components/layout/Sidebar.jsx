import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../common/ThemeContext";

export default function Sidebar({ sidebarOpen }) {
  const { theme } = useContext(ThemeContext);

  const linkStyle = ({ isActive }) =>
    `px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
      isActive
        ? "bg-yellow-500 text-black shadow-sm"
        : theme === "light"
          ? "text-gray-700 hover:bg-gray-200"
          : "text-gray-200 hover:bg-gray-700"
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
    border-r p-5 shadow-lg
    ${
      theme === "light"
        ? "bg-[#f5f1ea] border-gray-200 text-black"
        : "bg-[#1f2937] border-gray-700 text-white"
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
