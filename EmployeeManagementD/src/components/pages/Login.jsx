import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import { ThemeContext } from "../common/ThemeContext";
import ThemeButton from "../common/ThemeButton.jsx";
export default function Login() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleLogin = () => {
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (!loginData.email || !loginData.password) {
        setError("All fields are required");
        setIsLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(loginData.email)) {
        setError("Please enter a valid email address");
        setIsLoading(false);
        return;
      }

      const user = JSON.parse(localStorage.getItem("registeredUser"));

      if (!user) {
        setError("No user found. Please signup first.");
        setIsLoading(false);
        return;
      }

      if (
        user.email === loginData.email &&
        user.password === loginData.password
      ) {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoading(false);
        navigate("/");
      } else {
        setError("Invalid Email or Password");
        setIsLoading(false);
      }
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

      <div
        className={`w-full max-w-md shadow-lg rounded-xl p-8 ${
          theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded border outline-none ${
              error ? "border-red-500" : "border-gray-300"
            } ${inputStyle}`}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded border outline-none ${
              error ? "border-red-500" : "border-gray-300"
            } ${inputStyle}`}
          />

          <div className="text-right text-sm">
            <Link
              to="/resetpassword"
              className={`hover:underline ${
                theme === "light" ? "text-blue-600" : "text-blue-400"
              }`}
            >
              Forgot Password?
            </Link>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleLogin}
            className={`w-full py-3 rounded transition ${
              theme === "light"
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            Login
          </button>

          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className={`font-medium hover:underline ${
                theme === "light" ? "text-blue-600" : "text-blue-400"
              }`}
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
