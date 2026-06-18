import React, { useContext } from "react";
import Employee from "./Employee";
import { EmployeeContext } from "../common/EmployeeContext";

export default function DashBoard() {
  const { employees } = useContext(EmployeeContext);
  const totalEmployees = employees.length;
  const totalMale = employees.filter((emp) => emp.gender === "male").length;
  const totalFemale = employees.filter((emp) => emp.gender === "female").length;
  const departments = [
    ...new Set(employees.map((emp) => emp.company.department)),
  ];
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-gray-500 text-sm font-semibold">
            Total Employees
          </h2>
          <p className="text-4xl font-bold mt-3 text-blue-600">
            {totalEmployees}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-gray-500 text-sm font-semibold">
            Total Department
          </h2>
          <p className="text-4xl font-bold mt-3 text-green-600">
            {departments.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-gray-500 text-sm font-semibold">Male Employee</h2>
          <p className="text-4xl font-bold mt-3 text-indigo-600">{totalMale}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-gray-500 text-sm font-semibold">
            Female Employees
          </h2>
          <p className="text-4xl font-bold mt-3 text-pink-600">{totalFemale}</p>
        </div>
      </div>
    </div>
  );
}
