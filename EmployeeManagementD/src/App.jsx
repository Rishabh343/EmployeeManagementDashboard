import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import DashBoard from "./components/pages/DashBoard";
import Employee from "./components/pages/Employee";
import MainLayout from "./components/layout/MainLayout";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ForgetPassword from "./components/pages/ForgetPassword";
import EmployeeProvider from "./components/common/EmployeeContext";
import ThemeProvider from "./components/common/ThemeContext";
export default function App() {
  return (
    <div>
      <ThemeProvider>
        <EmployeeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/resetpassword" element={<ForgetPassword />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<MainLayout />}>
                <Route path="/" element={<DashBoard />} />
                <Route path="/employee" element={<Employee />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </EmployeeProvider>
      </ThemeProvider>
    </div>
  );
}
