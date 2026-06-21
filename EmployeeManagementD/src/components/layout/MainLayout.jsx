import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../common/ThemeContext";

export default function MainLayout() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`h-screen overflow-hidden ${
        theme === "light"
          ? "bg-gray-50 text-black"
          : "bg-gray-900 text-white"
      }`}
    >
      {/* Fixed Navbar */}
      <Navbar />

      {/* Body */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Fixed Sidebar */}
        <Sidebar />

        {/* Only page content scrolls */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}