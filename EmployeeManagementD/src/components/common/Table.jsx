import React from "react";

export default function Table({ columns, children }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300 shadow">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-3 text-left border-b">
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
