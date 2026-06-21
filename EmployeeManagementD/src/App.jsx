import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./components/pages/DashBoard";
import Employee from "./components/pages/Employee";
import MainLayout from "./components/layout/MainLayout";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ForgetPassword from "./components/pages/ForgetPassword";
import EmployeeProvider from "./components/common/EmployeeContext";
import ThemeProvider from "./components/common/ThemeContext";
import ProtectedRoute from "./components/common/ProtectedRoute";


export default function App() {
  return (
    <ThemeProvider>
      <EmployeeProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resetpassword" element={<ForgetPassword />} />

            {/* Protected Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<DashBoard />} />
              <Route path="/employee" element={<Employee />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </EmployeeProvider>
    </ThemeProvider>
  );
}
