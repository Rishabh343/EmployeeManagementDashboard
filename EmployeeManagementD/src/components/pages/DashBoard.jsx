import React, { useContext, useMemo } from "react";
import { EmployeeContext } from "../common/EmployeeContext";
import { ThemeContext } from "../common/ThemeContext";

export default function DashBoard() {
  const { employees } = useContext(EmployeeContext);
  const { theme } = useContext(ThemeContext);

  const totalEmployees = employees.length;

  const totalMale = employees.filter((emp) => emp.gender === "male").length;

  const totalFemale = employees.filter((emp) => emp.gender === "female").length;

  const departments = [
    ...new Set(employees.map((emp) => emp.company.department)),
  ];

  const topEmployees = useMemo(() => {
    return employees.slice(0, 5);
  }, [employees]);

  const cardStyle =
    theme === "light"
      ? "bg-white border border-gray-200 shadow-md"
      : "bg-gray-800 border border-gray-700 shadow-lg";

  return (
    <div
      className={`min-h-screen p-8 ${
        theme === "light" ? "bg-[#f8f6f2] text-black" : "bg-gray-900 text-white"
      }`}
    >
      <h1 className="text-4xl font-bold mb-2 border-l-4 border-yellow-500 pl-4">
        Dashboard
      </h1>

      <p className="text-gray-500 mb-8">Overview of employee statistics</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div
          className={`${cardStyle} rounded-2xl p-6 hover:scale-[1.02] transition`}
        >
          <h2 className="text-gray-500 font-medium">Total Employees</h2>
          <p className="text-4xl font-bold mt-3 text-yellow-500">
            {totalEmployees}
          </p>
        </div>

        <div
          className={`${cardStyle} rounded-2xl p-6 hover:scale-[1.02] transition`}
        >
          <h2 className="text-gray-500 font-medium">Total Departments</h2>
          <p className="text-4xl font-bold mt-3 text-yellow-500">
            {departments.length}
          </p>
        </div>

        <div
          className={`${cardStyle} rounded-2xl p-6 hover:scale-[1.02] transition`}
        >
          <h2 className="text-gray-500 font-medium">Male Employees</h2>
          <p className="text-4xl font-bold mt-3 text-yellow-500">{totalMale}</p>
        </div>

        <div
          className={`${cardStyle} rounded-2xl p-6 hover:scale-[1.02] transition`}
        >
          <h2 className="text-gray-500 font-medium">Female Employees</h2>
          <p className="text-4xl font-bold mt-3 text-yellow-500">
            {totalFemale}
          </p>
        </div>
      </div>

      <div
        className={`rounded-2xl p-6 border ${
          theme === "light"
            ? "bg-white border-gray-200 shadow-md"
            : "bg-gray-800 border-gray-700 shadow-lg"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6">Top 5 Employees</h2>

        <div
          className={`hidden md:grid grid-cols-4 px-4 py-3 text-sm font-semibold ${
            theme === "light" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          <div>Image</div>
          <div>Name</div>
          <div>Email</div>
          <div>Department</div>
        </div>

        <div className="space-y-4">
          {topEmployees.map((emp) => (
            <div
              key={emp.id}
              className={`grid grid-cols-1 md:grid-cols-4 gap-4 items-center px-4 py-4 rounded-xl ${
                theme === "light"
                  ? "bg-gray-50 border border-gray-100"
                  : "bg-gray-900 border border-gray-700"
              }`}
            >
              <div>
                <img
                  src={emp.image}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400"
                />
              </div>

              <div className="font-medium">
                {emp.firstName} {emp.lastName}
              </div>

              <div className="break-all">{emp.email}</div>

              <div>{emp.company.department}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
