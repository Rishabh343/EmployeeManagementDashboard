import React, { useContext, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../common/ThemeContext";

export default function MainLayout() {
  const { theme } = useContext(ThemeContext);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div
      className={`h-screen overflow-hidden ${
        theme === "light"
          ? "bg-gray-50 text-black"
          : "bg-gray-900 text-white"
      }`}
    >
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar sidebarOpen={sidebarOpen} />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}