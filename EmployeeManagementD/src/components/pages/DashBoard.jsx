import React, { useContext, useMemo } from "react";
import { EmployeeContext } from "../common/EmployeeContext";
import { ThemeContext } from "../common/ThemeContext";

export default function DashBoard() {
  const { employees } = useContext(EmployeeContext);
  const { theme } = useContext(ThemeContext);

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

  const topEmployees = useMemo(() => {
    return employees.slice(0, 5);
  }, [employees]);

  const cardStyle =
    theme === "light"
      ? "bg-white"
      : "bg-gray-800";

  return (
    <div
      className={`min-h-screen p-8 ${
        theme === "light"
          ? "bg-gray-100 text-black"
          : "bg-gray-900 text-white"
      }`}
    >
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className={`${cardStyle} rounded-xl shadow p-6`}>
          <h2>Total Employees</h2>
          <p className="text-4xl font-bold mt-3">
            {totalEmployees}
          </p>
        </div>

        <div className={`${cardStyle} rounded-xl shadow p-6`}>
          <h2>Total Departments</h2>
          <p className="text-4xl font-bold mt-3">
            {departments.length}
          </p>
        </div>

        <div className={`${cardStyle} rounded-xl shadow p-6`}>
          <h2>Male Employees</h2>
          <p className="text-4xl font-bold mt-3">
            {totalMale}
          </p>
        </div>

        <div className={`${cardStyle} rounded-xl shadow p-6`}>
          <h2>Female Employees</h2>
          <p className="text-4xl font-bold mt-3">
            {totalFemale}
          </p>
        </div>
      </div>

      {/* Top Employees Table */}
      <div
        className={`rounded-xl shadow p-6 ${
          theme === "light"
            ? "bg-white"
            : "bg-gray-800"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">
          Top 5 Employees
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">
                  Image
                </th>
                <th className="text-left py-3">
                  Name
                </th>
                <th className="text-left py-3">
                  Email
                </th>
                <th className="text-left py-3">
                  Department
                </th>
              </tr>
            </thead>

            <tbody>
              {topEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b"
                >
                  <td className="py-3">
                    <img
                      src={emp.image}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                  </td>

                  <td>
                    {emp.firstName}{" "}
                    {emp.lastName}
                  </td>

                  <td>{emp.email}</td>

                  <td>
                    {
                      emp.company
                        .department
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}