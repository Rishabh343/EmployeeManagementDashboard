import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../common/ThemeContext";

export default function MainLayout() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-gray-50 text-black" : "bg-gray-900 text-white"
      }`}
    >
      <Navbar />

      <div className="grid grid-cols-[240px_1fr]">
        <Sidebar />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
