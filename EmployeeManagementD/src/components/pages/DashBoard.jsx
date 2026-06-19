import React, { useContext, useMemo } from "react";
import { EmployeeContext } from "../common/EmployeeContext";
import { ThemeContext } from "../common/ThemeContext";

export default function DashBoard() {
  const { employees } = useContext(EmployeeContext);
  const { theme } = useContext(ThemeContext);

  const stats = useMemo(() => {
    const totalEmployees = employees.length;

    const totalMale = employees.filter(
      (emp) => emp.gender === "male"
    ).length;

    const totalFemale = employees.filter(
      (emp) => emp.gender === "female"
    ).length;

    const departments = [
      ...new Set(
        employees.map(
          (emp) => emp.company.department
        )
      ),
    ];

    return {
      totalEmployees,
      totalMale,
      totalFemale,
      totalDepartments: departments.length,
    };
  }, [employees]);

  return (
    <div
      className={`min-h-screen p-8 ${
        theme === "light"
          ? "bg-gray-100"
          : "bg-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          className={`rounded-xl shadow-md p-6 ${
            theme === "light"
              ? "bg-white"
              : "bg-gray-800"
          }`}
        >
          <h2 className="text-gray-500 text-sm font-semibold">
            Total Employees
          </h2>
          <p className="text-4xl font-bold mt-3">
            {stats.totalEmployees}
          </p>
        </div>

        <div
          className={`rounded-xl shadow-md p-6 ${
            theme === "light"
              ? "bg-white"
              : "bg-gray-800"
          }`}
        >
          <h2 className="text-gray-500 text-sm font-semibold">
            Total Departments
          </h2>
          <p className="text-4xl font-bold mt-3">
            {stats.totalDepartments}
          </p>
        </div>

        <div
          className={`rounded-xl shadow-md p-6 ${
            theme === "light"
              ? "bg-white"
              : "bg-gray-800"
          }`}
        >
          <h2 className="text-gray-500 text-sm font-semibold">
            Male Employees
          </h2>
          <p className="text-4xl font-bold mt-3">
            {stats.totalMale}
          </p>
        </div>

        <div
          className={`rounded-xl shadow-md p-6 ${
            theme === "light"
              ? "bg-white"
              : "bg-gray-800"
          }`}
        >
          <h2 className="text-gray-500 text-sm font-semibold">
            Female Employees
          </h2>
          <p className="text-4xl font-bold mt-3">
            {stats.totalFemale}
          </p>
        </div>
      </div>
    </div>
  );
}