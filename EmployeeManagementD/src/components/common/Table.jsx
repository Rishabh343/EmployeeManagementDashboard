import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function Table({ columns, children }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`overflow-x-auto rounded-lg border shadow ${
        theme === "light"
          ? "border-gray-300 bg-white"
          : "border-gray-700 bg-gray-800 text-white"
      }`}
    >
      <table className="w-full border-collapse min-w-[900px]">
        <thead
          className={
            theme === "light"
              ? "bg-gray-100"
              : "bg-gray-700"
          }
        >
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left border-b"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
