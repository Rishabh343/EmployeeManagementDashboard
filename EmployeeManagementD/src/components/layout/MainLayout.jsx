import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
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
