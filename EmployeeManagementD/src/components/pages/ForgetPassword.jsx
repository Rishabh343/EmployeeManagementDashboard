import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

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

    const user = JSON.parse(
      localStorage.getItem("registeredUser")
    );

    if (
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (!user || user.email !== formData.email) {
      setError("Email not found");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (
      formData.password !== formData.confirmPassword
    ) {
      setError("Passwords do not match");
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

    alert("Password Updated Successfully");

    navigate("/login");
  };

  return (
    <form onSubmit={handleUpdatePassword}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "10px",
          margin: "50px auto",
        }}
      >
        <h1>Forgot Password</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        {error && (
          <p style={{ color: "red", margin: 0 }}>
            {error}
          </p>
        )}

        <button type="submit">
          Update Password
        </button>
      </div>
    </form>
  );
}