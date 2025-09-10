// src/pages/LoginPage.jsx
import React, { useState } from "react";
import API from "../services/api";
import DOMPurify from "dompurify";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    try {
      const payload = {
        email: DOMPurify.sanitize(email),
        password: DOMPurify.sanitize(password),
      };
      const res = await API.post("/auth/login", payload);
      login(res.data.token);
      setFeedback({ type: "success", text: "Login successful" });
      navigate(from);
    } catch (err) {
      console.error("Login error:", err?.response?.data || err);
      const message = err?.response?.data?.message || "Invalid credentials";
      setFeedback({ type: "error", text: message });
    }
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <h2>Login</h2>
      {location.state?.message && <div style={{ color: "red" }}>{location.state.message}</div>}
      {feedback && <div style={{ color: feedback.type === "error" ? "red" : "green" }}>{feedback.text}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Email</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Password</label><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
