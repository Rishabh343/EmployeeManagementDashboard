import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../common/Loader";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      const user = JSON.parse(
        localStorage.getItem("registeredUser")
      );

      if (
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setError("All fields are required");
        setIsLoading(false);
        return;
      }

      if (!user || user.email !== formData.email) {
        setError("Email not found");
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        setIsLoading(false);
        return;
      }

      if (
        formData.password !== formData.confirmPassword
      ) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      const updatedUser = {
        ...user,
        password: formData.password,
      };

      localStorage.setItem(
        "registeredUser",
        JSON.stringify(updatedUser)
      );

      setIsLoading(false);
      navigate("/login");
    }, 1200);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleUpdatePassword}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Forgot Password
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded border outline-none ${
              error
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />

          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded border outline-none ${
              error
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded border outline-none ${
              error
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          >
            Update Password
          </button>

          <p className="text-center text-sm">
            Back to{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}