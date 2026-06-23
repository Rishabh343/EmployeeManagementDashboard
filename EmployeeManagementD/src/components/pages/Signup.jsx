import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import { ThemeContext } from "../common/ThemeContext";
import ThemeButton from "../common/ThemeButton.jsx";

export default function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSign = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (!formData.name || !formData.email || !formData.password) {
        setError("All fields are required");
        setIsLoading(false);
        return;
      }

      if (formData.name.trim().length < 3) {
        setError("Name must be at least 3 characters");
        setIsLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email");
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("registeredUser", JSON.stringify(formData));

      setIsLoading(false);
      navigate("/login");
    }, 1200);
  };

  if (isLoading) return <Loader />;

  const inputStyle =
    theme === "light"
      ? "bg-white text-black border-gray-300"
      : "bg-gray-700 text-white border-gray-600";

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center px-4 ${
        theme === "light" ? "bg-[#f8f6f2]" : "bg-gray-900"
      }`}
    >
      <ThemeButton />

      <form
        onSubmit={handleSign}
        className={`w-full max-w-md rounded-2xl p-8 border shadow-xl ${
          theme === "light"
            ? "bg-white border-gray-200 text-black"
            : "bg-gray-800 border-gray-700 text-white"
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Signup to Employee Portal
        </p>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-yellow-400 ${
              error ? "border-red-500" : ""
            } ${inputStyle}`}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-yellow-400 ${
              error ? "border-red-500" : ""
            } ${inputStyle}`}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-yellow-400 ${
              error ? "border-red-500" : ""
            } ${inputStyle}`}
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition"
          >
            Signup
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className={`font-semibold hover:underline ${
                theme === "light"
                  ? "text-yellow-600"
                  : "text-yellow-400"
              }`}
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}