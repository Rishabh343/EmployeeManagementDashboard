import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

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

    // Required fields validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    // Name validation
    if (formData.name.trim().length < 3) {
      setError("Name must be at least 3 characters");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    localStorage.setItem("registeredUser", JSON.stringify(formData));

    alert("Signup Successful!");

    navigate("/login");
  };

  return (
    <form onSubmit={handleSign}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "10px",
          margin: "50px auto",
        }}
      >
        <h1>Signup</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={{
            padding: "8px",
            border: error ? "1px solid red" : "1px solid #ccc",
          }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{
            padding: "8px",
            border: error ? "1px solid red" : "1px solid #ccc",
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={{
            padding: "8px",
            border: error ? "1px solid red" : "1px solid #ccc",
          }}
        />

        {error && (
          <p
            style={{
              color: "red",
              margin: 0,
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}

        <button type="submit">Signup</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </form>
  );
}
