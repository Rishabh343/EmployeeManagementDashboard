import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleLogin = () => {
    setError("");

    // Empty fields validation
    if (!loginData.email || !loginData.password) {
      setError("All fields are required");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(loginData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Get registered user
    const user = JSON.parse(localStorage.getItem("registeredUser"));

    if (!user) {
      setError("No user found. Please signup first.");
      return;
    }

    // Check credentials
    if (
      user.email === loginData.email &&
      user.password === loginData.password
    ) {
      alert("Login Successful!");

      localStorage.setItem("isLoggedIn", "true");

      navigate("/");
    } else {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        minHeight: "90vh",
      }}
    >
      <h1>Login</h1>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={loginData.email}
        onChange={handleChange}
        style={{
          padding: "8px",
          width: "250px",
          border: error ? "1px solid red" : "1px solid #ccc",
        }}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={loginData.password}
        onChange={handleChange}
        style={{
          padding: "8px",
          width: "250px",
          border: error ? "1px solid red" : "1px solid #ccc",
        }}
      />
      <p>
        <Link to="/resetpassword">Forget Password ?</Link>
      </p>

      {error && (
        <p
          style={{
            color: "red",
            fontSize: "14px",
            margin: 0,
          }}
        >
          {error}
        </p>
      )}

      <button
        onClick={handleLogin}
        style={{
          padding: "8px 16px",
          cursor: "pointer",
        }}
      >
        Login
      </button>

      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}
