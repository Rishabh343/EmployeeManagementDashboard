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

  if (isLoading) {
    return <Loader />;
  }
  const inputStyle =
    theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white";

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center px-4 ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      }`}
    >
      <ThemeButton />

      <form
        onSubmit={handleSign}
        className={`w-full max-w-md shadow-lg rounded-xl p-8 ${
          theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Signup</h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded border outline-none ${
              error ? "border-red-500" : "border-gray-300"
            } ${inputStyle}`}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded border outline-none ${
              error ? "border-red-500" : "border-gray-300"
            } ${inputStyle}`}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded border outline-none ${
              error ? "border-red-500" : "border-gray-300"
            } ${inputStyle}`}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className={`w-full py-3 rounded transition ${
              theme === "light"
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            Signup
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className={`font-medium hover:underline ${
                theme === "light" ? "text-blue-600" : "text-blue-400"
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
