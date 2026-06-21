import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {
  const { theme } = useContext(ThemeContext);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center px-4">
      <div
        className={`w-full max-w-md rounded-lg shadow-lg p-5 ${
          theme === "light"
            ? "bg-white text-black"
            : "bg-gray-800 text-white"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          <button onClick={onClose} className="text-xl">
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}