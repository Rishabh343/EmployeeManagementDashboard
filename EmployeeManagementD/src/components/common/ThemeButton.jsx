import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={`absolute top-5 right-5 px-4 py-2 rounded border ${
        theme === "light"
          ? "bg-white text-black border-gray-300"
          : "bg-gray-800 text-white border-gray-600"
      }`}
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}