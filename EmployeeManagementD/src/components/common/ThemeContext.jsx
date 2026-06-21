import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
// className={`w-60 h-screen p-5 border-r ${
//         theme === "light"
//           ? "bg-white border-gray-300 text-black"
//           : "bg-gray-800 border-gray-600 text-white"
//       }`}